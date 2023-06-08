const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const context1 = canvas1.getContext('2d');
const context2 = canvas2.getContext('2d');
const resetea = document.getElementById("reset");


const num_files = 11;
const num_col = 11;

let barcos = {};

const ancho = canvas2.width / num_col;
const alto = canvas1.height / num_files;

let tablero1 = Array.from({ length: num_files - 1 }, () => new Array(num_col - 1).fill(""));
let tablero2 = Array.from({ length: num_files - 1 }, () => new Array(num_col - 1).fill(""));


function dibujaCuadricula(contexto) {
    contexto.lineWidth = 5;
    
    var imagenCasilla = new Image();
    imagenCasilla.src = "/img/barcoP.jpeg";

       // Bucle pinta filas y columnas iniciales
    imagenCasilla.onload = function () {
        for (let fila = 0; fila < num_files; fila++) {
            for (let col = 0; col < num_col; col++) {
                if (fila === 0 || col === 0) {
                    contexto.fillStyle = "lightgray";
                    contexto.fillRect(col * ancho, fila * alto, ancho, alto);
                    contexto.fillStyle = "black";
                    if (fila === 0) {
                        contexto.fillText(col, col * ancho + ancho / 2, fila * alto + alto / 2);
                        contexto.drawImage(imagenCasilla, col * ancho, fila * alto, ancho, alto);
                    } else if (col === 0) {
                        contexto.fillText(fila, col * ancho + ancho / 2, fila * alto + alto / 2);
                        contexto.drawImage(imagenCasilla, col * ancho, fila * alto, ancho, alto);
                    } 
                }
                contexto.strokeRect(col * ancho, fila * alto, ancho, alto);
            }
        }
        cargaBarcos(contexto);
    };
}


function pintaBarcos(contexto, barco) {

    let tablero = contexto==context1?tablero1:tablero2;

        const color = barco.color
        const largo = barco.largo;
        const orientacion = barco.posicion.orientacion;

        let fila = barco.posicion.fila;
        let columna = barco.posicion.columna;

            // Paso colores despues de mirar si el barco esta en horizontal o vertical
        for (let large = 0; large < largo; large++) {
            tablero[fila][columna] = barco.idBarco;
            contexto.fillStyle = color;
            contexto.fillRect(columna * ancho, fila * alto, ancho, alto);
            

            if (orientacion == 'H') {
                columna++     
            } else if (orientacion == 'V') {
                fila++
            }
            
        }
    
};


function reset() {
    // Selecciono todas las estructuras fisicas que se pueden borrar(dibujo)
    barcos = {};
    tablero1 = Array.from({ length: num_files - 1 }, () => new Array(num_col - 1));
    tablero2 = Array.from({ length: num_files - 1 }, () => new Array(num_col - 1));


    context1.clearRect(0, 0, canvas1.width, canvas1.height);
    context2.clearRect(0, 0, canvas2.width, canvas2.height);

    // Vuelvo a dibujar la cuadrícula
    dibujaCuadricula(context1);
    dibujaCuadricula(context2);
}

// Hago clicable la funcion resetea
resetea.onclick = reset;

function disparo (fila, columna){
    if(fila > 0 && columna > 0){
        const barcoDisparo = tablero[fila][columna];
        if(barcoDisparo == barcos){
           
        }
    
    }

    tablero[fila -1][columna] = "T"; // Tocado 
   
}

        // Me sirve para hacer click en el canvas para luego hacer los disparos
canvas2.addEventListener('click', function (event) {
    const x = event.clientX - canvas2.offsetLeft;
    const y = event.clientY - canvas2.offsetTop;
    const column = Math.floor(x / ancho);
    const fila = Math.floor(y - alto);

    if (fila > 0 && column > 0 && !finalPartida()) {
        disparo(context2, fila, column);

        ultimoDisparo = calculaProxDisparo(); // Variable para si da tiempo de hcaer la logica
        disparo(context1, ultimoDisparo[0], ultimoDisparo[1])
    }

});

function finalPartida() {

};



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
            })
        })
        .catch(error => {   // Me ayuda a descubrir los errores
            alert(error.message);
        });
}




dibujaCuadricula(context1);
dibujaCuadricula(context2);
