require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

// 🔹 Configuración mejorada de CORS
app.use(cors({
    origin: ["https://agustindc09.github.io", "http://localhost:3000"], // 🔹 Permitir solicitudes desde GitHub Pages y pruebas locales
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 🔹 Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // 🔹 Headers permitidos
    credentials: true
}));

app.use(express.json());

// 🔹 Middleware adicional para manejar CORS correctamente en navegadores antiguos
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://agustindc09.github.io");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🔹 Importamos rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuarios', usuarioRoutes);

// 🔹 Conectar a MySQL en Clever Cloud
sequelize.authenticate()
    .then(() => console.log("✅ Conexión a MySQL en Clever Cloud exitosa"))
    .catch(err => console.error("❌ Error en la conexión a MySQL en Clever Cloud:", err));

sequelize.sync({ force: false })
    .catch(err => console.error("❌ Error al sincronizar la base de datos:", err));

app.get('/', (req, res) => {
    res.send('¡Backend funcionando con CORS mejorado! 🚀');
});

// 🔹 Configuración de puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`📡 Servidor escuchando en Render: https://backend-beautymoon.onrender.com`);
});
