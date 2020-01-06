
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
  resetInline('forms');
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

function makeBlockofHits (hitList) {
    var divStart = '<div class="usa-grid-full">'+"\n";
    var divEnd = '</div>'+"\n";
    var divBlock = divStart;
    var cnt = 0;
    var rowCnt = 2;
    for (var i in hitList) {
      var block = $(i).html();
      block = '<div class="usa-width-one-half">' +block+ '</div>';
      divBlock += "\n" + block + "\n";
      cnt++;
      if (cnt >= rowCnt) { divBlock += divEnd + "\n" + divStart; cnt = 0; }
    }
    divBlock += divEnd;
    return divBlock;
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

  // $('.div-block-class').addClass('hide'); // hide them all
  var formList = [];
  var resList = [];
  for (var i = 0; i < hits; i++) {
    var str = results[i].url.split(/\//).pop().replace(/\./, '-');
    str = '#' + str+'-block';
    if (results[i].url.includes('form')) { formList[str] = str; }
    else
      if (results[i].url.includes('publications')) { resList[str] = str; }
  }
  // console.log('form '); for (i in formList) { console.log(i); }
  // console.log('res '); for (i in resList) { console.log(i); }

  $('#inline-search-forms-results').html(makeBlockofHits(formList));
  $('#inline-search-resources-results').html(makeBlockofHits (resList));
  var terms = $('#search-input-'+searchName).val();
  var message = "We found <strong>" + Object.keys(formList).length + "</strong> forms and <strong>"
              + Object.keys(resList).length + "</strong> resources about <strong>" + terms + "</strong>.";
  $("#inline-search-forms-message").html(message);

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
