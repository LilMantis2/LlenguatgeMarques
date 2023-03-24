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
    });


}
function pintaDades(dades){
        var photos = dades.photos;
        var resultat = "";
        if(dades.photos.lenght){
            dades.photos


        }else{
            resultat = "No s'han trobat dades"
        }
}