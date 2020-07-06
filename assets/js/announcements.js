function announcementsSearch(field) {
  $('#announcement-default-div').addClass('hide');
  $('#announcements-search-results').removeClass('hide');

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
    block = obj.id;
    div = block.slice(0,-5) + 'div';
    str_array = ucStr.trim().split(/\s+/);
    if ($('#'+div).text().toUpperCase().includes(str_array[0].trim())) {
      if ($('#'+block).hasClass('hide')) {
        $('#'+block).removeClass('hide');
        matchCnt++;
      }
    }
    for (var i = 1; i < str_array.length; i++) {
      if (str_array[i].trim() == '') { continue; }
      if (! $('#'+div).text().toUpperCase().includes(str_array[i].trim())) {
        if (!$('#'+block).hasClass('hide')) {
          $('#'+block).addClass('hide');
          matchCnt--;
        }
      }
    }
    var matchStr = "<h3>There were "+matchCnt+" matches to '" + str + "'.</h3>";
    if (matchCnt == 1) {
      matchStr = "<h3>There was 1 match to '" + str + "'.</h3>";
    }
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

// only call this on page load!
function getCleanParm(parm, maxLength) {
  var qs = getQueryString(parm);
  if (typeof qs === 'undefined') { return ''; }
  qs = decodeURIComponent(qs);
  qs = qs.replace(/[^A-Z0-9_-]+/ig,' ');
  qs = qs.substring(0,maxLength);
  return qs;
}
// only call this on page load!
function setQS(inputBox) {
  var terms = getCleanParm('qs', 150);
  if (terms.trim() != '') {
    console.log('terms = '+terms);
    $('#'+inputBox).val(terms).change();
    return true;
  }
  console.log('no terms = '+terms);
  return false;
}

function searchOnAnnouncements(inputBox) {
  var terms = $('#'+inputBox).val();
  if (terms == '') {
    // console.log('no search');
    return false;
  }
  terms = encodeURIComponent(terms);
  // console.log('searching: '+terms);
  var url = '/agency-service-reps/announcements/?qs='+terms;
  location.href = url;
  return true;
}
