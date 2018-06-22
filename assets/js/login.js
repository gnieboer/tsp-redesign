

/* SCRIPTS TO REMOVE AND ADD CLASSES */
/* href$ = The $ operator means 'ends with' */
// REMOVE .pdfLink, ADD .nyroModal .pdfFile
// $("a:contains('Login')").addClass("login-reveal");

$("a:contains('Login')").attr('id', 'login-panel');

/* CLICK FUNCTIONS FOR TSP-9 AND TSP-15 Yes-No BUTTONS */
// $(function () {
//     $(".login-reveal").click(function () {
//         $("#login").removeClass("hide")
//     });
// });

// $(function () {
//     $(".login-reveal").click(function() {
//         $("#login").toggleClass("hide");
//     });
// });

// $(function () {
//     $(".login-reveal").click(function() {
//         // $("div.usa-overlay").toggleClass("is-visible");
//         $("#login").toggleClass("hide");
//     });
// });

var logg = document.getElementById("login-panel");
var fader = document.getElementById("login");

logg.addEventListener("click", function() {

  fader.classList.toggle("fadeIn");

});

// $(function () {
//   var dialog = document.querySelector('dialog');
//   document.querySelector('.login-reveal').onclick = function() {
//     dialog.showModal();
//   };
//   document.querySelector('#close').onclick = function() {
//     dialog.close();
//   };
// });
