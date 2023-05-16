const ValidateSecretWp = require('../middlewares/ValidateSecretWP');

const router = require('express').Router() //Objeto enrutador de express

//Archivo de rutas del API
router.use('/wp/', ValidateSecretWp, require('./router/WordpressRouter')); 

module.exports = router //Retornamos el objeto enrutador