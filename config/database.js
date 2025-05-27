const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
    config.development.database, 
    config.development.username, 
    config.development.password, 
    {
        host: config.development.host,
        dialect: config.development.dialect,
        port: config.development.port || 3306,
        logging: false, // Evita logs innecesarios
        dialectOptions: {
            ssl: { rejectUnauthorized: false } // Necesario si Clever Cloud usa SSL
        }
    }
);

sequelize.authenticate()
    .then(() => console.log('✅ Conexión a MySQL exitosa en Clever Cloud'))
    .catch(error => console.error('❌ Error al conectar a la base de datos:', error));

module.exports = sequelize;
