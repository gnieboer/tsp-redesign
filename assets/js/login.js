

/* SCRIPTS TO REMOVE AND ADD CLASSES */
/* href$ = The $ operator means 'ends with' */

$("a:contains('Login')").attr('id', 'login-reveal').addClass("login-toggle");

var fader = document.getElementById("login-panel");
var loggle = document.getElementsByClassName("login-toggle");

var t;
    for (t = 0; t < loggle.length; t++) {
        loggle[t].addEventListener("click", function() {

           fader.classList.toggle("fadeIn");

});}

// #login for the grab, .login for CSS, .login-reveal for combination with close button.

// THIS WILL WORK WITH usa-overlay, BUT NOT WITH #login-panel

// window.onclick = function(event) {
//     if (event.target = fader) {
//         // modal.style.display = "none";
//         fader.classList.toggle("fadeIn");
//     }
// }




// var logg = document.getElementById("login-reveal");
// var fader = document.getElementById("login-panel");
//
// logg.addEventListener("click", function() {
//
//   fader.classList.toggle("fadeIn");
//
// });




// <dialog> is not well-enough supported yet.

// $(function () {
//   var dialog = document.querySelector('dialog');
//   document.querySelector('.login-reveal').onclick = function() {
//     dialog.showModal();
//   };
//   document.querySelector('#close').onclick = function() {
//     dialog.close();
//   };
// });
