const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/registro', usuarioController.registrarUsuario); // 🔹 Confirma que esta línea está presente

router.get('/', usuarioController.obtenerUsuarios);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
