require('dotenv').config(); // Cargar variables del .env

module.exports = {
    port: process.env.PORT || 3000,  // 🔹 Aseguramos que siempre tenga un valor
    development: { 
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
    }
};
