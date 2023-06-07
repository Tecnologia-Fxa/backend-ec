
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class ClienteModel extends Model {};

//Indicamos los campos de nuestro modelo y adicional a esto al final indicamos el nombre que tendra en la base de datos
ClienteModel.init({

    cedula_ruc:{
        type: DataTypes.STRING(30),
        primaryKey: true
    },

    es_extranjero:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    es_cedula:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    nombre_cliente:{
        type: DataTypes.STRING(50),
        allowNull: false
    },

    apellido_cliente:{
        type: DataTypes.STRING(50),
        allowNull: false
    },

    correo_cliente:{
        type: DataTypes.STRING(75),
        allowNull: false
    },

    telefono_cliente:{
        type: DataTypes.STRING(20),
        allowNull: false
    },

    resp_contifico:{
        type: DataTypes.STRING(250),
        allowNull: false
    }

},{
    sequelize,
    modelName: 'cliente',
    timestamps: false,
    freezeTableName: true
});


module.exports = ClienteModel