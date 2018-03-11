var ws;

function nav_open() {
    var x = document.getElementById("mySidebar");
    x.style.width = "359px";
    x.style.fontSize = "40px";
    x.style.paddingTop = "10%";
    x.style.display = "block";
    x.style.color = "white";
    x.style.backgroundColor = "#0099ff";
    document.getElementById("main").style.marginLeft = "359px";
    document.getElementById("main").classList.toggle("blurmain");
}

function nav_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("main").classList.toggle("blurmain");
}

//var modal = document.getElementById();

// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
//    if (event.target = modal1,modal2) {
//        modal1.style.display = "none";
//        modal2.style.display = "none";
//
//          }
//    }
//}

function register() {
    var x = document.getElementById("uName");
    var y = document.getElementById("psw");
    var z = document.getElementById("pswrpt");
    var rError = document.getElementById("rError");
    var uVal = (x.value);
    var pVal = (y.value);
    var pMVal = (z.value);
    if (pVal == pMVal) {
        initSession(); // Call to init the session
        ws.send("register[`" + uVal + ";`" + sessionStorage.sessID + ";`" + pVal + "]"); //TODO Use Session Version
        ws.onmessage = function (e) {
            a = e.data;
        };
        if ((a.trim(1)) == "`UserBase") {
            modLog(uVal);
            // call Login Func
        } else {
            rError.style.display = "block";
            rError.style.color = "red";
        }
    }

}

function initSession() {
    // Save data to sessionStorage
    sessionStorage.setItem('key', Math.random().toString(36).substring(7));
    sessionStorage.sessID = sessionStorage.getItem('key')
}

// Default Login Behaviour
function modLog(nameVal) {
    sessionStorage.sessName = nameVal;
    var wStrap = document.getElementById("wStrap");
    var wMsg = document.getElementById("wMsg");
    var pError = document.getElementById("pError");
    var lgOut = document.getElementById("lgOut");
    var lgIn = document.getElementById("lgIn");
    var sgUp = document.getElementById("sgUp");
    document.getElementById("log").style.display = "none";
    document.getElementById("reg").style.display = "none";
    lgOut.style.display = "inline";
    lgOut.style.width = '90px';
    lgOut.style.display.fontWeight = "900";
    lgIn.style.display = "none";
    wStrap.style = "display: inline";
    wMsg.style = "display: inline";
    wMsg.style.color = "white";
    wStrap.style.color = "limegreen";
    wStrap.style.fontSize = "25px";
    wMsg.textContent = nameVal;
    sgUp.style.display = "none";
    pError.style.display = "none";
    loginExtra();
}


// Session Determination
function chkLogin() {
    if (sessionStorage.sessName != "undefined" && sessionStorage.sessName != undefined) {
        modLog(sessionStorage.sessName)
    } else {

        //ws.send("chkLogin[`"+sessionStorage.sessID+"]");
        //ws.onmessage=function(e){a=e.data;sessionStorage.sessName=(a.substring(1).trim(1));return sessionStorage.sessName};
        //if (sessionStorage.sessName!="") {
        //    modLog(sessionStorage.sessName)
        //}
        return false
    }
}

// Forced Login Behaviour
function login() {
    var x = document.getElementById("uname1");
    var y = document.getElementById("psw1");
    uVal = (x.value);
    pVal = (y.value);
    // modification to login func which ensures all ws interaction takes place within inner function
    ws.send("login[`" + uVal + ";`" + sessionStorage.sessID + ";`" + pVal + "]");
    ws.onmessage = function (e,uVal) {
        var a = e.data;
        var Name = uVal;
        b = (a.substr(-10).trim(0));
        var pError = document.getElementById("pError");
        if (b == "`UserBase") {
            sessionStorage.setItem('logName', uVal);
        } else if (b == "wordError") {
            pError.style.display = "block";
            pError.style.color = "red";
            return;
        }
    };
    sessionStorage.sessName = sessionStorage.getItem('logName');
    modLog(uVal);
}

function loginExtra(){

}
function logOutExtra(){

}




function logout() {
    var wStrap = document.getElementById("wStrap");
    var lgOut = document.getElementById("lgOut");
    var lgIn = document.getElementById("lgIn");
    var sgUp = document.getElementById("sgUp");
    lgOut.style.display = "none";
    lgOut.style.width = '90px';
    lgOut.style.display.fontWeight = "900";
    lgIn.style.display = "inline";
    wStrap.style = "display: none";
    sgUp.style.display = "inline";
    sessionStorage.clear("sessName");
    logOutExtra();
}

function connect() {
    var l = window.location;
    ws = new WebSocket("ws://localhost:5050/");
    initSession(); // Call to init the session
}