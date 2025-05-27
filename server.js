require('dotenv').config(); // Cargar las variables de entorno primero
const express = require('express');
const sequelize = require('./config/database');
const fetch = require("node-fetch");

const app = express();

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

// Conectar a MySQL en Clever Cloud
sequelize.authenticate()
    .then(() => console.log("✅ Conexión a MySQL en Clever Cloud exitosa"))
    .catch(err => console.error("❌ Error en la conexión a MySQL en Clever Cloud:", err));

sequelize.sync({ force: false })
    .catch(err => console.error('❌ Error al sincronizar la base de datos:', err));

app.get('/', (req, res) => {
    res.send('¡El backend está funcionando en Clever Cloud! 🚀');
});

// URL del backend en Clever Cloud
const BACKEND_URL = "https://backend-beautymoon.clever-cloud.com";

// Ruta para procesar vendedores desde el servicio externo
app.post("/procesar-vendedor", async (req, res) => {
    try {
        const response = await fetch(`${BACKEND_URL}/procesar_vendedor`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ Error al comunicar con el servicio de Python:", error);
        res.status(500).json({ error: "Error en el procesamiento con Python" });
    }
});

// Configurar puerto desde las variables de entorno
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`📡 Servidor escuchando en Clever Cloud: ${BACKEND_URL}`);
});
