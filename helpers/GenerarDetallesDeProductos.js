const ProductosContificoModel = require("../database/models/ProductosContificoModel");

const GenerarDetallesDeProductos = async (items, shipping_total, t) => {
    let productosPedi = [];
  
    for (const el of items) {
      let codigo = el.sku.replace(/\D/g, "");
      let productoResult = await ProductosContificoModel.findOne({
        where: { codigo },
        transaction: t,
      });
        if(productoResult.dataValues.id){
            productosPedi.push({
                producto_id: productoResult.dataValues.id,
                cantidad: el.quantity,
                precio: parseFloat(el.total) + parseFloat(el.total_tax),
                porcentaje_iva: process.env.PORCENTAJE_IVA,
                porcentaje_descuento: 0.0,
                base_cero: 0.0,
                base_gravable: parseFloat(el.total) + parseFloat(el.total_tax),
                base_no_gravable: 0.0,
            });
        }
    }
  
    if (parseInt(shipping_total) !== 0) {
      productosPedi.push({
        producto_id: process.env.ID_SERVICIO_ENVIO,
        cantidad: 1,
        precio: shipping_total,
        porcentaje_iva: process.env.PORCENTAJE_IVA,
        porcentaje_descuento: 0.0,
        base_cero: 0.0,
        base_gravable: shipping_total,
        base_no_gravable: 0.0,
      });
    }
  
    return productosPedi;
  };
  
  module.exports = GenerarDetallesDeProductos;
  