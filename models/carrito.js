const { DataTypes } = require('sequelize');
const sequelize = require('../Config/database');
const Usuario = require('./usuario');
const Producto = require('./producto');

const Carrito = sequelize.define('Carrito', {
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
    producto_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Producto,
            key: 'id'
        }
    },
    cantidad: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    tableName: 'carrito',
    timestamps: false
});

// Definir relaciones
Carrito.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Carrito.belongsTo(Producto, { foreignKey: 'producto_id' });

module.exports = Carrito;
