
function selectFormsTopic() {
  var val = document.getElementById("select-forms-topic").value;
  console.log('selectFormsTopic: |' + val + '|');
  $('.select-forms-div').addClass('hide');
  $('#select-forms-'+val).removeClass("hide");
}
