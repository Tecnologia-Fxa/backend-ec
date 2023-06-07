require('dotenv').config(); // Cargar las variables de entorno

const EstructuraMailPedidoCreado = (data, servientregaReturn) =>{
    return `
        <!DOCTYPE html>
        <html lang="en" xmlns="https://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <title></title>
            <!--[if mso]> 
        <style> 
        table {border-collapse:collapse;border-spacing:0;border:none;margin:0;} 
        div, td {padding:0;} 
        div {margin:0 !important;} 
        </style> 
        <noscript> 
        <xml> 
        <o:OfficeDocumentSettings> 
        <o:PixelsPerInch>96</o:PixelsPerInch> 
        </o:OfficeDocumentSettings> 
        </xml> 
        </noscript> 
        <![endif]-->
            <style>
                table, td, div, h1, p {
                    font-family: Arial, sans-serif;
                }
            </style>
        </head>
        <body style="margin:0;padding:0;word-spacing:normal;background-color:#cbcacc;">
            <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#cbcacc;">
                <table role="presentation" style="width:100%;border:none;border-spacing:0;">
                    <tr>
                        <td align="center" style="padding:0;">
                            <!--[if mso]> 
                                <table role="presentation" align="center" style="width:600px;"> 
                                <tr> 
                                <td> 
                                <![endif]-->
                                    <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                                        <tr>
                                            <td style="padding:40px 30px 30px 30px;text-align:center;font-size:50px;font-weight:bold; background-color: black;">
                                                <a href="https://fxa.com.ec/" style="text-decoration:none; color: #ffffff; -webkit-text-stroke: 1px rgb(255, 255, 255);">
                                                    fxa
                                                </a>
                                            </td>
                                        </tr>
        
                                        <tr>
                                            <td style="padding:30px;background-color:#ffffff;">
                                                <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Pedido generado en FXA ECUADOR</h1>
                                                <p style="margin:0;">El pedido <b>#${data.id}</b> se ha generado exitosamente en nuestro sistema. <br>A continuación, te proporcionamos el enlace para que puedas consultar la guía de seguimiento del pedido:</p>
                                                <center>
                                                    <a style="display: inline-block; background-color: #CB0B7B; padding: 15px 25px; color: #ffffff; border-radius: 10px; margin-top: 25px;" href="${process.env.URL_API_BACKEND}${servientregaReturn}">Guía Pedido</a>
                                                </center>
                                            </td>
                                        </tr>        
                                        <tr>
                                            <td style="padding:30px;background-color:#ffffff;">
                                                <h2 style="margin-top:0;margin-bottom:16px;font-size:18px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Pedido <b>#${data.id}</b></h2>
                                                <div class="contenedor" style="display: flex; flex-wrap: wrap; justify-content: center; align-items: center;">
                                                    
                                                    ${data.line_items.map(orderItems => {
                                                        return `
                                                        <div style="border: black 1px solid; width: 200px; height: 200px; border-radius: 10px; margin: 10px;">
                                                            <h4 style="text-align: center; margin-top: 5px;">${orderItems.name}</h4>
                                                            <h5 style="margin: 3px 20px;">Sku: ${orderItems.sku}</h5>
                                                            <h6 style="margin: 3px 20px;">Cantidad: ${orderItems.quantity}</h6>
                                                            <h6 style="margin: 3px 20px;">Subtotal: ${orderItems.total}</h6>
                                                            <h6 style="margin: 3px 20px;">Iva: ${orderItems.total_tax}</h6>
                                                            <h6 style="margin: 3px 20px;">Total: ${orderItems.total + orderItems.total_tax}</h6>
                                                        </div>
                                                        `
                                                    })}

                                                </div>
                                                <hr>
                                                <h5 style="margin: 5px 20px;">Subtotal Factura: ${data.total - data.total_tax}</h5>
                                                <h5 style="margin: 5px 20px;">Envio: ${data.shipping_total}</h5>
                                                <h5 style="margin: 5px 20px;">Iva Factura: ${data.total_tax}</h5>
                                                <h5 style="margin: 5px 20px;">Total Factura: ${data.total}</h5>
                                            </td>
                                        </tr>        
                                        <tr>
                                            <td style="text-align:center;font-size:20px;font-weight:bold; background-color: #F2AACB;">
                                                <a href="https://fxa.com.ec/" style="text-decoration:none; color: #CB0B7B; -webkit-text-stroke: .2px #CB0B7B;">
                                                    fxa
                                                </a>
                                            </td>
                                        </tr>                    
                                    </table>
                                <!--[if mso]> 
                                </td> 
                                </tr> 
                                </table> 
                            <![endif]-->
                        </td>
                    </tr>
                </table>
            </div>
        </body>
        </html>
    `

}


module.exports = EstructuraMailPedidoCreado