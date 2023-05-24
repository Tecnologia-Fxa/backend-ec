const CiudadModel = require("./models/CiudadModel")
const ProvinciaModel = require("./models/ProvinciaModel")
const TrayectoEnvioModel = require("./models/TrayectoEnvioModel")




//Relaciones 1:M
//1 Provincia Tiene Asociadas Muchas Ciudades (foranea en ciudad)
//El modelo que lleva la foranea es el que tiene el belongsTo
ProvinciaModel.hasMany(CiudadModel, { as:'ciudad', foreignKey:'cod_provincia_fk' })
CiudadModel.belongsTo(ProvinciaModel, {foreignKey:'cod_provincia_fk'})

//Relaciones 1:M
//1 Provincia Tiene Asociadas Muchas Ciudades (foranea en ciudad)
//El modelo que lleva la foranea es el que tiene el belongsTo
TrayectoEnvioModel.hasMany(CiudadModel, { as:'ciudad', foreignKey:'cod_trayecto_envio_fk' })
CiudadModel.belongsTo(TrayectoEnvioModel, {foreignKey:'cod_trayecto_envio_fk'})