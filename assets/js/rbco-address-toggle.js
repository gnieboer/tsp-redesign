// DAV, delete this. It was for the static version only.

function toggleAddress() {
  // Get the checkbox
  var checkBox = document.getElementById("partforeignAddress");
  // Get the output text
  var domestic = document.getElementById("address-domestic");
  var foreign = document.getElementById("address-foreign");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    domestic.style.display = "none";
    foreign.style.display = "block";
  } else {
    domestic.style.display = "block";
    foreign.style.display = "none";
  }
}

window.onload = function(){
    SetDefaultValue();

    function SetDefaultValue() {
        var PopulateField = document.getElementById("civAcctNum").value="1234567891012";
        var PopulateField = document.getElementById("usvAcctNum").value="1234567891012";
    }
};
