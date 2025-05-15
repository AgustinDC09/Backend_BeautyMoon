const Envio = require('../models/envio');
const Transaccion = require('../models/transaccion');

// Obtener todos los envíos
const obtenerEnvios = async (req, res) => {
    try {
        const envios = await Envio.findAll({
            include: [{ model: Transaccion, attributes: ['monto', 'metodo_pago', 'fecha'] }]
        });
        res.json(envios);
    } catch (error) {
        console.error('❌ Error al obtener envíos:', error);
        res.status(500).json({ error: 'Error al obtener envíos' });
    }
};

// Crear un nuevo envío
const crearEnvio = async (req, res) => {
    try {
        const { transaccion_id, direccion } = req.body;

        // Validar datos
        if (!transaccion_id || !direccion) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const transaccion = await Transaccion.findByPk(transaccion_id);
        if (!transaccion) {
            return res.status(404).json({ error: 'La transacción no existe' });
        }

        const nuevoEnvio = await Envio.create({ transaccion_id, direccion });
        res.status(201).json(nuevoEnvio);
    } catch (error) {
        console.error('❌ Error al crear envío:', error);
        res.status(500).json({ error: 'Error al crear envío' });
    }
};

// Actualizar estado de un envío
const actualizarEstadoEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const envio = await Envio.findByPk(id);
        if (!envio) {
            return res.status(404).json({ error: 'Envío no encontrado' });
        }

        await envio.update({ estado });
        res.json(envio);
    } catch (error) {
        console.error('❌ Error al actualizar estado de envío:', error);
        res.status(500).json({ error: 'Error al actualizar estado de envío' });
    }
};

// Eliminar un envío
const eliminarEnvio = async (req, res) => {
    try {
        const { id } = req.params;

        const envio = await Envio.findByPk(id);
        if (!envio) {
            return res.status(404).json({ error: 'Envío no encontrado' });
        }

        await envio.destroy();
        res.json({ mensaje: 'Envío eliminado correctamente' });
    } catch (error) {
        console.error('❌ Error al eliminar envío:', error);
        res.status(500).json({ error: 'Error al eliminar envío' });
    }
};

module.exports = { obtenerEnvios, crearEnvio, actualizarEstadoEnvio, eliminarEnvio };
