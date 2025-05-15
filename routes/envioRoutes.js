const express = require('express');
const router = express.Router();
const envioController = require('../controllers/envioController');

// Obtener todos los envíos
router.get('/', envioController.obtenerEnvios);

// Crear un nuevo envío
router.post('/', envioController.crearEnvio);

// Actualizar el estado de un envío
router.put('/:id', envioController.actualizarEstadoEnvio);

// Eliminar un envío por ID
router.delete('/:id', envioController.eliminarEnvio);

module.exports = router;
