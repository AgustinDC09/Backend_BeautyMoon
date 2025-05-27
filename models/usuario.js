const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    username: { 
        type: DataTypes.STRING(16), 
        allowNull: false, 
        unique: true 
    },
    email: { 
        type: DataTypes.STRING(255), 
        allowNull: false, 
        unique: true 
    },
    password: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = Usuario;
