const canvas1  = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const context1 = canvas1.getContext('2d');
const context2 = canvas2.getContext('2d');

const num_files = 11;
const num_col = 11;

const ancho = canvas2.width / num_col;
const alto = canvas1.height / num_files;




function dibujaCuadricula(contexto){
        for( let fila = 0; fila < num_files; fila++){
            for(let col = 0; col < num_col; col++){
                contexto.strokeRect(col * ancho, fila * alto, ancho, alto);    
            };
        };
};





function cargaBarcos(contexto){

    let url = contexto== context1?"../practicaFinalELF/ELF.json":"../practicaFinalELF/ELF.json";

    fetch(url)

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



dibujaCuadricula(context1);
dibujaCuadricula(context2);