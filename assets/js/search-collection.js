// REFERENCE ONLY -- NOT IN USE 9/27/2019
function myFunction() {
  var element = document.getElementById("search_form_8657");
  element.classList.remove("usa-sr-only");
  var input = document.getElementById("query_8657");
  input.focus();
  var button = document.getElementById("search-option");
  button.classList.add("usa-sr-only");
}

function myFunction2() {
  var element = document.getElementById("search_form_8657");
  element.classList.add("usa-sr-only");
  var button = document.getElementById("search-option");
  button.classList.remove("usa-sr-only");
}
