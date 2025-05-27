const express = require('express');
const cors = require('cors'); // 🔹 CORS para evitar bloqueos en frontend
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.use(cors({ origin: "https://agustindc09.github.io", methods: ["GET", "POST", "DELETE"] })); // 🔹 Evita bloqueos de CORS

// 🔹 Rutas actualizadas con mejor manejo de errores
router.get('/', usuarioController.obtenerUsuarios);
router.post('/registro', usuarioController.registrarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
