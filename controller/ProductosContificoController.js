const { default: axios } = require("axios")
const ProductosContificoModel = require("../database/models/ProductosContificoModel")

require('dotenv').config(); // Cargar las variables de entorno

const headers = {
    'Content-Type': 'application/json', // Tipo de contenido
    'Authorization': process.env.AUTHORIZATION_CONTIFICO_KEY // Token de autorización
};

const ProductosContificoController = {

    //Traer Todos los productos de la base de datos local
    getProductos: async(_req,res)=>{
        const productos = await ProductosContificoModel.findAll()
        res.json(productos)
    },

    //Trae los productos de contifico y los actualiza en la bd local
    updateProductos: async(req,res)=>{
        const {fecha_inicial} = req.query

        try {
            const itemsContifico = await axios.get(`${process.env.URLCONTIFICO}/producto/?fecha_inicial=${fecha_inicial}`, {headers})
            console.log(itemsContifico.data)

            itemsContifico.data.forEach(async(producto) => {
                ProductosContificoModel.upsert(producto)
            });

            res.json("OK")
            
        } catch (error) {
            if(error.response && error.response.status){
                console.log(error.response.status)
                console.log(error.response.data)
    
            }else{
                console.log(error)
    
            }
        }

    }
}

module.exports = ProductosContificoController