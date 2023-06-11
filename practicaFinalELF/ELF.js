const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const context1 = canvas1.getContext('2d');
const context2 = canvas2.getContext('2d');
const resetea = document.getElementById("reset");
const textArea = document.getElementById("textArea");

const num_files = 11; // Delimitador en filas y columnas del ancho y largo del mapeado
const num_col = 11;

let barcos = {};

const ancho = canvas2.width / num_col;
const alto = canvas1.height / num_files;

let tablero1 = Array.from({ length: num_files - 1 }, () => new Array(num_col - 1).fill("")); // Delimito los tableros restando uno para quitar las primeras filas 
let tablero2 = Array.from({ length: num_files - 1 }, () => new Array(num_col - 1).fill(""));

function dibujaCuadricula(contexto) {
  contexto.lineWidth = 5;

  var imagenCasilla = new Image();
  imagenCasilla.src = "/img/barcoP.jpeg";

  // Bucle pinta filas y columnas iniciales
  imagenCasilla.onload = function () {
    for (let fila = 0; fila < num_files; fila++) {
      for (let col = 0; col < num_col; col++) {
          if (fila === 0) {
            contexto.fillText(col, col * ancho + ancho / 2, fila * alto + alto / 2);
            contexto.drawImage(imagenCasilla, col * ancho, fila * alto, ancho, alto);
          } else if (col === 0) {
            contexto.fillText(fila, col * ancho + ancho / 2, fila * alto + alto / 2);
            contexto.drawImage(imagenCasilla, col * ancho, fila * alto, ancho, alto);
          }
        contexto.strokeRect(col * ancho, fila * alto, ancho, alto);
      }
    }
    cargaBarcos(contexto);
  };
}

function pintaBarcos(contexto, barco) {
  let tablero = contexto === context1 ? tablero1 : tablero2;

  const color = barco.color;
  const largo = barco.largo;
  const orientacion = barco.posicion.orientacion;
  let fila = barco.posicion.fila;
  let columna = barco.posicion.columna;

  // Paso colores despues de mirar si el barco esta en horizontal o vertical
  for (let large = 0; large < largo; large++) {
    tablero[fila][columna] = barco.idBarco;
    contexto.fillStyle = color;
    contexto.fillRect(columna * ancho, fila * alto, ancho, alto);

    if (orientacion === 'H') {
      columna++;
      tablero[fila - 1][columna - 1] = "R"; // Marco los barcos con una letra
    } else if (orientacion === 'V') {
      fila++;
      tablero[fila - 1][columna - 1] = "R"; // Marco los barcos con una letra

    }
  }

  tablero[fila-1][columna-1] = "R"

}

function reset() {
  // Selecciono todas las estructuras físicas que se pueden borrar (dibujo)
  barcos = {};
  tablero1 = Array.from({ length: num_files - 1 }, () => new Array(num_col - 1).fill(""));
  tablero2 = Array.from({ length: num_files - 1 }, () => new Array(num_col - 1).fill(""));

  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context2.clearRect(0, 0, canvas2.width, canvas2.height);

  // Vuelvo a dibujar la cuadrícula
  dibujaCuadricula(context1);
  dibujaCuadricula(context2);
  textArea.textContent = "";
}

// Hago cliclable la función resetea
resetea.onclick = reset;


function disparoInteracion(fila, columna, tablero) {
  if (fila > 0 && columna > 0) {
    const barcoDisparo = tablero[fila - 1][columna - 1];
    const casilla = context2;
    if (barcoDisparo === "") {
      textArea.textContent += "Agua!!!!\n";
      casilla.fillStyle = "blue"; // Cambiar color de fondo a azul para marcar agua
    } else if (barcoDisparo === "T") {
      textArea.textContent += "Esta casilla ha sido seleccionada anteriormente\n";
    } else {
      textArea.textContent += "TOCADOO!!\n";
      casilla.fillStyle = "red"; // Cambiar color de fondo a rojo para marcar tocado
    }
    casilla.fillRect(columna * ancho, fila * alto, ancho, alto);
  }

  tablero[fila - 1][columna - 1] = "T"; // Tocado
}


function calculaProxDisparo() {

    let fila, columna;
  
    // Buscar una casilla válida para disparar
    do {
      fila = Math.floor(Math.random() * (num_files - 1)) + 1;
      columna = Math.floor(Math.random() * (num_col - 1)) + 1;
    } while (tablero1[fila - 1][columna - 1] !== ""); // Evitar disparar en una casilla ya seleccionada
  
    disparoInteracion(fila, columna, tablero1); // Realizar el disparo de la IA
  
    return [fila, columna];
  }
  


// Me sirve para hacer clic en el canvas para luego hacer los disparos
canvas2.addEventListener('click', function (event) {
  const x = event.clientX - canvas2.offsetLeft;
  const y = event.clientY - canvas2.offsetTop;
  const columna = Math.floor(x / ancho);
  const fila = Math.floor(y / alto);

  if (fila > 0 && columna > 0 && !finalPartida()) {
    disparoInteracion(fila, columna, tablero1);

    ultimoDisparo = calculaProxDisparo(); // Variable para si da tiempo de hacer la lógica
    disparoInteracion(ultimoDisparo[0], ultimoDisparo[1], tablero1);
  }
});

function finalPartida() {
  let hundido = false;

  for (let idBarco in barcos) {
    const barco = barcos[idBarco];    // Meto todas las IDs en un array y luego en una variable
    const vida = barco.largo;        // El largo es ahors la vida 
   

    for (let fila = 0; fila < num_files - 1; fila++) {
      for (let col = 0; col < num_col - 1; col++) {
        if (barco.idBarco === tablero1[fila][col] && tablero2[fila][col] === "T") {
          vida--;
        }
      }
    }

    if (vida === 0) {
      textArea.textContent += "¡Barco " + barco.idBarco + " hundido!\n";
      hundido = true;
    }
  }

  return hundido;
}


function cargaBarcos(contexto) {
  let url = contexto === context1 ? "../practicaFinalELF/ELF.json" : "../practicaFinalELF/ELF.json";

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert("No se pudo completar la carga. Error " + response.status);
      }
    })
    .then(data => {
      data.barcos.forEach(barco => {
        pintaBarcos(contexto, barco);
      });
    })
    .catch(error => { // Me ayuda a descubrir los errores
      alert(error.message);
    });
}

dibujaCuadricula(context1);
dibujaCuadricula(context2);
