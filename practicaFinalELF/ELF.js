const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const context1 = canvas1.getContext('2d');
const context2 = canvas2.getContext('2d');
const reset = document.getElementById("reset");

const num_files = 11;
const num_col = 11;

const ancho = canvas2.width / num_col;
const alto = canvas1.height / num_files;

//let tablero1 = Array.from({length : num_files - 1}, () => new Array( num_col - 1), fill);
//let tablero2 = Array.from({length : num_files - 1}, () => new Array( num_col - 1), fill);


function dibujaCuadricula(contexto) {
    contexto.lineWidth = 5;

    var imagenCasilla = new Image();
    imagenCasilla.src = "/img/barcoP.jpeg";

    imagenCasilla.onload = function() {
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


function pintaBarcos() {

}


function cargaBarcos(contexto) {
    let url = contexto === context1 ? "../practicaFinalELF/ELF1.json" : "../practicaFinalELF/ELF2.json";

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("No se pudo completar la carga. Error " + response.status);
            }
        })
        .then(data => {
            data.barcos.foreach(barco => {
                pintaBarcos(contexto, barco);
            })
        })
        .catch(error => {
            alert(error.message);
        });
}




dibujaCuadricula(context1);
dibujaCuadricula(context2);
