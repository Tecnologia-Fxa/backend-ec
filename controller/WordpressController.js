const CiudadModel = require("../database/models/CiudadModel");
const PedidoModel = require("../database/models/PedidoModel");
const ProvinciaModel = require("../database/models/ProvinciaModel");
const TrayectoEnvioModel = require("../database/models/TrayectoEnvioModel");
const EstructuraMailPedidoCreado = require("../helpers/EstructuraMailPedidoCreado");
const SendMail = require("../helpers/SendMail");
const CrearClienteJob = require("../jobs/CrearClienteJob");
const CrearPedidoJob = require("../jobs/CrearPedidoJob");
const GenerarGuiaServientrega = require("../jobs/GenerarGuiaServientrega");

require('dotenv').config(); // Cargar las variables de entorno

const WordpressController = {

    CotizadorEnvios: async(req,res) =>{
        const body = req.body
        //mostrar resultado del webhook
        console.log('Solicitud de webhook recibida:', body);

        if(body.provincia && body.provincia !== '' && body.poblacion && body.poblacion !== ''){
    
            let nomenclatura_provincia = body.provincia.split(".")[1]
        
            const estado = await ProvinciaModel.findOne({where:{nomenclatura_provincia}, attributes:['id_provincia']})
        
            const ciudad = await CiudadModel.findOne({where:{
                nombre_ciudad:body.poblacion,
                cod_provincia_fk:estado.id_provincia
                },
                attributes:['id_ciudad'],
                include:{
                    model:TrayectoEnvioModel,
                    attributes:["costo_trayecto_envio"]
                }
            })
    
            // Enviar una respuesta al servidor de WooCommerce
            res.json({costo_envio:ciudad.trayecto_envio.costo_trayecto_envio, estado_cotizador:1});
            
        }else
            res.json({costo_envio:10, estado_cotizador:3});
    },

    

    GenerarOrden: async(req,res)=>{
        const body = req.body
        //mostrar resultado del webhook
        console.log('<<<<<<<<<<<<Solicitud de webhook recibida>>>>>>>>>>>>');

        if(body.status === 'Procesando' || body.status === 'completed' || body.status === 'Completado'){
            await PedidoModel.findOne({where:{codigo_pedido:body.id}}).then(async(pedidoBd)=>{
                if(!pedidoBd){
                    CrearClienteJob(body).then(()=>{
                        CrearPedidoJob(body).then(()=>{
                            GenerarGuiaServientrega(body).then(servientregaReturn=>{
                                SendMail({
                                    to:process.env.DIRECTION_EMAIL_DESTINATION_INFO,
                                    subjet:"Pedido generado en FXA ONLINE",
                                    html: EstructuraMailPedidoCreado(body, servientregaReturn)
                                })
                            })
                        })
                    })
                }else
                    console.log("El pedido ya existe en la base de datos")
            })
        }else{
            console.log("El pedido solo se genera para pagos completados")
            console.log("<<<<<<<<<<<<<<<<<<<DATA PEDIDO>>>>>>>>>>>>>>>>>>>")
            console.log(body) 
        }



        
        // Enviar una respuesta al servidor de WooCommerce
        res.sendStatus(200);
    }

    

}

module.exports = WordpressController