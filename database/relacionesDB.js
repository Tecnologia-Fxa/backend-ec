const CiudadModel = require("./models/CiudadModel")
const ClienteModel = require("./models/ClienteModel")
const PedidoModel = require("./models/PedidoModel")
const ProductosContificoModel = require("./models/ProductosContificoModel")
const ProductosPedidoModel = require("./models/ProductosPedidoModel")
const ProvinciaModel = require("./models/ProvinciaModel")
const TrayectoEnvioModel = require("./models/TrayectoEnvioModel")




//Relaciones 1:M
//1 Provincia Tiene Asociadas Muchas Ciudades (foranea en ciudad)
//El modelo que lleva la foranea es el que tiene el belongsTo
ProvinciaModel.hasMany(CiudadModel, { as:'ciudad', foreignKey:'cod_provincia_fk' })
CiudadModel.belongsTo(ProvinciaModel, {foreignKey:'cod_provincia_fk'})

//Relaciones 1:M
TrayectoEnvioModel.hasMany(CiudadModel, { as:'ciudad', foreignKey:'cod_trayecto_envio_fk' })
CiudadModel.belongsTo(TrayectoEnvioModel, {foreignKey:'cod_trayecto_envio_fk'})

//Relaciones 1:M
//1 Cliente Tiene Asociados Muchos Pedidos (foranea en Pedido)
//El modelo que lleva la foranea es el que tiene el belongsTo
ClienteModel.hasMany(PedidoModel, { as:'pedido', foreignKey:'cedula_ruc_cliente_fk' })
PedidoModel.belongsTo(ClienteModel, {foreignKey:'cedula_ruc_cliente_fk'})

//Relaciones 1:M
//1 Ciudad Tiene Asociados Muchos Pedidos (foranea en Pedido)
//El modelo que lleva la foranea es el que tiene el belongsTo
CiudadModel.hasMany(PedidoModel, { as:'pedido', foreignKey:'cod_ciudad_envio_fk' })
PedidoModel.belongsTo(CiudadModel, {foreignKey:'cod_ciudad_envio_fk'})

//Relaciones 1:M
//1 Producto Tiene Asociados Muchos producto_Pedido (foranea en producto_Pedido)
//El modelo que lleva la foranea es el que tiene el belongsTo
ProductosContificoModel.hasMany(ProductosPedidoModel, { as:'producto_pedido', foreignKey:'cod_producto_fk' })
ProductosPedidoModel.belongsTo(ProductosContificoModel, {foreignKey:'cod_producto_fk'})

//Relaciones 1:M
//1 Pedido Tiene Asociados Muchos producto_Pedido (foranea en producto_Pedido)
//El modelo que lleva la foranea es el que tiene el belongsTo
PedidoModel.hasMany(ProductosPedidoModel, { as:'producto_pedido', foreignKey:'cod_pedido_fk' })
ProductosPedidoModel.belongsTo(PedidoModel, {foreignKey:'cod_pedido_fk'})



