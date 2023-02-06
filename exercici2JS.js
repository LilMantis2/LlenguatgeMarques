document.querySelector("#botoHola").addEventListener("click", function () {
    this.textContent = "BYE!";
});

document.querySelector("#botoHola").addEventListener("mouseover", function () {
    document.querySelector("#primerP").classList.remove("invisible")
});

document.querySelector("#botoHola").addEventListener("mouseout", function () {
    document.querySelector("primerP").classList.add("invisible")
});
document.querySelector("#botoCrea").addEventListener("click", function () {
    document.querySelector("#creacio").innerHTML = "<h1>Som un h1<h1>"
});
document.querySelector("#botoCrea").addEventListener("click", function () {
    document.querySelector("#creacio").innerHTML = ""
});