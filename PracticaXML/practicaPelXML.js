const tbody = document.querySelector("tbody");
const btnCarrega = document.querySelector("#btnCarrega");
const btnReset = document.querySelector("#btnReset");


btnCarrega.onclick = carregaXML;
btnReset.onclick = esborraDades;

 function esborraDades () {
  // Neteja de dades pintades
  document.querySelector("#ex1").textContent = "";
  document.querySelector("#ex2").innerHTML = "";
  document.querySelector("#ex3").innerHTML = "";
  document.querySelector("#ex4").innerHTML = "";
  document.querySelector("#ex5").innerHTML = "";
  document.querySelector("#ex6").innerHTML = "";
  document.querySelector("#ex6").innerHTML = ""; 
  document.querySelector("#ex7").innerHTML = "";
  document.querySelector("#ex9").innerHTML = "";
  document.querySelector("#ex10").innerHTML = "";
};

function carregaXML() {
  // Carrega de dades
  fetch("../PracticaXML/practicaPelicula.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      exercici1(xml);
      exercici2(xml);
      exercici3(xml);
      exercici4(xml);
      exercici5(xml);
      exercici6(xml);
      exercici7(xml);
      exercici9(xml);
      exercici10(xml);
    })
    .catch(console.error);
}
// Nom de la primera pelicula
function exercici1(xml) {
  let peli1 = xml.querySelector("pelicula");
  document.querySelector("#ex1").textContent = "-" + peli1.querySelector("titulo").textContent;
}
//  Pelicules del s.XXI
function exercici2(xml) {
  let resultado = "";
  let peliculas = xml.querySelectorAll("pelicula");
  peliculas.forEach(function (pelicula) {
    if (pelicula.querySelector("anio").textContent >= 2001) {
      resultado += "<li>" + pelicula.querySelector("titulo").textContent + "</li>";
    }
  });
  document.querySelector("#ex2").innerHTML = "<ol>" + resultado + "</ol>";
}
// Nom de totes les pel·lícules que han sortit en format "Blu-ray"
function exercici3(xml) {
  let resultado = "";
  let peliculasBluRay = xml.querySelectorAll("pelicula");
  peliculasBluRay.forEach(function (peliculaBlu) {
    if (peliculaBlu.querySelector("titulo").getAttribute("formato") == "Blu-ray") {
      resultado += "<li>" + peliculaBlu.querySelector("titulo").textContent + "</li>";
    }
  });
  document.querySelector("#ex3").innerHTML = "<ol>" + resultado + "</ol>";
}

//  Nom de les pel·lícules que han sortit en "DVD" i són del s.XXI
function exercici4(xml) {
  let resultado = "";
  let pelDvdSegle = xml.querySelectorAll("pelicula");
  pelDvdSegle.forEach(function (peliculaDS) {
    if (peliculaDS.querySelector("titulo").getAttribute("formato") == "DVD" ||
      peliculaDS.querySelector("anio").textContent >= 2001) {
      resultado += "<li>" + peliculaDS.querySelector("titulo").textContent + "</li>";
    }
  });
  document.querySelector("#ex4").innerHTML = "<ol>" + resultado + "</ol>";
}
// Nom dels actors de la pel·lícula amb id="6"
function exercici5(xml) {
  let resultado = "";
  let nomActors = xml.querySelectorAll("pelicula");
  nomActors.forEach(function (nomAct) {
    if (nomAct.querySelector("titulo").getAttribute("id") == "6") {
      resultado += "<li>" + nomAct.querySelector("actores").textContent + "</li>";  // No entiendo porque no me enumera los actores;
    }
  });
  document.querySelector("#ex5").innerHTML = "<ol>" + resultado + "</ol>";

}
// La sinopsis de forest gump
function exercici6(xml) {
  let resultado = "";
  let sinopsis = xml.querySelectorAll("pelicula");
  sinopsis.forEach(function (sinop) {
    if (sinop.querySelector("titulo").textContent == "Forrest Gump") {
      resultado = sinop.querySelector("sinopsis").textContent;
    }
  });

  document.querySelector("#ex6").innerHTML = "-" + resultado;
 
}
//  Noms de totes les pel·lícules amb gènere "Drama"
function exercici7(xml) {
  let resultado = "";
  let peliculaDrama = xml.querySelectorAll("pelicula");
  peliculaDrama.forEach(function (peliculDram) {
    if (peliculDram.querySelector("genero").textContent == "Drama") {
      resultado += "<li>" + peliculDram.querySelector("titulo").textContent + "</li>";     
    }
  });

  document.querySelector("#ex7").innerHTML = "<ol>" + resultado + "</ol>";
}
//  Nom del gènere més freqüent
function exercici9(xml) {
  let generos = xml.querySelectorAll("genero");
  let mapa = new Map();

  generos.forEach(element => {
    let genero = element.textContent;

    if (mapa.has(genero)) {
      let valor = mapa.get(genero);
      mapa.set(genero, valor + 1);
    } else {

      mapa.set(genero, 1);
    }
  });

  let genResultado = "";
  let valorMax = 0;
  mapa.forEach((value, key) => {
    if (value > valorMax) {
      valorMax = value;
      genResultado = key;
    }
  });
  document.querySelector("#ex9").textContent = "-" + `El genero más visto es ${genResultado} amb un total de ${valorMax}`;
}
//  Nom de les pel·lícules on surt en "Tom Hanks"
function exercici10(xml){
   let resultado = "";
   let peliculesTom = xml.querySelectorAll("pelicula");
   peliculesTom.forEach(function(pelTom){
    if(pelTom.querySelector("actor").textContent == "Tom Hanks"){
      resultado += "<li>" + pelTom.querySelector("titulo").textContent;
    }
   });
   document.querySelector("#ex10").innerHTML = "<ol>" + resultado + "</ol>";
}





