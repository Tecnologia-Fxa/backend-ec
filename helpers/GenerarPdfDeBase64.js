const base64 = require('base-64')
const fs = require('fs')

require('dotenv').config(); // Cargar las variables de entorno

const GenerarPdfDeBase64 = (base64Data, options) =>{

    // Ruta de la carpeta donde se guardará el archivo PDF
    const folderPath = './public/docs';

    // Crear la carpeta si no existe
    if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    }

    // Decodificar el contenido en base64
    const pdfData = base64.decode(base64Data);
    
    // Obtener la fecha actual
    const currentDate = new Date();

    // Generar el nombre de archivo basado en la fecha y nombrePasadoEnOptions
    const filename = `${options.name}-${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}.pdf`;

    // Ruta y nombre del archivo PDF
    const outputPath = `./public/docs/${filename}`;
    
    // Guardar el archivo PDF
    fs.writeFileSync(outputPath, pdfData, 'binary');
    
    console.log(`Archivo PDF generado y guardado exitosamente en ${outputPath}.`);
    return `/public/docs/${filename}`

}

module.exports = GenerarPdfDeBase64