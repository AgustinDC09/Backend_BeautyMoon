const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pago = sequelize.define('Pago', {
    id_transaccion: { 
        type: DataTypes.STRING, 
        primaryKey: true, 
        unique: true 
    },
    usuario_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    estado: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    monto: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    }
}, {
    tableName: 'pagos',
    timestamps: true
});

module.exports = Pago;
