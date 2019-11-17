/*
  Ajax call for search using usa search.
*/

var siteName = "https://search.usa.gov/api/v2/search/i14y";
var affiliate = "beta.tsp";
// var accessKey = "9gcFHn4xSylFEK4QUpxR9y50_MJOy3LBi0bh4hIZ7Ew="; // dav
// var accessKey = "1XBegCSAeuxyTJpE-19b0RvpUboHO40rk0dwtk0QNnM="; // tsp
// var accessKey = "sVO7chy_W4g9AMmHj90csL3Oyn6z7JKRs1Pb8BxCJ9Y="; // beta.tsp
var accessKey = "6HltwZIKfyLoxQKMBODEct4oWEf82aYqOG690gVLWlA=";

var doUSAsearch = function(divName, url, resultsFormat) {
  $('#'+divName).html('Calling server for data...');
  var serverCall = $.get(url);
  serverCall.done(
    function (json) {
      // var data = JSON.parse(json);
      // var data = JSON.stringify(json);
      if (resultsFormat) {
        // send json results to callback function
        resultsFormat(divName, json);
      } else {
        // pretty print json, stick in div
        var data = syntaxHighlight(json);
        data = '<pre>'+data+'</pre>';
        $('#'+divName).html(data);
      }
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

function search(queryBox, resultDiv, collectionID, resultsFormat) {
  console.log('search('+queryBox+',"'+resultDiv+'",'+collectionID+','+resultsFormat+')');
  var terms = $('#'+queryBox).val();
  if (terms == '') { console.log('no search'); return false; }
  terms = encodeURIComponent(terms);
  console.log('searching: '+terms);
  var url = siteName
          + '?affiliate=' + affiliate
          + '&access_key=' + accessKey
          + '&query=' + terms;
  if (collectionID) {
    url += "&dc=" + collectionID;
  }
  console.log('searching |'+url+'|');
  // build url
  // doUSAsearch(resultDiv, "https://search.usa.gov/api/v2/search?affiliate=tspgov&access_key=9gcFHn4xSylFEK4QUpxR9y50_MJOy3LBi0bh4hIZ7Ew=
  doUSAsearch(resultDiv, url, resultsFormat);
}

function doSearch() {
  search('search-box', 'search-results', 0, 0);
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
