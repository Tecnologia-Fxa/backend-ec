const { default: axios } = require("axios");
const ClienteModel = require("../database/models/ClienteModel");

require('dotenv').config(); // Cargar las variables de entorno

//Funcion para crear el cliente tanto en contifico como en la base de datos local
const CrearClienteJob = async(data)=>{
    console.log("<<<<<<<<<<<<<Seccion Cliente>>>>>>>>>>>>>")
    
    try {
        let documento_ruc = data.meta_data.find(el => el.key === '_billing_document')
        let es_cedula = data.meta_data.find(el => el.key === '_billing_cedula_or_ruc')
        let es_extranjero = data.meta_data.find(el => el.key === '_shipping_es_extranjero')
    
        const headers = {
            'Content-Type': 'application/json', // Tipo de contenido
            'Authorization': process.env.AUTHORIZATION_CONTIFICO_KEY // Token de autorización
        };
        
        const personaConfitico = await axios.get(`${process.env.URLCONTIFICO}/persona/?identificacion=${documento_ruc.value}`, {headers})
        
        if(personaConfitico.data && personaConfitico.data[0]){
            console.log("<<<<<<<<<<<<<<<<<<<<<Actualizar Cliente>>>>>>>>>>>>>>>>>>>>>")
            let personaContificoData = personaConfitico.data[0]
            let estructuraActualizarCliente = {
                "id": personaContificoData.id,
                "tipo": (es_cedula.value==='cedula')?"N":"J",
                "personaasociada_id": null,
                "nombre_comercial": null,
                "telefonos": data.billing.phone,
                "ruc": (es_cedula.value==='cedula')?'':documento_ruc.value,
                "razon_social": `${data.billing.first_name} ${data.billing.last_name}`,
                "direccion": `${data.billing.address_1} - ${data.billing.address_2}`,
                "es_extranjero": (es_extranjero.value === "extranjero")?true:false,
                "porcentaje_descuento": null,
                "es_cliente": true,
                "es_empleado": false,
                "email": data.billing.email,
                "cedula": (es_cedula.value==='cedula')?documento_ruc.value:'',
                "placa": "",
                "es_vendedor": false,
                "es_proveedor": false,
                "adicional1_cliente": null,
                "adicional2_cliente": null,
                "adicional3_cliente": null,
                "adicional4_cliente": null,
                "adicional1_proveedor": null,
                "adicional2_proveedor": null,
                "adicional3_proveedor": null,
                "adicional4_proveedor": null
            }
            const actualizarCliente = await axios.put(`${process.env.URLCONTIFICO}/persona/?pos=${process.env.AUTHORIZATION_CONTIFICO_TOKEN}`, estructuraActualizarCliente, {headers})

            await ClienteModel.upsert({
                cedula_ruc:documento_ruc.value,
                es_extranjero:(es_extranjero.value === "extranjero")?true:false,
                es_cedula:(es_cedula.value==='cedula')?true:false,
                nombre_cliente: data.billing.first_name,
                apellido_cliente: data.billing.last_name,
                correo_cliente: data.billing.email,
                telefono_cliente: data.billing.phone,
                resp_contifico:JSON.stringify(actualizarCliente.data)
            })
            console.log("Se a actualizado el cliente")

        }else{
            console.log("<<<<<<<<<<<<<<<<<<<<<Crear Cliente>>>>>>>>>>>>>>>>>>>>>")
            let estructuraCrearCliente = {
                "tipo": (es_cedula.value==='cedula')?"N":"J",
                "personaasociada_id": null,
                "nombre_comercial": null,
                "telefonos": data.billing.phone,
                "ruc": (es_cedula.value==='cedula')?'':documento_ruc.value,
                "razon_social": `${data.billing.first_name} ${data.billing.last_name}`,
                "direccion":  `${data.billing.address_1} - ${data.billing.address_2}`,
                "es_extranjero": (es_extranjero.value === "extranjero")?true:false,
                "porcentaje_descuento": null,
                "es_cliente": true,
                "id": null,
                "es_empleado": false,
                "email": data.billing.email,
                "cedula": (es_cedula.value==='cedula')?documento_ruc.value:'',
                "placa": "",
                "es_vendedor": false,
                "es_proveedor": false,
                "adicional1_cliente": null,
                "adicional2_cliente": null,
                "adicional3_cliente": null,
                "adicional4_cliente": null,
                "adicional1_proveedor": null,
                "adicional2_proveedor": null,
                "adicional3_proveedor": null,
                "adicional4_proveedor": null
            }
            const crearCliente = await axios.post(`${process.env.URLCONTIFICO}/persona/?pos=${process.env.AUTHORIZATION_CONTIFICO_TOKEN}`, estructuraCrearCliente, {headers})
            const crearClienteJSON = JSON.stringify(crearCliente.data);
            await ClienteModel.upsert({
                cedula_ruc:documento_ruc.value,
                es_extranjero:(es_extranjero.value === "extranjero")?true:false,
                es_cedula:(es_cedula.value==='cedula')?true:false,
                nombre_cliente: data.billing.first_name,
                apellido_cliente: data.billing.last_name,
                correo_cliente: data.billing.email,
                telefono_cliente: data.billing.phone,
                resp_contifico: ""
            })

            console.log("Se a creado el cliente")
        }



    } catch (error) {
        if(error.response && error.response.status){
            console.log(error.response.status)
            console.log(error.response.data)

        }else{
            console.log(error)

        }
    }

    

}

module.exports = CrearClienteJob