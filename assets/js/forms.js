
function selectFormsTopic() {
  var val = document.getElementById("select-forms-topic").value;
  // console.log('selectFormsTopic: |' + val + '|');
  $('.select-forms-div').addClass('hide');
  $('#select-forms-'+val).removeClass("hide");
  $('.select-resources-div').addClass('hide');
  $('#select-resources-'+val).removeClass("hide");
}

function showMoreForms(type, formNum) {
  var controlDiv = 'more-'+type+'-'+formNum;
  var contentDiv = 'more-'+type+'-content-'+formNum;
console.log(type, formNum);
  if ($('#'+controlDiv).hasClass('see-less')) {
console.log('add hide to '+contentDiv+'    remove see-less from '+controlDiv);
    $('#'+contentDiv).addClass('hide');
    $('#'+controlDiv).removeClass('see-less');
  } else {
console.log('remove hide from '+contentDiv+'    add see-less to '+controlDiv);
    $('#'+contentDiv).removeClass('hide');
    $('#'+controlDiv).addClass('see-less');
  }
}
