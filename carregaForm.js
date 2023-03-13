const nom = document.querySelector("tbody");
const llin1 = document.querySelector("#llin1");
const btnCarrega = document.querySelector("#btnCarrega");

btnCarrega.onclick = carrega;

function carrega() {
  
    fetch("./dades.json")
 
        .then(response => {
            
           if(response.ok) return response.json()
           else{
                alert("No s'ha pogut completar la carrega. Error" + response.status)
           }
})
        .then(data => {
           carregaDades(data);
        });

}
function carregaDades(dades){
    var persones = dades.persones;

    var resultat = ""
    persones.forEach(function(element){
        resultat += `<tr><td>${element.nom}</td><td>${element.llin1}</td></tr>`;

    });

    tbody.innerHTML = resultat;
}