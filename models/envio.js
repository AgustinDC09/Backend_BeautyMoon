const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Recuerda que usamos 'Config' con mayúscula
const Transaccion = require('./transaccion');

const Envio = sequelize.define('Envio', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    transaccion_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Transaccion,
            key: 'id'
        }
    },
    direccion: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    },
    estado: { 
        type: DataTypes.ENUM('Pendiente', 'Enviado', 'Entregado'), 
        defaultValue: 'Pendiente' 
    }
}, {
    tableName: 'envios',
    timestamps: false
});

// Relación con Transacción
Envio.belongsTo(Transaccion, { foreignKey: 'transaccion_id' });

module.exports = Envio;
