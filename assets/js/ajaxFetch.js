/*
  All the ajax calls to the data source.
*/

var siteName = "https://www.tsp.gov/components/CORS/";

var singleFundData = function(fund) {

  var scriptName = 'getFundAverageAnnualReturns.html?fund=' + fund;
  var serverCall = $.get(siteName + '/' + scriptName);
    serverCall.done(
      function (data) {
          var values = data.split(", ");
          console.log('values length is ', values.length);
          if (values.length == 7) {
            $('#aar_caption').html("Average annual returns (as of December "+values[6]+")");
            $('#aar_ytd').html(values[1]);
            $('#aar_1yr').html(values[2]);
            $('#aar_3yr').html(values[3]);
            $('#aar_5yr').html(values[4]);
            $('#aar_10yr').html(values[5]);
          }
          console.log(name + ': ' + data);
      }
    );
    serverCall.fail(
      function (jqXHR, textStatus, errorThrown) {
          var errMsg = textStatus + ': ' + errorThrown;
          $('#aar_error').html('data unavailable, try again later');
          console.log('error getting average annual returns: ' + 'data unavailable, try again later');
      }
    );
//    serverCall.always(
//      function (jqXHR, textStatus) {
//      }
//    );
}
