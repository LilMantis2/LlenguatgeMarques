const tbody = document.querySelector("tbody");
const btnCarrega = document.querySelector("#btnCarrega");

btnCarrega.onclick = carregaXML;

function carregaXML() {
    fetch("../PracticaXML/practicaPelicula.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      exercici1(xml);
      exercici2(xml);
    })
    .catch(console.error);
}

function exercici1(xml){
    let peli1 = xml.querySelector("pelicula");
    document.querySelector("#ex1").textContent = peli1.querySelector("titulo").textContent;
}

function exercici2(xml){
    let resultado = "";
    let peliculas = xml.querySelectorAll("pelicula");
   peliculas.forEach(function(pelicula) {
        if (pelicula >= 2001) {
          resultado += peliculas;
        }
      });
      document.querySelector("#ex2").textContent 
       = resultado.querySelector("titulo").textContent;


}

