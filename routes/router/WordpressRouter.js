const WordpressController = require('../../controller/WordpressController');
const SendMail = require('../../helpers/SendMail');
const WooCommerce = require('../../helpers/WooCommerceAPI ');

const router = require('express').Router() //Objeto enrutador de express

router.post('/create-order', WordpressController.GenerarOrden)

router.post('/cotizador-env', WordpressController.CotizadorEnvios)

router.get('/testpdf', async(_req,res)=>{
    const responseData = {
        success: false,
        products:[]
    }

    try {
        console.log(WooCommerce._getUrl('productos'))
       const { data } = await  WooCommerce.get(
        'productos',
        {
            per_page: 50
        }
       )
       responseData.success = true
       responseData.products = data

    } catch (error) {
        console.log(error)
        responseData.error = error.message
        res.status( 500 ).json( responseData )
    }
})

module.exports = router //Retornamos el objeto enrutador