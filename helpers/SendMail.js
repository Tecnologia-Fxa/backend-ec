const nodemailer = require('nodemailer')

require('dotenv').config(); // Cargar las variables de entorno

const SendMail = (options) =>{
    // Configurar el transporte del correo
    const transporter = nodemailer.createTransport({
        host: process.env.SERVER_EMAIL_SENDER,
        auth: {
        user: process.env.DIRECCION_EMAIL_SENDER, // Dirección de correo electrónico
        pass: process.env.PASSWORD_EMAIL_SENDER, // Contraseña de correo electrónico
        },
    });

    //Opciones del envio de correo
    const mailOptions = {
        from: process.env.DIRECCION_EMAIL_SENDER, // Dirección de correo electrónico del remitente
        to: options.to, // Dirección de correo electrónico del destinatario
        subject: options.subjet, // Asunto del correo electrónico
        html: options.html, // Contenido del correo electrónico
    };

    console.log(transporter)
    console.log(mailOptions)
    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log(error);
        } else {
        console.log('Correo electrónico enviado: ' + info.response);
        }
    });
}

module.exports = SendMail
