// Side navigation
function nav_open() {
    var x = document.getElementById("mySidebar");
    x.style.width = "25%";
    x.style.fontSize = "40px";
    x.style.paddingTop = "10%";
    x.style.display = "block";
    x.style.color = "white";
    x.style.backgroundColor = "#0099ff";
    document.getElementById("main").classList.toggle("blurmain");
}
function nav_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("main").classList.toggle("blurmain");
}
function myAccFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-green";
    } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-green", "");
    }
}