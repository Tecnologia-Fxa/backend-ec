const ManejoCodDoc = (documento) =>{
    // Separar las partes del número
    const partes = documento.split("-");

    // Obtener las partes actuales
    let parte1 = partes[0];
    let parte2 = partes[1];
    let parte3 = partes[2];

    // Función para incrementar una parte del número y reiniciar si alcanza el límite
    function incrementarParte(parte, limite) {
    let numeroActual = parseInt(parte);
    numeroActual++;

    if (numeroActual > limite) {
        numeroActual = 1;
    }

    return numeroActual.toString().padStart(parte.length, "0");
    }

    // Incrementar la parte 3 y reiniciar si alcanza el límite
    parte3 = incrementarParte(parte3, 999999999);

    // Incrementar la parte 2 y reiniciar si alcanza el límite
    if (parte3 === "000000001") {
    parte2 = incrementarParte(parte2, 999);
    }

    // Incrementar la parte 1 si parte2 alcanza el límite
    if (parte2 === "001" && parte3 === "000000001") {
    let numeroParte1 = parseInt(parte1);
    numeroParte1++;

    parte1 = numeroParte1.toString().padStart(parte1.length, "0");
    }

    // Construir el documento resultante
    documento = `${parte1}-${parte2}-${parte3}`;


    return documento
}

module.exports = ManejoCodDoc