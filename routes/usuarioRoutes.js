const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Obtener todos los usuarios
router.get('/', usuarioController.obtenerUsuarios);

// 🔹 Nueva ruta específica para registro
router.post('/registro', usuarioController.registrarUsuario);

// Eliminar usuario
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
