const form = document.querySelector('form');
const nom = document.querySelector("#nom");
const llin1 = document.querySelector("#llin1");
const llin2 = document.querySelector("#llin2");
const usuari = document.querySelector("#usuari");
const password = document.querySelector("#password");
const pais = document.querySelector("#pais");
const cp = document.querySelector("#cp");
const dni = document.querySelector("#dni");
const captcha = document.querySelector("#captcha");

const usuaris = ["daniel82", "manuel223", "darknight1", "mrNum.1234"];

form.onsubmit = function (event) {
    form.querySelectorAll("input").forEach(element => {
        element.dispatchEvent(new Event("input"));
    });

    validaCaptcha();

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        alert("Revisau les errades abans de continuar");
    }

    form.classList.add('was-validated');
};

/* Attach events oninput*/

nom.oninput = function () {
    setValidity(this, validaLlargaria(this.value, 2, 24) + nomLletres(this.value))
};
llin1.oninput = function  () {
    setValidity(this, validaLlargaria(this.value, 2, 24) + nomLletres(this.value))
};
llin2.oninput = function  () {
    setValidity(this, validaLlargaria(this.value, 2, 24) + nomLletres(this.value))
};
usuari.oninput = function (){
    setValidity(this, validaLlargaria(this.value, 6, 16))
};
password.oninput = function (){
    setValidity(this, validaLlargaria(this.value, 8 ,16) + requisitPassw(this.value))
};
pais.oninput = function (){
    if(pais.value !="4") cp.setAttribute("disabled", "disabled")
    if(pais.value !="4") dni.setAttribute("disabled", "disabled")

    if(pais.value =="4") cp.remove("disabled", "diabled")
    if(pais.value =="4") dni.remove("disabled", "diabled")
};
cp.oninput = function (){
    setValidity(this, validaLlargaria(this.value,5) + requisitCP(this.value))
};




/* Funció que marca els inputs com a vàlids/invàlids*/
function setValidity(element, msgError) {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");

    if (msgError.length == 0) {
        element.classList.add("is-valid");
    } else {
        element.classList.add("is-invalid");
    }

    element.setCustomValidity(msgError);
    document.querySelector(`#error-${element.id}`).textContent = msgError;
}


/* CAPTCHA */
var generaCaptcha = function () {

}();

function validaCaptcha() {

}

function validaLlargaria(input, min, max) {
    if (input.length < min || input.length > max) return `La mida ha d'estar entre ${min} i ${max}`
    return "";
}
function nomLletres(input) {
    var regExp = /^[A-Za-zÁ-Ź\s]*$/;

    return regExp.test(input)?"":"Nomes es permeten lletres";

}
function requisitPassw (input,usuaris){
    var regExp = /^[A-Z]*$/;
   
    return regExp.test(input)?"":" Ha de contenir obligatòriament Mayusc, minusc, núm i Símbols";
}
function requisitCP (input){
        var regExp = /^[0-9]*$/;
        return regExp.test(input)?"":" Nomes es permeten numeros";
}
