const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const Usuario = require('./usuario'); // Relación con el usuario que agrega el producto

const Producto = sequelize.define('Producto', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    nombre: { 
        type: DataTypes.STRING(45), 
        allowNull: false 
    },
    marca: { 
        type: DataTypes.STRING(45), 
        allowNull: false 
    },
    precio: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    },
    stock: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    agregado_por: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    tableName: 'product',
    timestamps: false
});

Producto.belongsTo(Usuario, { foreignKey: 'agregado_por' });

module.exports = Producto;
