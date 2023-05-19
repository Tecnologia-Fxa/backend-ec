const router = require('express').Router() //Objeto enrutador de express

router.post('/create-order', (req,res)=>{
    const body = req.body
    //mostrar resultado del webhook
    console.log('Solicitud de webhook recibida:', body);
  
    // Enviar una respuesta al servidor de WooCommerce
    res.sendStatus(200);
})

router.post('/cotizador-env', (req,res)=>{
    const body = req.body
    //mostrar resultado del webhook
    console.log('Solicitud de webhook recibida:', body);
  
    // Enviar una respuesta al servidor de WooCommerce
    res.json({costo_envio:2.68});
})

module.exports = router //Retornamos el objeto enrutador