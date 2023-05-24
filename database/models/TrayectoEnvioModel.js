
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class TrayectoEnvioModel extends Model {};

//Indicamos los campos de nuestro modelo y adicional a esto al final indicamos el nombre que tendra en la base de datos
TrayectoEnvioModel.init({

    id_trayecto_envio:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    descripcion_trayecto_envio:{
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },

    costo_trayecto_envio:{
        type: DataTypes.DOUBLE,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'trayecto_envio',
    timestamps: false,
    freezeTableName: true
});


module.exports = TrayectoEnvioModel