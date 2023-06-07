const CiudadModel = require("../database/models/CiudadModel")
const ProvinciaModel = require("../database/models/ProvinciaModel")

const ObtenerCodigoCiudadEnvio = async(shipping) =>{

    let nomenclatura_provincia = shipping.state.split(".")[1]

    const estado = await ProvinciaModel.findOne({where:{nomenclatura_provincia}, attributes:['id_provincia']})
        
    const ciudad = await CiudadModel.findOne({where:{
        nombre_ciudad:shipping.city,
        cod_provincia_fk:estado.id_provincia
        },
        attributes:['id_ciudad']
    })

    return ciudad.id_ciudad
}

module.exports = ObtenerCodigoCiudadEnvio