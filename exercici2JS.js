var botoHola = document.querySelector("#botoHola");

botoHola.onclick= function(){this.textContent = "BYE!";};


document.querySelector("#botoHola").onmouseover = toogleInvisible;
document.querySelector("#botoHola").onmouseout  = toogleInvisible;

document.querySelector("#botoCrea").addEventListener("click", function () {
    document.querySelector("#creacio").innerHTML = "<h1>Som un h1</h1>";
});

document.querySelector("#botoRemove").addEventListener("click", function () {
    document.querySelector("#creacio").innerHTML = "";
});

document.querySelector("#divEnllac button").addEventListener("click", function () {
    var a = document.querySelector("#divEnllac a");
    a.textContent = "Yahoo!";
    a.setAttribute("href", "https://www.yahoo.es");
});
function toogleInvisible() {
    document.querySelector("#primerP").classList.toggle("invisible");
}