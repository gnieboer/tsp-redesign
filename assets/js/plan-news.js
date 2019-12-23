function show(prefix, suffix) {
  var element = document.getElementById(prefix+'-'+suffix);
  var accordion = document.getElementById(prefix+'-content-'+suffix);
  if (element.hasClass('down')) {
    accordion.show();
  } else {
    accordion.hide();
  }
   element.classList.toggle("down");
}

function showMorePlans(type, formNum) {
  var controlDiv = 'more-'+type+'-'+formNum;
  var contentDiv = 'more-'+type+'-content-'+formNum;
  if ($('#'+controlDiv).hasClass('down')) {
    $('#'+contentDiv).addClass('hide');
    $('#'+controlDiv).removeClass('down');
  } else {
    $('#'+contentDiv).removeClass('hide');
    $('#'+controlDiv).addClass('down');
  }
}

function searchInline(searchName) {
  $('#search-message-'+searchName).html('');
  var terms = $('#search-input-'+searchName).val();
  // console.log('terms = ', terms);
  if (terms == '') { resetInline(searchName); return; }

  inlineUSAsearch(searchName, 'search-message-'+searchName, 'beta.tsp.'+searchName, terms, searchInlineCallback);
}


function searchInlineCallback(searchName, result) {
  $('#'+'search-message-'+searchName).html('');
  // console.log('in callback searchInlineCallback()');
  // console.log(result);
  // var jsonBlock = JSON.parse(result);
  var jsonBlock = result;
  var hits = jsonBlock.web.total;
  var results = jsonBlock.web.results;
  // console.log(searchName, results);
  var items = [];
  for (var i = 0; i < hits; i++) {
    var str = results[i].url.split(/\//).pop().replace(/.html$/, '');
    // console.log(str)
    items.push(str);
  }
  // console.log(items.length);
  showMatches(searchName, items);
}

// close accordions and show all content
function resetInline(searchName) {
  // console.log('reset '+searchName);
  $('#'+searchName+'-default-div').show();
  $('#'+searchName+'-search-results').hide();
}
// open accordions but hide all content
function hideInline(searchName) {
  // console.log('hide '+searchName);

  // $('.plan-news-block').addClass('hide');
  // open accordions
  // hide accordion tops
  $('#'+searchName+'-default-div').hide();
  $('#'+searchName+'-search-results').show();
  $('.'+searchName+'-search-block').addClass('hide');
}
// show plans that match, hide ones that document
// expect array of plan item names
function showMatches(searchName, items) {
  hideInline(searchName);

  if (items.length <= 0) {
    // console.log('no matches '+searchName);
    $('#search-message-'+searchName).html('no matches');
    $('#'+searchName+'-search-results').hide();
  }

  // show winners
  items.forEach(function (item, index) {
    // console.log('processing ', item, index);
    // $('#'+item+'-block').show();
    $('#'+item+'-1-block').removeClass('hide');
  });
}
