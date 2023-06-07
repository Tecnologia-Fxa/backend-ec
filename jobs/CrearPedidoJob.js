const { default: axios } = require('axios');
const sequelize = require('../database/database');
const PedidoModel = require('../database/models/PedidoModel');
const GenerarDetallesDeProductos = require('../helpers/GenerarDetallesDeProductos');
const ManejoCodDoc = require('../helpers/ManejoCodDoc');
const ObtenerCodigoCiudadEnvio = require('../helpers/ObtenerCodigoCiudadEnvio');

require('dotenv').config(); // Cargar las variables de entorno

const formatearFecha = (fecha) =>{
    // Obtener la fecha actual
    const fechaActual = new Date(fecha);

    // Obtener el día, mes y año de la fecha actual
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que se suma 1
    const anio = fechaActual.getFullYear();

    // Formatear la fecha en el formato deseado (dd/mm/yyyy)
    return `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${anio}`;

}

const CrearPedidoJob = async (data) => {
    let documentoActual;
    
    const headers = {
      'Content-Type': 'application/json', // Tipo de contenido
      'Authorization': process.env.AUTHORIZATION_CONTIFICO_KEY // Token de autorización
    };

    // Iniciar una transacción
    const t = await sequelize.transaction();
  
    try {

      await PedidoModel.findOne({where:{codigo_pedido:data.id}}).then(async(pedidoBd)=>{
        
        if(pedidoBd){
          documentoActual = pedidoBd
        }else{
          // Obtener el documento actual dentro de la transacción
          documentoActual = await PedidoModel.findOne({
            order: [['documento', 'DESC']],
            attributes: ['documento'],
            lock: true, // Bloquear la fila para evitar conflictos
            transaction: t,
          });
        }
        
          
      
          // Generar el nuevo documento basado en el actual
          const nuevoDocumento = ManejoCodDoc(documentoActual?documentoActual.dataValues.documento:'070-002-000000001');


          let documento_ruc = data.meta_data.find(el => el.key === '_billing_document')
          let es_cedula = data.meta_data.find(el => el.key === '_billing_cedula_or_ruc')
          let es_extranjero = data.meta_data.find(el => el.key === '_shipping_es_extranjero')

          let detallesDePedidos = await GenerarDetallesDeProductos(data.line_items, data.shipping_total)

          // Actualizar el consecutivo en la base de datos
          console.log("<<<<<<<<<<<<<Seccion Pedido>>>>>>>>>>>>>")
          let estructuraPedido = {
              "pos" : process.env.AUTHORIZATION_CONTIFICO_TOKEN,
              "fecha_emision": formatearFecha(data.date_created),
              "tipo_documento": "FAC",
              "documento": nuevoDocumento,
              "estado": "C",
              "electronico" : true,
              "autorizacion": "",
              "caja_id": null,
              "cliente": {
                  "ruc": (es_cedula.value==='cedula')?'':documento_ruc.value,
                  "cedula": (es_cedula.value==='cedula')?documento_ruc.value:'',
                  "razon_social":  `${data.billing.first_name} ${data.billing.last_name}`,
                  "telefonos": data.billing.phone,
                  "direccion": `${data.billing.address_1} - ${data.billing.address_2}`,
                  "tipo": (es_cedula.value==='cedula')?"N":"J",
                  "email": data.billing.email,
                  "es_extranjero": (es_extranjero.value === "extranjero")?true:false
              },
              "vendedor": {
                  "ruc": process.env.RUC_VENDEDOR_ONLINE,
                  "cedula": process.env.CEDULA_VENDEDOR_ONLINE,
                  "razon_social": process.env.RAZON_SOCIAL_VENDEDOR_ONLINE,
                  "telefonos": process.env.TELEFONO_VENDEDOR_ONLINE,
                  "direccion": process.env.DIRECCION_VENDEDOR_ONLINE,
                  "tipo": process.env.TIPO_VENDEDOR_ONLINE,
                  "email": process.env.EMAIL_VENDEDOR_ONLINE,
                  "es_extranjero": process.env.ES_EXTRANJERO_VENDEDOR_ONLINE
              },
              "descripcion": "DOCUMENTO DE VENTA - Factura Electronica",
              "subtotal_0": 0.00,
              "subtotal_12": data.total - data.total_tax,
              "iva": data.total_tax,
              "ice":0.00,
              "servicio": 0.00,
              "total": data.total,
              "adicional1": "",
              "adicional2": "",
              "detalles": detallesDePedidos,
              "cobros":[{
                "forma_cobro" : "TC",
                "monto" : data.total,
                "fecha" : formatearFecha(data.date_created),
                "tipo_ping" : "D"
              }]
          }
          console.log(estructuraPedido)

          const resulCreateOrder = await axios.post(`${process.env.URLCONTIFICO}/documento/`, estructuraPedido, {headers}).catch(error => {
            console.log('Error en la solicitud POST:', error);
          });
          console.log(`${process.env.URLCONTIFICO}/documento/`)
          console.log(resulCreateOrder)
          console.log("<<<<<<<<<<<<<Seccion Insertar Orden>>>>>>>>>>>>>")
          
          const resultConfirm= await PedidoModel.upsert(
              {
                codigo_pedido: data.id,
                id_pedido: (resulCreateOrder.data.id)?resulCreateOrder.data.id:"",
                documento: nuevoDocumento,
                fecha_pedido: formatearFecha(data.date_created),
                cedula_ruc_cliente_fk: documento_ruc.value,
                cod_ciudad_envio_fk: await ObtenerCodigoCiudadEnvio(data.shipping),
                subtotal: data.total - data.total_tax,
                total_iva: data.total_tax,
                total_final: data.total,
                direccion: data.shipping.address_1,
                codigo_postal: data.shipping.postcode,
                respContifico: JSON.stringify(resulCreateOrder.data)
              },
              { transaction: t }
          )
          //Confirmamos la inserción
          await t.commit();

          return resultConfirm
      })

      
    
    } catch (error) {
      // Si ocurre un error, deshacer la transacción
      await t.rollback();
      throw error;
    }
  
  };


module.exports = CrearPedidoJob