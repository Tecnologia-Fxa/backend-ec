const { default: axios } = require("axios");
const ObtenerCodigoCiudadEnvio = require("../helpers/ObtenerCodigoCiudadEnvio");
const GenerarPdfDeBase64 = require("../helpers/GenerarPdfDeBase64");
const PedidoModel = require("../database/models/PedidoModel");

require('dotenv').config(); // Cargar las variables de entorno


const GenerarGuiaServientrega = async(data) =>{

    try {
        
        let documento_ruc = data.meta_data.find(el => el.key === '_billing_document')

        let estructuraGenerarGuia = { 
            "id_tipo_logistica":1,
            "detalle_envio_1":"",
            "detalle_envio_2":"",
            "detalle_envio_3":"",
            "id_ciudad_origen":1,
            "id_ciudad_destino": await ObtenerCodigoCiudadEnvio(data.shipping),
            "id_destinatario_ne_cl":documento_ruc.value,
            "razon_social_desti_ne":`${data.shipping.first_name} ${data.shipping.last_name}`,
            "nombre_destinatario_ne":data.shipping.first_name,
            "apellido_destinatar_ne":data.shipping.last_name,
            "direccion1_destinat_ne": `${data.shipping.address_1} - ${data.shipping.address_2}`,
            "sector_destinat_ne" :"",
            "telefono1_destinat_ne":(data.shipping.phone==='')?data.billing.phone:data.shipping.phone,
            "telefono2_destinat_ne":(data.shipping.phone==='')?'':data.billing.phone,
            "codigo_postal_dest_ne":data.shipping.postcode,
            "id_remitente_cl":"1793189210001",
            "razon_social_remite":"SILVER-COMPANY-EC S.A.S",
            "nombre_remitente":"SILVER",
            "apellido_remite":"COMPANY",
            "direccion1_remite" :"Parque california dos via daule km 12, Guayaquil",
            "sector_remite":"",
            "telefono1_remite":"+593963238661",
            "telefono2_remite":"",
            "codigo_postal_remi":"090706",
            "id_producto":2,
            "contenido":"Accesorios Para Mujer, Delicado",
            "numero_piezas":1,
            "valor_mercancia":data.total,
            "valor_asegurado":0,
            "largo":0,
            "ancho":0,
            "alto" :0,
            "peso_fisico" :0.5,
            "login_creacion":process.env.LOGIN_CREACION_SERVIENTREGA,
            "password":process.env.PASSWORD_SERVIENTREGA
        }
        console.log("<<<<<<<<<<<<<<<<Generar GUÍA SERVIENTREGA>>>>>>>>>>>>>>>>")
        console.log(estructuraGenerarGuia)

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

        const resultGuia = await axios.post(`${process.env.URL_SERVIENTREGA_1}/guiawebs`, estructuraGenerarGuia)

        console.log(resultGuia)

        const resultBase64 = await axios.get(`${process.env.URL_SERVIENTREGA_2}/GuiasWeb/['${resultGuia.data.id}','SIL.APIRESTSILVER','6Z48WQ','1']`)

        console.log(resultBase64)
        
        const guia_pedido =  GenerarPdfDeBase64(resultBase64.data.archivoEncriptado, {name:`guiapedido-${data.id}`})

        await PedidoModel.update({guia_pedido},{where:{codigo_pedido:data.id}}).then(()=>{
            console.log("Guia De Pedido Generada Con exito")
        })

        return guia_pedido
        
    } catch (error) {
        if(error.response && error.response.status){
            console.log(error.response.status)
            console.log(error.response.data)

        }else{
            console.log(error)

        }
    }
}


module.exports = GenerarGuiaServientrega