// Side navigation

    function nav_open(){
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


var ws, out = document.getElementById("out");

function connect() {
    if ("WebSocket" in window) {
        var l = window.location;
        ws = new WebSocket("ws://" + (l.hostname ? l.hostname : "localhost") + ":" + (l.port ? l.port : "5050") + "/");
        out.value = "connecting...";
        ws.onopen = function (e) {
            out.value = "connected";
        }
        ws.onclose = function (e) {
            out.value = "disconnected";
        }
        ws.onmessage = function (e) {
            out.value = e.data;
        }
        ws.onerror = function (e) {
            out.value = e.data;
        }
    } else alert("WebSockets not supported on your browser.");
}

function send() {
    x = document.getElementById("x");
    v = x.value;
    ws.send(v);
    out.value = "sent " + v;


    return false;
}

