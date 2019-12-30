
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

// share-bar callback
// for this one, we only care about best bets hits
// and we only care about pdf hits
function formsCallback(searchName, result) {
  $('#'+'search-message-'+searchName).html('');
  // console.log('in callback formsCallback()');
  // console.log(result);
  var jsonBlock = result;
  var results = jsonBlock.text_best_bets;
  var hits = results.length;
  // console.log(searchName, results, hits);

  $('.div-block-class').addClass('hide'); // hide them all
  for (var i = 0; i < hits; i++) {
    var str = results[i].url.split(/\//).pop().replace(/\./, '-');
    str = str+'-block';
    console.log('|'+str+'|')
    $('#'+str).removeClass('hide');  // show matching hits
  }

  // hide topics, show inline searh copy
  $('#inline-search-forms').removeClass('hide');
  $('#inline-search-resources').removeClass('hide');
  $('.select-forms-div').addClass('hide');
  $('.select-resources-div').addClass('hide');
  return true;
}

// reset back to the forms page default
function resetInline(searchName) {
  $('#inline-search-forms').addClass('hide');
  $('#inline-search-resources').addClass('hide');
  $('.select-forms-div').removeClass('hide');
  $('.select-resources-div').removeClass('hide');
}
