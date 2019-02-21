
// function myFunction() {
//   document.getElementById("hp-news").innerHTML = "Iframe is loaded.";
// }

function myFunction() {
  var x = document.getElementById("hp-news");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
