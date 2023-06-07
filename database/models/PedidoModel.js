
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class PedidoModel extends Model {};

//Indicamos los campos de nuestro modelo y adicional a esto al final indicamos el nombre que tendra en la base de datos
PedidoModel.init({

    codigo_pedido:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    id_pedido:{
        type: DataTypes.INTEGER
    },

    documento:{
        type: DataTypes.STRING(20),
        allowNull: false
    },

    fecha_pedido:{
        type: DataTypes.DATE,
        allowNull: false
    },

    cedula_ruc_cliente_fk:{
        type: DataTypes.STRING(30),
        allowNull: false
    },

    cod_ciudad_envio_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    subtotal:{
        type: DataTypes.REAL,
        allowNull: false
    },

    total_iva:{
        type: DataTypes.REAL,
        allowNull: false
    },

    total_final:{
        type: DataTypes.REAL,
        allowNull: false
    },

    direccion:{
        type: DataTypes.STRING(75),
        allowNull: false
    },

    codigo_postal:{
        type: DataTypes.STRING(20),
        allowNull: false
    },

    guia_pedido:{
        type: DataTypes.STRING(150)
    },

    respContifico:{
        type: DataTypes.STRING(300)
    }

},{
    sequelize,
    modelName: 'pedido',
    freezeTableName: true
});


module.exports = PedidoModel