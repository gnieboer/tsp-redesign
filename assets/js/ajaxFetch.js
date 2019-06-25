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
          console.log(rc[1], setName);
          if (setName == 'Index') { $('#index-as-of').html(' as of ' + rc[2]); }
          if (setName == 'Lfunds') { $('#l-fund-as-of').html(' as of ' + rc[2]); }
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
      align: 'left',
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
  var colorIndex = 'il';

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
    legend: { enabled: false },
    title: {
      // text: 'Average Rates of Return' + '   <span class="hc-note">(As of December ' + year + ')</span>'
      align: 'left',
      text: 'Average Rates of Return'
    },
    data: {
      switchRowsAndColumns: true,
      beforeParse: function (csv) {
        var data = csv.split('|');
        setTitle(data[1]);
        buildReturnsTable(data[0]);
        return data[0];
      },
      csvURL: 'https://www.tsp.gov/components/CORS/getFundIndexAverageAnnualReturns.html?fund='+fund
    },
    series: [{ colorIndex: colorFund }, { colorIndex: colorIndex }],
    // exporting: { showTable: true },
    xAxis: {
          crosshair: true
    },
    yAxis: {
          // min: 0,
          title: { text: undefined },
      labels: { formatter: function() { return this.value + '%'; } }
    },
    tooltip: {
//          headerFormat: '<strong>{point.key}</strong><table>',
//          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//              '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
//          footerFormat: '</table>',
          formatter: function () {
            // console.log(this);
            returnsTableActive(this.x+1);
            return this.points.reduce(function (s, point) {
                return s + '<br/>' + point.series.name + ': ' +
                    point.y + 'm';
            }, '<b>' + this.points[0].key + '</b>');
          },
          shared: true,
          useHTML: true
    }
  });
}
function setTitle(year) {
	barChart.setTitle({text: 'Average Rates of Return' + '   <span class="hc-note">(As of December ' + year + ')</span>'});
}
function mapServerFundName (f) {
  var fund = f.trim().toUpperCase();
  if (fund == 'G') { return 'G Fund'; }
  if (fund == 'F') { return 'F Fund'; }
  if (fund == 'C') { return 'C Fund'; }
  if (fund == 'S') { return 'S Fund'; }
  if (fund == 'I') { return 'I Fund'; }

  if (fund == 'LINC') { return 'L Income'; }
  if (fund == 'L2020') { return 'L 2020'; }
  if (fund == 'L2025') { return 'L 2025'; }
  if (fund == 'L2030') { return 'L 2030'; }
  if (fund == 'L2035') { return 'L 2035'; }
  if (fund == 'L2040') { return 'L 2040'; }
  if (fund == 'L2045') { return 'L 2045'; }
  if (fund == 'L2050') { return 'L 2050'; }
  if (fund == 'L2055') { return 'L 2055'; }
  if (fund == 'L2060') { return 'L 2060'; }
  if (fund == 'L2065') { return 'L 2065'; }

  // if (fund == '') { return ''; } // G
  if (fund == 'LBA') { return 'U.S. Agg. Bond Index'; } // F
  if (fund == 'SP500') { return 'S&P 500 Index'; } // C
  if (fund == 'W4500') { return 'DJ U.S. Completion TSM Index'; } // S
  if (fund == 'EAFE') { return 'EAFE Index'; } // I
  return '** ' + fund + '**';
}
function mapServerFundClassName (f) {
  var fund = f.trim().toUpperCase();
  if (fund == 'G') { return 'g-fund'; }
  if (fund == 'F') { return 'f-fund'; }
  if (fund == 'C') { return 'c-fund'; }
  if (fund == 'S') { return 's-fund'; }
  if (fund == 'I') { return 'i-fund'; }

  if (fund == 'LINC') { return 'l-income'; }
  if (fund == 'LINCX') { return 'index-l'; }
  if (fund == 'L2020') { return 'l-2020'; }
  if (fund == 'L2025') { return 'l-2025'; }
  if (fund == 'L2030') { return 'l-2030'; }
  if (fund == 'L2035') { return 'l-2035'; }
  if (fund == 'L2040') { return 'l-2040'; }
  if (fund == 'L2045') { return 'l-2045'; }
  if (fund == 'L2050') { return 'l-2050'; }
  if (fund == 'L2055') { return 'l-2055'; }
  if (fund == 'L2060') { return 'l-2060'; }
  if (fund == 'L2065') { return 'l-2065'; }

  // if (fund == '') { return ''; } // G
  if (fund == 'LBA') { return 'index-f'; } // F
  if (fund == 'SP500') { return 'index-c'; } // C
  if (fund == 'W4500') { return 'index-s'; } // S
  if (fund == 'EAFE') { return 'index-i'; } // I
  return '** ' + fund + '**';
}
function buildReturnsTable(arr) {
  var headName = { YTD: 'YTD', '1-yr': '1&nbsp;Yrs', '3-yr': '3&nbsp;Yrs', '5-yr': '5&nbsp;Yrs', '10-yr': '10&nbsp;Yrs', Inception: 'Life'};
  var i, j;
  var table = '<table>';
  var lines = arr.split("\n");
  var cellClass = 'even';
  // header
  var col = lines[0].trim().split(',');
  table += '<tr><th></th>';
  cellClass = 'even';
  for (i = 1; i < col.length; i++) {
    table += '<th class="' + cellClass + ' col' + i + '">'+headName[col[i].trim()]+'</th>';
    if (cellClass == 'even') { cellClass = 'odd'; } else { cellClass = 'even'; }
  }
  table += "</tr>\n";
  for (j=1; j < lines.length; j++) {
    if (lines[j].trim() == '') { continue; }
    col = lines[j].split(',');
    table += '<tr>';
    cellClass = 'odd';
    var fundName = mapServerFundName(col[0].trim());
    console.log('fund is ' + col[0].trim());
    var fund = col[0].trim().toLowerCase();
    var fundColor = mapServerFundClassName(fund);
    if ((fund == 'linc') && (j > 1)) { fundColor = mapServerFundClassName('lincx'); }
    table += '<td class="' + cellClass + ' col' + '0' + '">'
        +'<span class="rate-of-return-bar '+fundColor+'"></span>'
        + fundName +'</td>';
    if (cellClass == 'even') { cellClass = 'odd'; } else { cellClass = 'even'; }
    for (i = 1; i < col.length; i++) {
      table += '<td class="' + cellClass + ' col' + i + '">'+col[i].trim()+'%</td>';
      if (cellClass == 'even') { cellClass = 'odd'; } else { cellClass = 'even'; }
    }
    table += "</tr>\n";
  }

 table += "\n</table>"
 // console.log(arr + "\n" + table);
 $('#annualReturnsTable').html(table);
}
function returnsTableActive(idx) {
    for (var i = 0; i < 8; i++) {
      $('.col'+i).removeClass('active');
    }
    $('.col'+idx).addClass('active');
}

function columnSort(ascending, columnClassName, tableId, tailLength) {
    var tbody = document.getElementById(tableId).getElementsByTagName(
            "tbody")[0];
    var rows = tbody.getElementsByTagName("tr");

    var unsorted = true;

    while (unsorted) {
        unsorted = false;

        for (var r = 0; r < rows.length - 1 - tailLength; r++) {
            var row = rows[r];
            var nextRow = rows[r + 1];

            var value = row.getElementsByClassName(columnClassName)[0].innerHTML;
            var nextValue = nextRow.getElementsByClassName(columnClassName)[0].innerHTML;

            value = value.replace(',', '.'); // in case a comma is used in float number
            nextValue = nextValue.replace(',', '.');
            value = value.replace('%', ''); // in case a comma is used in float number
            nextValue = nextValue.replace('%', '');

            if (!isNaN(value)) {
                value = parseFloat(value);
                nextValue = parseFloat(nextValue);
            }

            if (ascending ? value > nextValue : value < nextValue) {
                tbody.insertBefore(nextRow, row);
                unsorted = true;
            }
            // console.log(value, nextValue, unsorted);
        }
    }
};
