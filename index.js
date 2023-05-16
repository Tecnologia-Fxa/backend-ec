// Importa las dependencias
const express = require('express');
const app = express();

require('dotenv').config(); // Cargar las variables de entorno

//Permite la entrada de datos vía json a nuestro servidor
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// Configuración del puerto
const port = process.env.PORT || 3003;

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
});
