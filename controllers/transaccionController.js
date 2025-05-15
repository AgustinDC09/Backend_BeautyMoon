const Transaccion = require('../models/transaccion');
const Usuario = require('../models/usuario');

// Obtener todas las transacciones de un usuario
const obtenerTransacciones = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const transacciones = await Transaccion.findAll({
            where: { usuario_id: usuarioId },
            attributes: ['id', 'monto', 'metodo_pago', 'fecha']
        });
        res.json(transacciones);
    } catch (error) {
        console.error('❌ Error al obtener transacciones:', error);
        res.status(500).json({ error: 'Error al obtener transacciones' });
    }
};

// Crear una nueva transacción
const crearTransaccion = async (req, res) => {
    try {
        const { usuario_id, monto, metodo_pago } = req.body;

        // Validar datos
        if (!usuario_id || !monto || !metodo_pago) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const usuario = await Usuario.findByPk(usuario_id);
        if (!usuario) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }

        const nuevaTransaccion = await Transaccion.create({ usuario_id, monto, metodo_pago });
        res.status(201).json(nuevaTransaccion);
    } catch (error) {
        console.error('❌ Error al crear transacción:', error);
        res.status(500).json({ error: 'Error al crear transacción' });
    }
};

// Eliminar una transacción
const eliminarTransaccion = async (req, res) => {
    try {
        const { id } = req.params;

        const transaccion = await Transaccion.findByPk(id);
        if (!transaccion) {
            return res.status(404).json({ error: 'Transacción no encontrada' });
        }

        await transaccion.destroy();
        res.json({ mensaje: 'Transacción eliminada correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar transacción:', error);
        res.status(500).json({ error: 'Error al eliminar transacción' });
    }
};

module.exports = { obtenerTransacciones, crearTransaccion, eliminarTransaccion };
