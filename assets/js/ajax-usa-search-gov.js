/*
  Ajax call for search using usa search.
*/

var siteName = "https://search.usa.gov/api/v2/search/i14y";

var affiliates = {
  "beta.tsp": "sVO7chy_W4g9AMmHj90csL3Oyn6z7JKRs1Pb8BxCJ9Y=",
  "beta.tsp.forms": "6HltwZIKfyLoxQKMBODEct4oWEf82aYqOG690gVLWlA=",
  "beta.tsp.plan-news": "Rq24ee2O0lnSR6VJmiRiIMDJhNZ_KSVrYzisorSVCr8=",
};

var default_limit = 10;

function affiliateKeys() {
  return Object.keys(affiliates);
}

function buildAffiliateSelect(selectName) {
  var mySelect = document.getElementById('search-affiliate-'+selectName);
  var i = 0;
  mySelect.options.length = 0;
  Object.keys(affiliates).forEach(function(key) {
    mySelect.options[i++] = new Option(key, key);
  })
}

// var affiliate = "beta.tsp";
var affiliate = "beta.tsp.plan-news";
// var accessKey = "9gcFHn4xSylFEK4QUpxR9y50_MJOy3LBi0bh4hIZ7Ew="; // dav
// var accessKey = "1XBegCSAeuxyTJpE-19b0RvpUboHO40rk0dwtk0QNnM="; // tsp
// var accessKey = "sVO7chy_W4g9AMmHj90csL3Oyn6z7JKRs1Pb8BxCJ9Y="; // beta.tsp
// var accessKey = "6HltwZIKfyLoxQKMBODEct4oWEf82aYqOG690gVLWlA=";
var accessKey = "Rq24ee2O0lnSR6VJmiRiIMDJhNZ_KSVrYzisorSVCr8=";

var doUSAsearch = function(divName, url, getAll, offset, prevResult) {
  $('#'+divName).html('Calling server for data...');
  // console.log(url);
  var offsetURL = url + '&offset=' + offset;
  var serverCall = $.get(offsetURL);
  serverCall.done(
    function (json) {
      // var data = JSON.parse(json);
      // var data = JSON.stringify(json);
      if (prevResult != null) {
        if (prevResult.web.results != null) {
          json.web.results = prevResult.web.results.concat(json.web.results);
        }
        if (prevResult.text_best_bets != null) {
          json.text_best_bets = prevResult.text_best_bets.concat(json.text_best_bets);
        }
        if (prevResult.graphic_best_bets != null) {
          json.graphic_best_bets = prevResult.graphic_best_bets.concat(json.graphic_best_bets);
        }
      }
      // console.log(json.web.results.length, json.text_best_bets.length);
      if (getAll == 1) {
        if (json.web.next_offset > 0) {
          doUSAsearch(divName, url, getAll, json.web.next_offset, json);
          return false;
        }
      }
      // console.log('results size = '+ json.web.results.length);
      var data = syntaxHighlight(json);
      data = '<pre>'+data+'</pre>';
      $('#'+divName).html(data);
      return true;
    }
  );
  serverCall.fail(
    function (jqXHR, textStatus, errorThrown) {
        var errMsg = textStatus + ': ' + errorThrown;
        var userMsg = somethingNotWorking();
        $('#'+divName).html(userMsg);
    }
  );
}

function buildSearchURL(affiliate, accessKey, limit, offset, query) {
  var url = siteName
          + '?affiliate=' + affiliate
          + '&access_key=' + accessKey
          + '&limit=' + limit
          + '&query=' + query;
  if (offset > 0) { url += '&offset=' + offset; }
  console.log('searching |'+url+'|');
  return url;
}

function search(queryBox, resultDiv) {
  var terms = $('#'+queryBox).val();
  if (terms == '') {
    // console.log('no search');
    return false;
  }
  terms = encodeURIComponent(terms);
  // console.log('searching: '+terms);
  var url = buildSearchURL(affiliate, accessKey, default_limit, 0, terms);
  doUSAsearch(resultDiv, url, 0, 0, null);
}

function search2(queryBox, resultDiv, affiliateSelect) {
  var affiliate = $('#'+affiliateSelect).val();
  if (affiliate in affiliates) {
    // console.log('found it');
    var terms = $('#'+queryBox).val();
    if (terms == '') {
      // console.log('no search');
      return false;
    }
    terms = encodeURIComponent(terms);
    // console.log('searching: '+terms);
    var accessKey = affiliates[affiliate];
    var url = buildSearchURL(affiliate, accessKey, default_limit, 0, terms);
    doUSAsearch(resultDiv, url, 1, 0, null);
  }
}

function doSearch() {
  search('search-box', 'search-results');
  return false;
}

function doSearch2(searchName) {
  var input = 'search-input-'+searchName;
  var resultMsg = 'search-message-'+searchName;
  var affiliate = 'search-affiliate-'+searchName;
  search2(input, resultMsg, affiliate);
  return false;
}

// from stack overflow 4810841
function syntaxHighlight(json) {
    json = JSON.stringify(json, undefined, 4);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


var doInlineUSAsearch = function(searchName, statusBox, url, callback, getAll, offset, prevResult) {
  $('#'+statusBox).html('Calling server for data...');
  // console.log(url);
  var offsetURL = url + '&offset=' + offset;
  var serverCall = $.get(offsetURL);
  serverCall.done(
    function (json) {
      if (prevResult != null) {
        if (prevResult.web.results != null) {
          json.web.results = prevResult.web.results.concat(json.web.results);
        }
        if (prevResult.text_best_bets != null) {
          json.text_best_bets = prevResult.text_best_bets.concat(json.text_best_bets);
        }
        if (prevResult.graphic_best_bets != null) {
          json.graphic_best_bets = prevResult.graphic_best_bets.concat(json.graphic_best_bets);
        }
      }
      if (getAll == 1) {
        if (json.web.next_offset > 0) {
          doInlineUSAsearch(searchName, statusBox, url, callback, getAll, json.web.next_offset, json);
          return false;
        }
      }
      // console.log(json.web.results, json.text_best_bets);
      $('#'+statusBox).html('search complete');
      callback(searchName, json);
      return true;
    }
  );
  serverCall.fail(
    function (jqXHR, textStatus, errorThrown) {
        $('#'+statusBox).html('search failed');
        var errMsg = textStatus + ': ' + errorThrown;
        var userMsg = somethingNotWorking();
        $('#'+statusBox).html(userMsg);
    }
  );
}

function inlineUSAsearch(searchName, statusBox, searchSite, terms, callback) {
  if (terms == '') { callback(''); return false; }
  terms = encodeURIComponent(terms);
  // console.log('searching: '+terms);

  if ( ! (searchSite in affiliates) ) { console.log('searchSite error'); return; }
  var affiliate = searchSite;
  var accessKey = affiliates[affiliate];
  var url = buildSearchURL(affiliate, accessKey, default_limit, 0, terms);
  doInlineUSAsearch(searchName, statusBox, url, callback, 1, 0, null, null);
}

// onChange for search-bar input
function searchInline(searchName, userCallback) {
  $('#search-message-'+searchName).html('');
  var terms = $('#search-input-'+searchName).val();
  // console.log('terms = ', terms);
  if (terms == '') { resetInline(searchName); return; }

  inlineUSAsearch(searchName, 'search-message-'+searchName, 'beta.tsp.'+searchName, terms, userCallback);
}
