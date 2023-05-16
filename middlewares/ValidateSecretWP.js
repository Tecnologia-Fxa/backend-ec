const crypto = require('crypto');

require('dotenv').config(); // Cargar las variables de entorno

const ValidateSecretWp = (req,res,next)=>{

    const signature = req.headers['x-wc-webhook-signature'];
    const payload = JSON.stringify(req.body);
    
    const generatedSignature = crypto
    .createHmac('sha256', process.env.SECRET)
    .update(payload)
    .digest('base64');
    
    console.log(signature)
    console.log(generatedSignature)
  
    if (generatedSignature === signature) {
      // La firma es válida, la solicitud es auténtica
      // Procesa la solicitud del webhook aquí
      console.log('Solicitud de webhook válida');
      next();
    } else {
      // La firma es inválida, la solicitud puede no ser auténtica
      console.log('Solicitud de webhook inválida');
      res.sendStatus(401);
    }
}

module.exports = ValidateSecretWp