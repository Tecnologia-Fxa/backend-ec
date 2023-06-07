const ValidateSecretWp = require('../middlewares/ValidateSecretWP');

const express = require('express');
const router = require('express').Router() //Objeto enrutador de express

//Archivo de rutas del API
router.use('/wp/', ValidateSecretWp, require('./router/WordpressRouter')); 

router.use('/producos-contifico', require('./router/ProductosContificoRouter'))

//Mostrar archivos estaticos
router.use('/public', express.static('public'));

module.exports = router //Retornamos el objeto enrutador