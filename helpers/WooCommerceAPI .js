require('dotenv').config(); // Cargar las variables de entorno

const WooCommerceAPI = require('woocommerce-api');
 
const WooCommerce = new WooCommerceAPI({
  url: 'https://fxa.com.ec',
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_SECRET_KEY,
});

module.exports = WooCommerce