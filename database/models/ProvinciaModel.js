
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class ProvinciaModel extends Model {};

//Indicamos los campos de nuestro modelo y adicional a esto al final indicamos el nombre que tendra en la base de datos
ProvinciaModel.init({

    id_provincia:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre_provincia:{
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },

    nomenclatura_provincia:{
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }

},{
    sequelize,
    modelName: 'provincia',
    timestamps: false,
    freezeTableName: true
});


module.exports = ProvinciaModel