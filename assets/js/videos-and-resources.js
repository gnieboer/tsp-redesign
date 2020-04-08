
function onPlayerReady(event) {
  event.target.playVideo();
}
function showVideo(vidCode) {
  $('.video-details').hide();
  $('#'+vidCode+'-block').show();
  // console.log('show '+vidCode);
  var ytURL = "https://www.youtube.com/embed/";
  var ytOptions = "?modestbranding=1&rel=0&iv_load_policy=3&fs=0&disablekb=1&showinfo=0&autoplay=0";
  $('#video-iframe').attr("src", ytURL+vidCode+ytOptions);
}

function initVideoList() {
  showVideo('r6rRMcgBNCc');

  // do a search to get all the video details
  // inlineUSAsearch('videos', 'search-status', 'beta.tsp', 'video', 'tsp', 1, 0, videoSearchCallback);

  // initialize the inline search on the page
  addToVidArraysInline();
}

function doVideoSearch(term) {
  // console.log(term);
  $('#browse-titles').val(term);
  videoOnKeyUp();
}
function doCatSearch(term) {
  $('#browse-titles').val(term);
  showVideoTitles(term, 'cat');
}

var keyHash = {};
var vidKeys = [];
var vidTitles = [];
var vidDescs = [];
var vidTrans = [];
var vidCats = [];

function clearVidArrays() {
  keyHash = {};
  vidKeys = [];
  vidTitles = [];
  vidDescs = [];
  vidTrans = [];
  vidCats = [];
}

function addToVidArraysInline() {
  var items = $('.show-video-link');
  var name;
  for (var i = 0; i < items.length; i++) {
      key = items[i].id.slice(5);
      // console.log(key);
      if (!(key in keyHash)) {
        // console.log('adding '+key);
        keyHash[key] = key;
        vidKeys.push(key);
        vidTitles.push($('#'+key+'-title').text().toUpperCase());
        vidDescs.push($('#'+key+'-description').text().toUpperCase());
        vidTrans.push($('#'+key+'-transcript').text().toUpperCase());
        vidCats.push($('#'+key+'-categories').text().toUpperCase());
      }
  }
  // for (i = 0; i < vidKeys.length; i++) { console.log(vidKeys[i], vidTitles[i], vidCats[i], vidDescs[i], vidTrans[i]); }
  return true;
}

function addToVidArrays(key, result) {
  if (!(key in keyHash)) {
    // console.log('adding '+key);
    keyHash[key] = key;
    vidKeys.push(key);
    vidTitles.push(cleanSnippet(result.title.toUpperCase()));
    // $('#'+vidCode+'-description').html(formatSnippet(results.snippet));
    vidDescs.push($('#'+key+'-description').text().toUpperCase());
    vidTrans.push($('#'+key+'-transcript').text().toUpperCase());
    vidCats.push($('#'+key+'-categories').text().toUpperCase());
  }

}

function videoSearchCallback(searchName, returnedJSON, offset) {
  if (typeof returnedJSON === 'undefined') { return false; }
  var results;  // JSON block of hits
  var resultsTotal = 0;
  var totalHits = 0;
  var qs = $('#search-terms').val();
  var hitFormat = 'web';
  var vidCode = '';
  var tmp;
  clearVidArrays();

  // console.log(returnedJSON);
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
          addToVidArrays(vidCode, results[i]);
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
  // for (i = 0; i < vidKeys.length; i++) { console.log(vidKeys[i], vidTitles[i], vidDescs[i], vidTrans[i]); }
  return false;
}

function videoOnKeyUp() {
  var input = $('#'+'browse-titles').val();
  // console.log('input '+input);
  showVideoTitles(input, '');
}

function strInTitle(str, idx) {
  if (vidTitles[idx].includes(str)) { return true; }
  return false;
}
function strInDesc(str, idx) {
  if (vidDescs[idx].includes(str)) { return true; }
  return false;
}
function strInTran(str, idx) {
  if (vidTrans[idx].includes(str)) { return true; }
  return false;
}
function strInCat(str, idx) {
  if (vidCats[idx].includes(str)) { return true; }
  return false;
}
function testVideoString(str, i, group) {
  if (group == 'cat') {
    return strInCat(str, i);
  }
  return (strInTitle(uStr,i)||strInDesc(uStr,i)||strInTran(uStr,i)||strInCat(uStr,i));
}
function showVideoTitles(str, group) {
  uStr = str.toUpperCase();
  if (uStr == '') {
    // show all the ones we've got data for
    for (var i = 0; i < vidKeys.length; i++) {
      $('#show-'+vidKeys[i]).show();
    }
    // console.log('count is '+($('.show-video-link:visible').length));
    return false;
  }
  // str has a value, use it as a search key
  for (var i = 0; i < vidKeys.length; i++) {
    if (testVideoString(uStr, i, group)) {
      $('#show-'+vidKeys[i]).show();
    } else {
      $('#show-'+vidKeys[i]).hide();
    }
  }
  // console.log('count is '+($('.show-video-link:visible').length));
  return true;
}

function buildYML(apiKey, resultDiv) {
  var youtubeSite = "https://www.googleapis.com/youtube/v3/videos?";
  // var key = "key=AIzaSyDLozGtZFvP49NZxV1SodEiUdqDJvaG0M8";
  var key = "key=" + $('#'+apiKey).val().trim();
  var channelID = "&channelId=UCOmEoeuWWCbDNeQi5iH9z-w";
  var items = $('.vid-name');
  var ids = '&id=' + items[0].id;
  for (var i = 1; i < items.length; i++) { ids += ',' + items[i].id; }
  // ids = "&id=r6rRMcgBNCc,fE_6wGds0ac,zY42j4tBXfc";
  var parts = "&part=contentDetails,snippet";

  var fullURL = youtubeSite + key + channelID + ids + parts;

  // $('#'+resultDiv).html(fullURL);
  getFromYouTube(fullURL, resultDiv);
}

function leadZero(i) { return (i>9) ? i : "0" + i; }

function durationToTime(duration) {
console.log(duration);
  var str = duration.replace(/^PT/,'');
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  console.log(str);
  if (str.includes('H')) {
    var tmp = str.split('H');
    hours = tmp[0];
    str = tmp[1];
    console.log('found H', hours, str);
  }
  if (str.includes('M')) {
    var tmp = str.split('M');
    minutes = tmp[0];
    str = tmp[1];
    console.log('found M', minutes, str);
  }
  if (str.includes('S')) {
    var tmp = str.split('S');
    seconds = tmp[0];
    str = tmp[1];
    console.log('found S', seconds, str);
  }

  if (hours > 0) { return hours + ':' + leadZero(minutes) + ':' + leadZero(seconds); }
  if (minutes > 0) { return minutes + ':' + leadZero(seconds); }
  // return seconds + ' seconds';
  return minutes + ':' + leadZero(seconds);
}

function parseYouTubeData(resultDiv, data) {
  var rc = '';
  var items = data.items;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    rc += "- video_title: \"" + item.snippet.title + "\"\n";
    rc += "  video_id: " + item.id + "\n";
    var description = item.snippet.description;
    description = description.replace(/"/g, "'");
    rc += "  video_description: \"" + description + "\"\n";
    rc += "  video_duration: \"" + durationToTime(item.contentDetails.duration) + "\"\n";
    var date = item.snippet.publishedAt;
    date = date.split('T')[0];
    rc += "  video_date: " + date + "\n";
    if ($('#'+item.id+'-categories').text() != '') {
      var categories = $('#'+item.id+'-categories').text().split(',');
      categories = categories.join("\n    - ");
      rc += "  video_categories: " + "\n    - " + categories + "\n";
    }
    if ($('#'+item.id+'-download').text() != '') {
      rc += "  video_download: " + $('#'+item.id+'-download').text() + "\n";
    }
    if ($('#'+item.id+'-transcript').text() != '') {
      var transcript = $('#'+item.id+'-transcript').text();
      // transcript = transcript.replace(/"/g, "'");
      // transcript = transcript.replace(/\n/g, "\n  ");
      rc += "  video_transcript: \"" + transcript + "\"\n";
    }
  }
  // console.log('|', rc, '|', data, '|');
  $('#'+resultDiv).text(rc);
}
/*
- video_title: Lifecycle Funds
#  video_description: In this video, we’ll talk about the professionally designed Lifecycle Funds, also known as the L Funds.
  video_id: r6rRMcgBNCc
  video_playlist: PLz_6hPnw1Qq5W5U3hZiD0c05gZKkFStT1
#  video_duration: 1:52
#  video_date: October 14, 2014
  video_categories:
    - Education
    - Investment options
  video_download: fund-lifecycle .mp4 # Assumption is /assets/videos/
  video_transcript: "Your TSP Investment Options: The Lifecycle Funds

  The TSP has a selection of individual and lifecycle funds that let you diversify your retirement savings. You can choose to invest your TSP dollars in everything from short-term U.S. Treasury securities to index funds comprised of domestic and international stocks. In this video, we’ll talk about the professionally designed Lifecycle Funds, also known as the L Funds. If you don’t have the time, experience, or interest to manage your TSP retirement savings, consider one of the L Funds.

  Each L Fund features a combination of the five individual funds (G, F, C, S, and I) that is appropriate for your “time horizon” or the future date at which you plan to start withdrawing the money in your TSP account.

  Here’s how it works:

  The L Funds assume that the farther you are away from needing your money, the more you are able to tolerate risk. Therefore, they give you the opportunity to enjoy the potentially higher returns associated with investing in the stock markets. But the funds continually adjust, so as the time nears for you to withdraw your money, it is more conservatively invested. That way, you’re not exposing your entire savings to unexpected market changes right when you need the income.

  As with all investments, there are risks. The L Funds carry the same risks that are associated with all of the underlying individual TSP funds. Watch our other fund videos for more information.

  To find out which L Fund might be right for you, or to learn about the other TSP funds, watch our entire series of fund videos. Or visit tsp.gov to review our fund information sheets."
*/
var getFromYouTube = function(url, resultDiv) {

  var serverCall = $.get(url);
    serverCall.done(
      function (data) {
          parseYouTubeData(resultDiv, data);
      }
    );
    serverCall.fail(
      function (jqXHR, textStatus, errorThrown) {
          var errMsg = textStatus + ': ' + errorThrown;
          // $('#aar_caption').html("Average annual returns (as of December "+values[7]+")");
          console.log('yml data failed');
          $('#'+resultDiv).html('getting data failed');
      }
    );
}
