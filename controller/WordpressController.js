const WordpressController = {

    CotizadorEnvios: (req,res) =>{
        const body = req.body
        //mostrar resultado del webhook
        console.log('Solicitud de webhook recibida:', body);
      
    
        // Enviar una respuesta al servidor de WooCommerce
        res.json({costo_envio:123});
    }

}

module.exports = WordpressController