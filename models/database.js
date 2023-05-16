// Importa las dependencias
const Sequelize = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql', // Driver BD en la que se implementa
});

// Prueba de conexión
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

// Exporta el objeto de Sequelize
module.exports = sequelize;
