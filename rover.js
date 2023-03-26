const rover = document.querySelector("#rover");
const data = document.querySelector("#data");
const btnCarrega = document.querySelector("#btnCarrega");
const camara1 = document.querySelector("#camara");
const api = `lHlJQbbcJnCjJs8pDsisqHqSu2vHNdMDcG59fYbz`;

var URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.value}/photos?earth_date=${data.value}&api_key=${api}`
const selectorCamaraCuriosity = ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"];
const selectorCamaraOportunitySpirit = ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"];

btnCarrega.onclick = carrega;
rover.oninput = camara;



function camara() {
    var recorArray = []
    if (rover.value.toLowerCase() == "Curiosity".toLowerCase()) {
        recorArray = selectorCamaraCuriosity;
    } else {
        recorArray = selectorCamaraOportunitySpirit;
    }



    var resultat = "<option value =''>Selecciona</option>";
    recorArray.forEach(function(element){
        resultat += `<option value="${element}">${element}</option>`;
    });

    camara1.innerHTML = resultat;
};
function carrega(dades) {
    var URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.value}/photos?earth_date=${data.value}&api_key=${api}`


    fetch(URL)
    .then(response => {
         if (response.ok) return response.json()
        else {
            alert("No s'ha pogut completar la carrega. Error" + response.status)
        }
    })
    .then(data => {
        pintaDades(data);
    })


};
function pintaDades(dades) {
        var fotosRov = dades.photos;
        let result = "";
        if(fotos.lenght){
            fotosRov.forEach((element) => {
                result += `<p>
                <label> Imagen amb l'id: ${element.id}, camara: ${element.camera.full_name}, fecha: ${element.earth_date},
                Rover name: ${element.rover.name} (${element.rover.status}) (Arribada a Mart: ${cambiarFecha(element.rover.lading_date)})
                <img src= '${element.img_src}'>
                </p>`;
            });
        }else {
            result = "No hem trobat resultat";
        }
        result.innerHTML = result; 
    }
        
