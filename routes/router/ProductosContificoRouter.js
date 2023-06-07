const ProductosContificoController = require('../../controller/ProductosContificoController');

const router = require('express').Router() //Objeto enrutador de express


router.get('/', ProductosContificoController.getProductos) // Llamamos la funcion de listar todos los productos

router.get('/update-productos-contifico', ProductosContificoController.updateProductos)

module.exports = router //Retornamos el objeto enrutador