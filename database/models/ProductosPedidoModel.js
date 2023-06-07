
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class ProductosPedidoModel extends Model {};

//Indicamos los campos de nuestro modelo y adicional a esto al final indicamos el nombre que tendra en la base de datos
ProductosPedidoModel.init({

    cod_producto_fk:{
        type: DataTypes.STRING(10),
        primaryKey: true
    },

    cod_pedido_fk:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    precio:{
        type: DataTypes.REAL,
        allowNull: false
    },

    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    porcentaje_iva:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    base_grabable:{
        type: DataTypes.INTEGER,
        allowNull: false
    },


},{
    sequelize,
    modelName: 'producto_pedido',
    timestamps: false,
    freezeTableName: true
});


module.exports = ProductosPedidoModel