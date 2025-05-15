const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const Carrito = require('../models/carrito'); // Asegúrate de que esta línea está aquí

// Obtener el carrito de un usuario
router.get('/', async (req, res) => {
    try {
        console.log('🔍 Ejecutando consulta de carritos...');
        const carritos = await Carrito.findAll();
        console.log('✅ Carritos obtenidos:', carritos);

        res.json(carritos);
    } catch (error) {
        console.error('❌ Error interno en la consulta de carritos:', error);
        res.status(500).json({ error: 'Error interno en la consulta de carritos' });
    }
});

// Agregar un producto al carrito
router.post('/', carritoController.agregarAlCarrito);

// Eliminar un producto del carrito por ID
router.delete('/:id', carritoController.eliminarDelCarrito);

module.exports = router;
