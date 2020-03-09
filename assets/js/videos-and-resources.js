
function onPlayerReady(event) {
  event.target.playVideo();
}
function showVideo(vidCode) {
  $('.video-details').hide();
  $('#'+vidCode+'-block').show();
  console.log('show '+vidCode);
  // $('#video-iframe').attr("src", "https://www.youtube.com/embed/"+vidCode+"&rel=0")
  // $('#video-iframe').attr("src", "https://www.youtube.com/embed/"+vidCode);
  var ytURL = "https://www.youtube.com/embed/";
  // var ytOptions = "?enablejsapi=1&list=PLz_6hPnw1Qq5W5U3hZiD0c05gZKkFStT1&rel=0&showinfo=0&loop=1";
  var ytOptions = "?modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&showinfo=0&autoplay=0";
  $('#video-iframe').attr("src", ytURL+vidCode+ytOptions);

return;
$('video-span').html(
  '<iframe'
  + ' src="https://www.youtube.com/embed/videoseries?list=PLz_6hPnw1Qq5W5U3hZiD0c05gZKkFStT1&rel=0"'
  + ' frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"'
  + ' allowfullscreen></iframe>'
);

  $('video-span').html(
    '<iframe width="560" height="315"'
    + ' src="https://www.youtube.com/embed/Zw6VFeZZ_i0"'
    + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"'
    + ' allowfullscreen></iframe>'
  );
}

function initVideoList() {
  showVideo('r6rRMcgBNCc');

  // do a search to get all the video details
  inlineUSAsearch('videos', 'search-status', 'beta.tsp', 'video', 'tsp', 1, 0, videoSearchCallback);
}

var vidKeys = [];
var vidTitles = [];

function videoSearchCallback(searchName, returnedJSON, offset) {
  if (typeof returnedJSON === 'undefined') { return false; }
  var results;  // JSON block of hits
  var resultsTotal = 0;
  var totalHits = 0;
  var qs = $('#search-terms').val();
  var hitFormat = 'web';
  var vidCode = '';
  var tmp;
  vidKeys = [];
  vidTitles = [];

  console.log(returnedJSON);
  results = returnedJSON.video.results;
  resultsTotal = returnedJSON.video.total;
  totalHits = resultsTotal;
  hitFormat = 'video';

  $('.show-video-link').hide();
  var vidList = $('.show-video-link');

  if (results) {
    var len = results.length;
    for (i = 0; i < len; i++) {
      // console.log(i, ': ', results[i]);
      vidCode = '';
      if (results[i].url != null) {
        tmp = results[i].url.split('=');
        if (tmp.length > 1) { vidCode = tmp[tmp.length-1]; }
      }
      if (vidCode != '') {
        $('#show-'+vidCode).show();
        if ($("#"+vidCode+'-block').length > 0) {
          // console.log(i, ' vidCode = ', vidCode, ' ', results[i].publication_date, ' ', results[i].duration);
          $('#'+vidCode+'-pub-date').html(formatDuration(results[i].publication_date));
          $('#'+vidCode+'-duration').html(results[i].duration);
          // $('#'+vidCode+'-description').html(formatSnippet(results[i].snippet));
          vidKeys.push(vidCode);
          vidTitles.push(cleanSnippet(results[i].title.toUpperCase()));
        } else {
          console.log('not in yml file '+vidCode);
        }
      }
    }
  }
  var i;
  for (i = 0; i < vidList.length; i++) {
    if ($('#'+vidList[i].id).is(':hidden')) { console.log('not in search result: ' + vidList[i].id); }
  }
  for (i = 0; i < vidKeys.length; i++) {
    console.log(vidKeys[i], vidTitles[i]);
  }
  return false;
}

function videoOnKeyUp() {
  var input = $('#'+'browse-titles').val();
  // console.log('input '+input);
  showVideoTitles(input);
}
function showVideoTitles(str) {
  if (str == '') {
    // show all the ones we've got data for
    for (var i = 0; i < vidKeys.length; i++) {
      $('#show-'+vidKeys[i]).show();
    }
    // console.log('count is '+($('.show-video-link:visible').length));
    return false;
  }
  // str has a value, use it as a search key
  for (var i = 0; i < vidKeys.length; i++) {
    if (vidTitles[i].includes(str.toUpperCase())) {
      $('#show-'+vidKeys[i]).show();
    } else {
      $('#show-'+vidKeys[i]).hide();
    }
  }
  // console.log('count is '+($('.show-video-link:visible').length));
  return true;
}
