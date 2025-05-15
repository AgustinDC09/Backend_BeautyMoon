const express = require('express');
const router = express.Router();
const transaccionController = require('../controllers/transaccionController');
const Transaccion = require('../models/transaccion'); // Asegúrate de que esta línea está aquí

// Obtener todas las transacciones de un usuario
router.get('/', async (req, res) => {
    try {
        const transacciones = await Transaccion.findAll();

        if (transacciones.length === 0) {
            return res.json([]); // No hay registros, pero no es error
        }

        res.json(transacciones);
    } catch (error) {
        console.error('❌ Error en consulta de transacciones:', error);
        res.status(500).json({ error: 'Error interno en la consulta de transacciones' });
    }
});


// Crear una nueva transacción
router.post('/', transaccionController.crearTransaccion);

// Eliminar una transacción por ID
router.delete('/:id', transaccionController.eliminarTransaccion);

module.exports = router;
