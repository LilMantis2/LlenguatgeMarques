//inicialització
function init() {
    document.getElementById("calculaFact").addEventListener("click", function () { executaFuncio(calculaFactorial, "resFact", "numFact") });
    document.getElementById("calculaSenar").addEventListener("click", function () { executaFuncio(esImparell, "resSenar", "numSenar") });
    document.getElementById("calculaPot").addEventListener("click", function () { executaFuncio(potencia, "resPot", "numPot1", "numPot2") });
    document.getElementById("calculaArrel").addEventListener("click", function () { executaFuncio(arrel, "resArrel", "numArrel") });
    document.getElementById("calculaRandom").addEventListener("click", function () { executaFuncio(random, "resRandom") });
    document.getElementById("fonsAleatori").addEventListener("click", fonsAleatori)
}

//funcions d'ajuda
function obteNum(id) { //aquesta funció retorna un núm o NaN
    if (id === undefined) return NaN;
    return parseInt(document.getElementById(id).value);
}

function executaFuncio(funcioCalcul, output, input1, input2) {
    var num1 = obteNum(input1);
    var num2 = obteNum(input2);

    var resultat = "";
    if (input1 !== undefined && isNaN(num1) || input2 !== undefined && isNaN(num2)) {
        resultat = "Error!";
    } else {
        resultat = funcioCalcul(num1, num2);
    }

    document.getElementById(output).value = resultat;
}
//fi funcions ajuda

//funcions que heu d'implementar
function calculaFactorial(numero) {

    if (numero < 0) return "Error";
    else if (numero == 0) return 1;
    else {
        let resultat = 1;
        for (let i = 1; i < numero; i++) {
            resultat *= i;
        }
        return resultat;

    }
    return 0;
}

function esImparell(numero) {

    return (numero % 2 != 0) ? "Sí" : "No";
}

function potencia(base, exp) {

    return base ** exp;
}
function arrel(num) {
    var resultat = Math.sqrt(num);

    if (parseInt(resultat) != resultat) resultat = resultat.toFixed(2);
    return resultat;
}

function random() {
    return Math.round(Math.random() * 255);
}

function fonsAleatori(){
    document.body.style.backgroundColor = "rgb(" + random() + "," + random() + "," + random() + ")";
}

var estudioEstadistico = function () {
    const limit = 10000;
    var suma;
    for (let i = 0; i < limit; i++) {
        
            let rand = random();
            suma += rand;

            if (rand == 100) {
            console.log("LETS GOOO" + i);
            return;
        }

    }
    console.log(":(")
}();
