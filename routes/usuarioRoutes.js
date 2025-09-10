const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// 🔹 Registro de usuario
router.post('/registro', usuarioController.registrarUsuario);

// 🔹 Obtener todos los usuarios
router.get('/', usuarioController.obtenerUsuarios);

// 🔹 Eliminar usuario por ID
router.delete('/:id', usuarioController.eliminarUsuario);

// 🔹 Recuperar contraseña
router.post('/recuperar', usuarioController.recuperarPassword);

module.exports = router;
