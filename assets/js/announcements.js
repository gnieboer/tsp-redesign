function announcementsSearch(field) {
  console.log('in announcementsSearch', field.value);

  $('#announcement-default-div').addClass('hide');
  $('#announcements-search-results').removeClass('hide');

  console.log('hiding them');
  $('.announcement-search-block').addClass('hide');
  showSearchMatches(field.value);
  return true;
}

function showSearchMatches(str) {
  var block = '';
  var div = '';
  var matchCnt = 0;
  var ucStr = str.toUpperCase();
  var str_array;
  // all in this messy function so I am not passing around a lot of objects
  $('.announcement-search-block').each(function(i, obj) {
    // console.log(obj);
    console.log(obj.id);
    block = obj.id;
    div = block.slice(0,-5) + 'div';
    str_array = ucStr.trim().split(/\s+/);
    for (var i = 0; i < str_array.length; i++) {
      if (str_array[i].trim() == '') { continue; }
      if ($('#'+div).text().toUpperCase().includes(str_array[i].trim())) {
        if ($('#'+block).hasClass('hide')) {
          $('#'+block).removeClass('hide');
          matchCnt++;
        }
      }
    }
    var matchStr = "<h3>There were "+matchCnt+" matches to '" + str + "'.</h3>";
    $('#'+'search-result-count').html(matchStr);
   });
}

function showMoreAnnouncements(type, formNum) {
  var controlDiv = 'more-'+type+'-'+formNum;
  var contentDiv = 'more-'+type+'-content-'+formNum;
  var arrowIcon = 'more-'+type+'-arrow-'+formNum;
  if ($('#'+controlDiv).hasClass('down')) {
    $('#'+contentDiv).addClass('hide');
    $('#'+controlDiv).removeClass('down');
    $('#'+controlDiv).html("See more");
    $('#'+arrowIcon).removeClass('down');
  } else {
    $('#'+contentDiv).removeClass('hide');
    $('#'+controlDiv).addClass('down');
    $('#'+controlDiv).html("See fewer");
    $('#'+arrowIcon).addClass('down');
  }
}





// xxxxxxxxxxxxxxxxxxxxxx


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

// share-bar callback
function planNewsCallback(searchName, result) {
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
    // var str = results[i].url.split(/\//).pop().replace(/.html$/, '');
    var str = results[i].url.slice(0, -1).split(/\//).pop();
    // console.log(str)
    // console.log(results[i].url, str);
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
    // console.log('processing ', item, index, '#'+item+'-1-block');
    // $('#'+item+'-block').show();
    $('#'+item+'-1-block').removeClass('hide');
  });
}
