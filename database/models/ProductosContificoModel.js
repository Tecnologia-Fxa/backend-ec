
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../database');

class ProductosContificoModel extends Model {};

//Indicamos los campos de nuestro modelo y adicional a esto al final indicamos el nombre que tendra en la base de datos
ProductosContificoModel.init({

    id:{
        type: DataTypes.STRING(20),
        primaryKey: true
    },

    codigo:{
        type: DataTypes.STRING(10),
        unique:true
    },

    descripcion:{
        type: DataTypes.STRING(75)
    },

    porcentaje_iva:{
        type: DataTypes.INTEGER
    },

    estado:{
        type: DataTypes.STRING(5),
    },

    fecha_creacion:{
        type: DataTypes.DATEONLY,
    },

    pvp1:{
        type: DataTypes.REAL,
    },

    nombre:{
        type: DataTypes.STRING(50)
    },

    cantidad_stock:{
        type:DataTypes.INTEGER
    }


},{
    sequelize,
    modelName: 'productos_contifico',
    freezeTableName: true
});


module.exports = ProductosContificoModel