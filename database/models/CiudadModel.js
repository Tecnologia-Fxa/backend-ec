
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class CiudadModel extends Model {};

//Indicamos los campos de nuestro modelo y adicional a esto al final indicamos el nombre que tendra en la base de datos
CiudadModel.init({

    id_ciudad:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_ciudad:{
        type: DataTypes.STRING(50),
        allowNull: false
    },

    cod_provincia_fk:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'ciudad',
    timestamps: false,
    freezeTableName: true
});


module.exports = CiudadModel