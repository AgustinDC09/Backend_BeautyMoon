const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Usamos 'Config' con mayúscula según tu cambio
const Usuario = require('./usuario');

const Transaccion = sequelize.define('Transaccion', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    usuario_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    monto: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    metodo_pago: { 
        type: DataTypes.STRING(45), 
        allowNull: false 
    },
    fecha: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    }
}, {
    tableName: 'transacciones',
    timestamps: false
});

// Relación con Usuario
Transaccion.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = Transaccion;
