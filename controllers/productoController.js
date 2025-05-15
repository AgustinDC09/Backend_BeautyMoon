const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{ model: Usuario, attributes: ['username', 'email'] }]
        });
        res.json(productos);
    } catch (error) {
        console.error('❌ Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// Crear un nuevo producto
const crearProducto = async (req, res) => {
    try {
        const { nombre, marca, precio, stock, agregado_por } = req.body;

        if (!nombre || !marca || !precio || !stock || !agregado_por) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const usuario = await Usuario.findByPk(agregado_por);
        if (!usuario) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        const nuevoProducto = await Producto.create({ nombre, marca, precio, stock, agregado_por });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('❌ Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, marca, precio, stock } = req.body;

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await producto.update({ nombre, marca, precio, stock });
        res.json(producto);
    } catch (error) {
        console.error('❌ Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await producto.destroy();
        res.json({ mensaje: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error('❌ Error al eliminar producto:', error);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};

module.exports = { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto };
