const rover = document.querySelector("#rover");
const data = document.querySelector("#data");
const btnCarrega = document.querySelector("#btnCarrega");
const camara = document.querySelector("#camara");

var URL = `https://api.nasa.gov/mars-photos/api/v1/${rover}/curiosity/photos?sol=1000&api_key=DEMO_KEY`
const selectorCamaraCuriosity = [FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM]
const selectorCamaraOportunitySpirit = [FHAZ, RHAZ, NAVCAM, PANCAM, MINITES]

btnCarrega.onclick = carrega;

function camara() {
    var recorArray = []
    if (rover.ariaValueMax.toLocaleLowerCase == "Curiosity") {

    }


}
function carrega() {

}