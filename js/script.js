let acertadas = 0;
let noAcertadas = 0;

const LISTA_SUBCARACTERISTICA = [
  "Completitud funcional",
  "Corrección funcional",
  "Pertinencia funcional",
  "Comportamiento temporal",
  "Utilización de recursos",
  "Capacidad",
  "Coexistencia",
  "Interoperabilidad",
  "Inteligibilidad",
  "Aprendizaje",
  "Operabilidad",
  "Protección frente a errores de usuario",
  "Estética",
  "Accesibilidad",
  "Madurez",
  "Disponibilidad",
  "Tolerancia a fallos",
  "Capacidad de recuperación",
  "Confidencialidad",
  "Integridad",
  "No repudio",
  "Autenticidad",
  "Responsabilidad",
  "Modularidad",
  "Reusabilidad",
  "Analizabilidad",
  "Capacidad de ser modificado",
  "Capacidad de ser probado",
  "Adaptabilidad",
  "Facilidad de instalación",
  "Capacidad de ser reemplazado",
];

const ARRAYS_KEYS = [
  "LISTA_CAJA1",
  "LISTA_CAJA2",
  "LISTA_CAJA3",
  "LISTA_CAJA4",
  "LISTA_CAJA5",
  "LISTA_CAJA6",
  "LISTA_CAJA7",
  "LISTA_CAJA8",
];

const CARACTERISTICA = {
  LISTA_CAJA1: document.getElementById("lista1"),
  LISTA_CAJA2: document.getElementById("lista2"),
  LISTA_CAJA3: document.getElementById("lista3"),
  LISTA_CAJA4: document.getElementById("lista4"),
  LISTA_CAJA5: document.getElementById("lista5"),
  LISTA_CAJA6: document.getElementById("lista6"),
  LISTA_CAJA7: document.getElementById("lista7"),
  LISTA_CAJA8: document.getElementById("lista8"),
};

getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
// - función que permite el llenado de las sub-características a las cajas(caracteristicas) de la ISO/IEC 25010  de forma aleatorio.
llenarAleatorio = () => {
  let length = ARRAYS_KEYS.length;
  let key = -1;
  $(".lista-caracteristica").empty(); // limpiamos todas las sub-características de las cajas(caracteristicas).
  LISTA_SUBCARACTERISTICA.forEach((element) => {
    key = ARRAYS_KEYS[getRandomInt(length)];
    while ($(CARACTERISTICA[key]).find(".sub-caracteristica").length > 4) {
      // condición de llenado, máximo 5 sub-características por caja(caracteristica).
      key = ARRAYS_KEYS[getRandomInt(length)];
    }
    let sub_caracteristica = `
  <div class="sub-caracteristica">
    <span>${element}</span>
    <i class="fa" id="icon_verificar"></i>
  </div>`;
    CARACTERISTICA[key].insertAdjacentHTML("beforeend", sub_caracteristica);
  });
};
// - fin

llenarAleatorio();

// -- function que permite realizar las comparaciones de las sub-caracteristicas con sus caracteristicas correspondientes.
resultadoJuego = () => {
  // se realiza una peticion del archivo caracteristica.json donde se encuentra las caracteristicas con sus sub-caracteristicas correctas.
  fetch("json/caracteristica.json")
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => sacarData(jsonData));
};
// -- fin

sacarData = (jsonData) => {
  let numero = 1;
  
  for (data in jsonData) {
    for (let lista of jsonData[data]) {
      verificarData(lista, numero);
      numero++;
    }
  }
  
  let color = "";
  let mensaje = "";
  let nota = Math.round((acertadas * 20) / LISTA_SUBCARACTERISTICA.length, 2); // se calcula la nota correspondiente
  //condicion para obtener el mensaje y el color con respecto a la nota obtenida
  nota <= 10
  ? ((mensaje = "Necesitas conocer más sobre este tema. Tú puedes!"), (color = "#F00"))
  : nota > 10 && nota < 16
  ? ((mensaje = "¡Felicidades! no bajes la guardia."), (color = "#E49E43"))
  : ((mensaje = "¡Excelente! Te espera un futuro prometedor."), (color = "#05A649"));
  mostrarResultado(acertadas, noAcertadas, nota, mensaje, color);
  implementarDragDrop("disable");
};

// --- funcion que permite verificar si la sub-carateristica pertenece a la caracteristica en especifico, 
//     si es correcto se le da su check, caso contrario una X correspondiente.
verificarData = (lista, numero) => {
  $(".contenedor-lista-caracteristica").each(function () {
    if ($(this).find("h5").text() == lista.name) {
      $(this)
        .find("#lista" + numero)
        .each(function () {
          $(this)
            .find(".sub-caracteristica")
            .each(function (e) {
              let caracteristica = $(this).find("span").text();
              let isEncontrado = lista.items.includes(caracteristica);
              isEncontrado
                ? ($(this).find("#icon_verificar").addClass("fa-check"),
                  acertadas++)
                : ($(this).find("#icon_verificar").addClass("fa-close"),
                  noAcertadas++);
            });
        });
    }
  });
}
// --- fin

reniciarJuego = () => {
  window.location.reload();
};

// -v funcion que permite mostrar el resultado del juego.
mostrarResultado = (acertadas, noAcertadas, nota, mensaje, color) => {
  $("#reniciar").show("slow");
  $("#acertadas").text(acertadas);
  $("#no-acertadas").text(noAcertadas);
  $("#nota").text(nota);
  $("#mensaje").text(mensaje);
  $("#mensaje").css({ color: color });
}
// -v fin

// v funcion que permite habilitar y deshabilitar la funcionalidad de drag-drop a cada una de las cajas(caracteristicas).
implementarDragDrop = (option = false) => {
  if (option === "enable") {
    for (let listaX in CARACTERISTICA) {
      new Sortable(CARACTERISTICA[listaX], {
        group: "shared",
        animation: 150,
      });
    }
  } else if (option === "disable") {
    for (let listaX in CARACTERISTICA) {
      $(CARACTERISTICA[listaX]).css({ "pointer-events": "none" });
    }
  }
}
// v fin

implementarDragDrop("enable");

const BOTON_INICIAR = document.getElementById("iniciar");
const BOTON_RENICIAR = document.getElementById("reniciar");
const CONTENEDOR = document.querySelector("body");
CONTENEDOR.classList.add("theme-light");

// v- evento para cambiar de tema claro-oscuro(light-dark)
document.addEventListener("click", function (e) {
  let isCkecked = document.getElementById("toggle").checked;
  if (isCkecked) {
    CONTENEDOR.classList.remove("theme-light");
    CONTENEDOR.classList.add("theme-dark");
  } else {
    CONTENEDOR.classList.remove("theme-dark");
    CONTENEDOR.classList.add("theme-light");
  }
});
// v- fin

BOTON_RENICIAR.addEventListener("click", function () {
  reniciarJuego();
});

BOTON_INICIAR.addEventListener("click", function () {
  const TIEMPO = limiteTiempo();
  llenarAleatorio();
  cargarTiempo();
  $("#iniciar").hide("slow");
  setTimeout(function () {
    resultadoJuego();
    $("#modal-resultado").modal("show");
  }, TIEMPO);
});
