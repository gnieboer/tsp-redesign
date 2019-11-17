
function selectFormsSearchResult(queryBox) {
  $('.select-forms-div').addClass('hide');
  $('.select-resources-div').addClass('hide');
  $('#select-forms-SR').removeClass('hide');
  $('#select-forms-topic').prop('selectedIndex', 0);
  $('#'+queryBox).blur();
  $('#'+queryBox).val('');
}

function inlineSearch(queryBox, resultDiv) {
  search(queryBox, resultDiv, 0, 0);
  selectFormsSearchResult(queryBox);
}

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
  if ($('#'+controlDiv).hasClass('see-less')) {
    $('#'+contentDiv).addClass('hide');
    $('#'+controlDiv).removeClass('see-less');
    $('#'+controlDiv).html("<span>See more "+type+"</span>");
  } else {
    $('#'+contentDiv).removeClass('hide');
    $('#'+controlDiv).addClass('see-less');
    $('#'+controlDiv).html("<span>See fewer "+type+"</span>");
  }
}
