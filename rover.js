const rover = document.querySelector("#rover");
const data = document.querySelector("#data");
const btnCarrega = document.querySelector("#btnCarrega");
const camara1 = document.querySelector("#camara");
const api = `EtexT4gFMPzCq7o0bdyFQTdiWZK7x1fV6lRgmEfr`;

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
        carrega(data);
    })


};
function pintaDades(dades) {
        var fotosRov = dades.photos;
        let resultat = "";
        if(fotos.lenght){
            fotosRov.forEach((element) => {
                resultat += `<p>
                <label> Imagen amb l'id: ${element.id}, camara: ${element.camera.full_name}, fecha: ${element.earth_date},
                Rover name: ${element.rover.name} (${element.rover.status}) (Arribada a Mart: ${cambiaFecha(element.rover.lading_date)})
                <img src= '${element.img_src}'>
                </p>`;
            });
        }else {
            resultat = "No hem trobat resultat";
        }
        resultat.innerHTML = resultat; 
    }
        
