const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/', usuarioController.crearUsuario);

// Ruta para borrar usuario existente
router.delete('/:id', usuarioController.eliminarUsuario);


module.exports = router;
