// Importa las dependencias
const express = require('express');
const sequelize = require('./database/database');
const app = express();

require('dotenv').config(); // Cargar las variables de entorno

//Permite la entrada de datos vía json a nuestro servidor
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Configuración del puerto
const port = process.env.PORT || 3003;

//Se llama todo el código de las relaciones (Permite crear la base de datos, Adicional crea las restriciones de relaciones)
require('./database/relacionesDB')

// Ruta basica
app.get('/', (_req, res) => {
  res.send('¡Hola, mundo desde API FXA EC!');
});

//Archivo de rutas del API
app.use('/api/', require('./routes/router')); 

//En dado caso que no encuentre la ruta responde error 404
app.use('*', (_req,res)=>res.status(404).json('Ruta No encontrada'))


// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);

  sequelize.sync( {force: false} ).then(()=>{
    console.log('Conexion a la bd exitosa');
  }).catch(error=>{
      console.log('Error al conectar la bd: ' + error)
  });

});
