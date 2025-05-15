const Carrito = require('../models/carrito');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

// Obtener el carrito de un usuario
const obtenerCarrito = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const carrito = await Carrito.findAll({
            where: { usuario_id: usuarioId },
            include: [{ model: Producto, attributes: ['nombre', 'marca', 'precio'] }]
        });
        res.json(carrito);
    } catch (error) {
        console.error('❌ Error al obtener carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
};

// Agregar un producto al carrito
const agregarAlCarrito = async (req, res) => {
    try {
        const { usuario_id, producto_id, cantidad } = req.body;

        // Validaciones
        const usuario = await Usuario.findByPk(usuario_id);
        const producto = await Producto.findByPk(producto_id);

        if (!usuario || !producto) {
            return res.status(404).json({ error: 'Usuario o producto no encontrado' });
        }

        const nuevoItem = await Carrito.create({ usuario_id, producto_id, cantidad });

        res.status(201).json(nuevoItem);
    } catch (error) {
        console.error('❌ Error al agregar producto al carrito:', error);
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
};

// Eliminar un producto del carrito
const eliminarDelCarrito = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await Carrito.findByPk(id);
        if (!item) {
            return res.status(404).json({ error: 'El producto en el carrito no existe' });
        }

        await item.destroy();
        res.json({ mensaje: 'Producto eliminado del carrito' });
    } catch (error) {
        console.error('❌ Error al eliminar producto del carrito:', error);
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }
};

module.exports = { obtenerCarrito, agregarAlCarrito, eliminarDelCarrito };
