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
          if (values.length == 8) {
            $('#aar_caption').html("Average annual returns (as of December "+values[7]+")");
            $('#aar_ytd').html(values[1]);
            $('#aar_1yr').html(values[2]);
            $('#aar_3yr').html(values[3]);
            $('#aar_5yr').html(values[4]);
            $('#aar_10yr').html(values[5]);
            // $('#aar_incep').html(values[6]);
          }
          console.log(name + ': ' + data);
      }
    );
    serverCall.fail(
      function (jqXHR, textStatus, errorThrown) {
          var errMsg = textStatus + ': ' + errorThrown;
          // $('#aar_caption').html("Average annual returns (as of December "+values[7]+")");
          $('#aar_ytd').html('unavailable');
          $('#aar_1yr').html('unavailable');
          $('#aar_3yr').html('unavailable');
          $('#aar_5yr').html('unavailable');
          $('#aar_10yr').html('unavailable');
          // $('#aar_incep').html(values[6]);
      }
    );
//    serverCall.always(
//      function (jqXHR, textStatus) {
//      }
//    );
}

function getGrowthInception(fund) {
  Highcharts.chart('growthInception', {
    credits: { enabled: false },
    chart: {
      type: 'line'
    },
    title: {
      text: 'Growth of $100 since Inception'
    },
    data: {
      csvURL: 'https://www.tsp.gov/components/CORS/getFundGrowthInflation.html?fund='+fund
    },
    yAxis: {
      labels: {
        formatter: function() {
          return '$' + this.value;
        }
      }
    },
    tooltip: {
      shared: true
    }
  });
}
