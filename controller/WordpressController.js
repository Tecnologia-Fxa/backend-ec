const CiudadModel = require("../database/models/CiudadModel");
const ProvinciaModel = require("../database/models/ProvinciaModel");
const TrayectoEnvioModel = require("../database/models/TrayectoEnvioModel");

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
            res.json({costo_envio:0,estado_cotizador:3});
    }

}

module.exports = WordpressController