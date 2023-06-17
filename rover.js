const data = document.querySelector("#data");
const rover = document.querySelector("#rover");
const pagina = document.querySelector("#paginacio");
const camera = document.querySelector("#camera");
const camarasCuriosity = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"];
const camarasOpportunitySpirit = ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"];
const api = `lHlJQbbcJnCjJs8pDsisqHqSu2vHNdMDcG59fYbz`;
const resultat = document.querySelector("#resultat");

const btnCarrega = document.querySelector("#btnCarrega");

btnCarrega.onclick = carrega;
rover.oninput = carregaCameres;



function carregaCameres() {
    var array = [];
    if (rover.value.toLowerCase() == "Curiosity".toLowerCase()) {
        array = camarasCuriosity;
    } else {
        array = camarasOpportunitySpirit;
    };
    var resultat = "<option value =''>Selecciona cámara</option>";

    array.forEach(function (element) {
        resultat += `<option value="${element}">${element}</option>`;
    });

    camera.innerHTML = resultat;
};


function carrega() {

    var URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.value.toLowerCase()}/photos?camera=${camera.value.toLowerCase()}&page=${pagina.value}&earth_date=${data.value}&api_key=${api}`;

    if (data.value == "") {
        alert("Tienes que poner una fecha!!")
    };
    fetch(URL)
        .then(response => {
            if (response.ok) return response.json();
            else {
                alert("No se ha podido completar la carga. " + response.status)
            }
        })

        .then(data => {
            carregaDades(data);
        })
};


function carregaDades(dades) {
    var photos = dades.photos;
    let res = "";
    if (photos.length) {
        photos.forEach((element) => {
            res += `
            <div class="col">
          <div class="card shadow-sm">
          <img src='${element.img_src}' alt="" class="img-thumbnail">
            <div class="card-body">
              <p class="card-text">Imagen con id: ${element.id}, camara: ${element.camera.full_name}, Rover name: ${element.rover.name}
                (${element.rover.status}), llegada a Marte: ${cambiaFecha(element.rover.landing_date)}.
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Fecha: ${cambiaFecha(element.earth_date)} </small>
              </div>
            </div>
          </div>
        </div>`;
        });
    } else {
        res = "No se han encontrado resultados";
    }

    resultat.innerHTML = res;
};

function cambiaFecha(fecha) {
    let arrayFecha = fecha.split("-");
    return `${arrayFecha[2]}/${arrayFecha[1]}/${arrayFecha[0]}`;
};

