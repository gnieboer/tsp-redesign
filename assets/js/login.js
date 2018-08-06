

/* SCRIPTS TO REMOVE AND ADD CLASSES */
/* href$ = The $ operator means 'ends with' */

var fader = document.getElementById("login-panel");
var loggle = document.getElementsByClassName("login-toggle");

var t;
    for (t = 0; t < loggle.length; t++) {
        loggle[t].addEventListener("click", function() {

           fader.classList.toggle("fadeIn");

});}
