let cont = 60; // limite de tiempo 60seg

function cargarTiempo(){
    $("#tiempo").css({ display: "block" });
    document.getElementById("tiempo").innerText = cont;
    if(cont > 0) cont--;
    setTimeout(cargarTiempo, 1000);
} 

function limiteTiempo(){
    return cont*1000;
}