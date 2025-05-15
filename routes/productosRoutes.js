const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener todos los productos
router.get('/', productoController.obtenerProductos);

// Crear un nuevo producto
router.post('/', productoController.crearProducto);

// Actualizar un producto por ID
router.put('/:id', productoController.actualizarProducto);

// Eliminar un producto por ID
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;
