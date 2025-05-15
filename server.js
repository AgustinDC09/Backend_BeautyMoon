require('dotenv').config(); // Cargar las variables de entorno primero
const express = require('express');
const config = require('./Config/config.js'); // Asegúrate de que la ruta es correcta

const app = express();
const sequelize = require('./Config/database');
// Importamos las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const productoRoutes = require('./routes/productosRoutes');
const carritoRoutes = require('./routes/carritoRoutes');
const transaccionRoutes = require('./routes/transaccionesRoutes');
const envioRoutes = require('./routes/envioRoutes');

app.use(express.json());

// Configuración de rutas
app.use('/usuarios', usuarioRoutes);
app.use('/productos', productoRoutes);
app.use('/carrito', carritoRoutes);
app.use('/transacciones', transaccionRoutes);
app.use('/envios', envioRoutes);

sequelize.sync({ force: false })
    .catch(err => console.error('❌ Error al sincronizar la base de datos:', err));

app.get('/', (req, res) => {
    res.send('¡El backend está funcionando! 🚀');
});

console.log(`Puerto configurado: ${config.port}`);

app.listen(config.port, () => {
    console.log(`📡 Servidor escuchando en http://localhost:${config.port}`);
});
