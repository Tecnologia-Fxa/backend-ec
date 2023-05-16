const router = require('express').Router() //Objeto enrutador de express

//Archivo de rutas del API
router.use('/wp/', require('./router/WordpressRouter')); 

module.exports = router //Retornamos el objeto enrutador