/*
  All the ajax calls to the data source.
*/

var siteName = "https://www.tsp.gov/components/CORS/";

var singleFundData = function(fund) {

  var scriptName = 'getFundAverageAnnualReturns.html?fund=' + fund;
  var serverCall = $.get(siteName + '/' + scriptName);
    serverCall.done(
      function (data) {
          var rc = data.split("|");
          var values = rc[0].split(", ");
          // console.log('values length is ', values.length);
          if (values.length == 7) {
            $('#aar_caption').html("Average annual returns (as of December "+rc[1]+")");
            $('#aar_ytd').html(values[1]+'%');
            $('#aar_1yr').html(values[2]+'%');
            $('#aar_3yr').html(values[3]+'%');
            $('#aar_5yr').html(values[4]+'%');
            $('#aar_10yr').html(values[5]+'%');
            // $('#aar_incep').html(values[6]);
          }
          // console.log(name + ': ' + data);
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

// translate server fund names to names used on fund comparison page
function mapFundName (fund) {
  if (fund == 'Linc') { return 'l-income'; }
  if (fund.substring(0,1) == 'L') { return 'l-' + fund.substring(1,5); }
  return fund.toLowerCase() + '-fund';
}

var groupFundAnnualReturns = function(setName) {
  // fund comparison data
  var scriptName = '';
  if (setName == 'Index') { scriptName = 'getIndexAverageAnnualReturns.html'; }
  if (setName == 'Lfunds') { scriptName = 'getLfundsAverageAnnualReturns.html'; }
  if (scriptName == '') { return; }

  var serverCall = $.get(siteName + '/' + scriptName);
    serverCall.done(
      function (data) {
          var rc = data.split("|"); // strip trailing Year
          var lines = rc[0].split("\n"); // break into rows
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim() == '') { continue; }
            var values = lines[i].split(', ');
            var fundName = mapFundName(values[0]);
            console.log(i, fundName, lines[i]);
            $('#ret-YTD-'+fundName).html(values[1]+'%');
            $('#ret-1YR-'+fundName).html(values[2]+'%');
            $('#ret-3YR-'+fundName).html(values[3]+'%');
            $('#ret-5YR-'+fundName).html(values[4]+'%');
            $('#ret-10YR-'+fundName).html(values[5]+'%');
            $('#ret-Life-'+fundName).html(values[6]+'%');
          }
          // console.log(name + ': ' + data);
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
}

function getGrowthInception(fund) {
  var colorIndexFund = 'lf';
  var colorIndexInfl = 'gray';
  var colorIndexValues = 'white';

  if (fund == 'G') { colorIndexFund = 'g'; colorIndexInfl = 'gray'; }
  if (fund == 'F') { colorIndexFund = 'f'; colorIndexInfl = 'gray'; }
  if (fund == 'C') { colorIndexFund = 'c'; colorIndexInfl = 'gray'; }
  if (fund == 'S') { colorIndexFund = 's'; colorIndexInfl = 'gray'; }
  if (fund == 'I') { colorIndexFund = 'i'; colorIndexInfl = 'gray'; }

  Highcharts.chart('growthInception', {
    credits: { enabled: false },
    chart: {
      type: 'line',
      styledMode: true
    },
    title: {
      text: 'Growth of $100 since Inception'
    },
    data: {
      csvURL: 'https://www.tsp.gov/components/CORS/getFundGrowthInflation.html?fund='+fund
    },
    series: [{ colorIndex: colorIndexFund }, { colorIndex: colorIndexValues }, { colorIndex: colorIndexInfl }, { colorIndex: colorIndexValues }],
    yAxis: {
      labels: {
        formatter: function() {
          return '$' + this.value;
        }
      },
      title: { text: '' }
    },
    tooltip: {
      shared: true
    }
  });
}

var barChart;
function getFundIndexAverageAnnualReturns(fund) {
  var colorFund = 'lf';
  var colorIndex = 'gray';

  if (fund == 'G') { colorFund = 'g'; colorIndex = 'ig'; }
  if (fund == 'F') { colorFund = 'f'; colorIndex = 'if'; }
  if (fund == 'C') { colorFund = 'c'; colorIndex = 'ic'; }
  if (fund == 'S') { colorFund = 's'; colorIndex = 'is'; }
  if (fund == 'I') { colorFund = 'i'; colorIndex = 'ii'; }

  barChart = Highcharts.chart('annualReturnsColumn', {
    credits: { enabled: false },
    chart: {
      type: 'column',
      styledMode: true
    },
    title: {
      // text: 'Average Rates of Return' + '   <span class="hc-note">(As of December ' + year + ')</span>'
      text: 'Average Rates of Return'
    },
    data: {
      switchRowsAndColumns: true,
      beforeParse: function (csv) {
        var data = csv.split('|');
        setTitle(data[1]);
        return data[0];
      },
      csvURL: 'https://www.tsp.gov/components/CORS/getFundIndexAverageAnnualReturns.html?fund='+fund
    },
    series: [{ colorIndex: colorFund }, { colorIndex: colorIndex }],
    xAxis: {
          crosshair: true
    },
    yAxis: {
          // min: 0,
          title: { text: '% return' },
      labels: { formatter: function() { return this.value + '%'; } }
    },
    tooltip: {
          headerFormat: '<strong>{point.key}</strong><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
    }
  });
}
function setTitle(year) {
	barChart.setTitle({text: 'Average Rates of Return' + '   <span class="hc-note">(As of December ' + year + ')</span>'});
}
