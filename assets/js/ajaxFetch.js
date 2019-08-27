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

function getMonthName (val) {
  var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
  return monthNames[val % 12];
}

function getMonthYearName (val) {
  var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
  var theDate = new Date(val);
  return monthNames[theDate.getMonth()] + ' ' + theDate.getFullYear();
}

function tooltipDiv (divClass, block) {
  return '<div class="' + divClass + '">'
    + block + '</div>';
}
function tooltipHeader(val) {
  return '<div class="tooltip-title"><strong>'+ val +'</strong>' + "</div>\n";
}
function tooltipRowGroup(group) {
  return  '<div class="tooltip-row-group">' + group + "</div>\n";
}
function tooltipLegendRow(legendColor, lClass, left, rClass, right) {
  return  '<div class="tooltip-row">'
        + '<div class="tooltip-bar '+legendColor+'"></div>'
        + tooltipLeftRight(lClass, left, rClass, right)
        + "</div>\n";
}
function tooltipRow(lClass, left, rClass, right) {
  return  '<div class="tooltip-row">'
        + tooltipLeftRight(lClass, left, rClass, right)
        + "</div>\n";
}
function tooltipLeftRight(lClass, left, rClass, right) {
  return  '<div class="'+lClass+' tooltip-left">'  + left  + '</div>'
        + '<div class="'+rClass+' tooltip-right">' + right + '</div>';
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
            //console.log(i, fundName, lines[i]);
            $('#ret-YTD-'+fundName).html(values[1]+'%');
            $('#ret-1YR-'+fundName).html(values[2]+'%');
            $('#ret-3YR-'+fundName).html(values[3]+'%');
            $('#ret-5YR-'+fundName).html(values[4]+'%');
            $('#ret-10YR-'+fundName).html(values[5]+'%');
            $('#ret-Life-'+fundName).html(values[6]+'%');
          }
          //console.log(rc[1], setName);
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

function growth100Tooltip(me) {
  // console.log(me);
  var rc = tooltipHeader(getMonthYearName(me.x+1000000000));
  rc = '';
  var points = me.points;
  for (var i = 0; i < points.length; i++) {
    var lColor = mapServerFundClassName(points[i].series.colorIndex);
    var name = points[i].series.name.split("$");
    var lName = mapServerFundName(name[0],0);
    rc += tooltipLegendRow(lColor, lColor, lName, '', '$' + points[i].y.toFixed(2));
  }
  rc = tooltipRowGroup(rc);
  rc = tooltipHeader(getMonthYearName(me.x+1000000000))+rc;
  rc = tooltipDiv('growth-100-tooltip', rc);
  // console.log(rc);
  return rc;
}
function getGrowthLifetime(fund) {
  var colorIndexFund = 'lf';
  var colorIndexInfl = 'gray';
  var colorIndexValues = 'white';

  if (fund == 'G') { colorIndexFund = 'g'; colorIndexInfl = 'gray'; }
  if (fund == 'F') { colorIndexFund = 'f'; colorIndexInfl = 'gray'; }
  if (fund == 'C') { colorIndexFund = 'c'; colorIndexInfl = 'gray'; }
  if (fund == 'S') { colorIndexFund = 's'; colorIndexInfl = 'gray'; }
  if (fund == 'I') { colorIndexFund = 'i'; colorIndexInfl = 'gray'; }

  Highcharts.chart('growthLifetime', {
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
      csvURL: 'https://www.tsp.gov/components/CORS/getFundGrowthInflation2.html?fund='+fund
    },
    // series: [{ colorIndex: colorIndexFund }, { colorIndex: colorIndexValues }, { colorIndex: colorIndexInfl }, { colorIndex: colorIndexValues }],
    series: [{ colorIndex: colorIndexFund }, { colorIndex: colorIndexInfl }],
    yAxis: {
      labels: {
        formatter: function() {
          return '$' + this.value;
        }
      },
      title: { text: '' }
    },
    tooltip: {
      formatter: function () {
        return growth100Tooltip(this);
      },
      shared: true,
      useHTML: true
    }
  });
}

var barChart;
function barChartTooltip(me) {
  // console.log(me);
  returnsTableActive(me.x+1);
  var rc = '';
  var points = me.points;
  for (var i = 0; i < points.length; i++) {
    var lColor = mapServerFundClassName(points[i].series.colorIndex);
    var lName = mapServerFundName(points[i].series.name,0);
    // rc += tooltipLegendRow(lColor, lColor, lName, '', points[i].y.toFixed(2)+'%');
    rc += tooltipLegendRow(lColor, '', lName, '', points[i].y.toFixed(2)+'%');
  }
  rc = tooltipRowGroup(rc);
  rc = tooltipHeader(me.points[0].key) + rc;
  rc = tooltipDiv('rates-of-return-tooltip', rc);
  // console.log(rc);
  return rc;
}
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
            return barChartTooltip(this);
          },
          shared: true,
          useHTML: true
    }
  });
}
function setTitle(year) {
	barChart.setTitle({text: 'Average Rates of Return' + '   <span class="hc-note">(As of December ' + year + ')</span>'});
}
function mapServerFundName (f, glossaryFlag) {
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
  if (fund == 'INFLATION') { return 'Inflation'; } // I

  if (fund == 'TBILL') { return glossaryTermString(fund, glossaryFlag); } // F
  if (fund == 'LBA') { return glossaryTermString(fund, glossaryFlag); } // F
  if (fund == 'SP500') { return glossaryTermString(fund, glossaryFlag); } // C
  if (fund == 'W4500') { return glossaryTermString(fund, glossaryFlag); } // S
  if (fund == 'EAFE') { return glossaryTermString(fund, glossaryFlag); } // I
  return '** ' + fund + ' **';
}
function glossaryTermString(fund, glossaryFlag) {
  var term = 'undefined';
  if (fund == 'TBILL') { term = '3-Month T-Bill'; } // G
  if (fund == 'LBA') { term = 'U.S. Aggregate Index'; } // F
  if (fund == 'SP500') { term = 'S&P 500'; } // C
  if (fund == 'W4500') { term = 'Dow Jones'; } // S
  if (fund == 'EAFE') { term = 'EAFE'; } // I
  if (glossaryFlag == 0) { return term; }
  return term;  // disable this for now
  return '<span data-term="'+term+'" class="js-glossary-toggle term term-end">'
        +term+'</span>';
}
function mapServerFundClassName (f) {
  var fund = f.trim().toUpperCase();
  if (fund == 'G') { return 'g-fund'; }
  if (fund == 'F') { return 'f-fund'; }
  if (fund == 'C') { return 'c-fund'; }
  if (fund == 'S') { return 's-fund'; }
  if (fund == 'I') { return 'i-fund'; }
  if (fund == 'LF') { return 'l-fund'; }

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

  if (fund == 'TBILL') { return 'index-g'; } // G
  if (fund == 'IG') { return 'index-g'; } // G
  if (fund == 'LBA') { return 'index-f'; } // F
  if (fund == 'IF') { return 'index-f'; } // F
  if (fund == 'SP500') { return 'index-c'; } // C
  if (fund == 'IC') { return 'index-c'; } // C
  if (fund == 'W4500') { return 'index-s'; } // S
  if (fund == 'IS') { return 'index-s'; } // S
  if (fund == 'EAFE') { return 'index-i'; } // I
  if (fund == 'II') { return 'index-i'; } // I
  if (fund == 'IL') { return 'index-l'; } // I

  if (fund == 'GRAY') { return 'inflation-color'; } // I
  return '** ' + fund + ' **';
}
function buildReturnsTable(arr) {
  var headName = { YTD: 'YTD', '1-yr': '1&nbsp;Yrs', '3-yr': '3&nbsp;Yrs', '5-yr': '5&nbsp;Yrs', '10-yr': '10&nbsp;Yrs', Lifetime: 'Lifetime'};
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
    var fundName = mapServerFundName(col[0].trim(),1);
    // console.log('fund is ' + col[0].trim());
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
//  initGlossary();
}
function returnsTableActive(idx) {
    for (var i = 0; i < 8; i++) {
      $('.col'+i).removeClass('active');
    }
    $('.col'+idx).addClass('active');
}
function columnSort(ascending, columnClassName, tableId, headLength, tailLength) {
    var tbody = document.getElementById(tableId).getElementsByTagName(
            "tbody")[0];
    var rows = tbody.getElementsByTagName("tr");

    var unsorted = true;

    while (unsorted) {
        unsorted = false;

        for (var r = 0 + headLength; r < rows.length - 1 - tailLength; r++) {
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

function sharePriceDownloadString(startdate, enddate, funds) {
  var str = siteName + 'getSharePrices.html?';
  str += 'startdate='+startdate;
  str += '&enddate='+enddate;
  funds.forEach(function(fund) { str += '&'+fund+'=1'; });
  return str;
}

// make call to get shareprices
function doSharePriceDownload(startdate, enddate, format, funds) {
  var url = sharePriceDownloadString(startdate, enddate, funds);
  url += '&format='+format+'&download=1';
  //console.log(url);
  window.location.href = url;
  //window.open(url, '_blank');
  return false;
}

var doAjaxRetrieve = function(divName, url) {
  $('#'+divName).html('Calling server for data...');
  var serverCall = $.get(url);
  serverCall.done(
    function (data) {
        $('#'+divName).html(data);
    }
  );
  serverCall.fail(
    function (jqXHR, textStatus, errorThrown) {
        var errMsg = textStatus + ': ' + errorThrown;
        var userMsg = "<p>Hmmm, something isn’t working. Please try again in a few minutes."
          + " If the problem persists you can call the ThriftLine for assistance at "
          + "<span class='nobr'>1-877-968-3778</span>.</p>";
        $('#'+divName).html(userMsg);
    }
  );
}

function returnsAllTooltip(me) {
  var rc = tooltipHeader(getMonthYearName(me.x+1000000000));
  rc = '';
  var points = me.points;
  for (var i = 0; i < points.length; i++) {
    var lColor = mapServerFundClassName(points[i].series.colorIndex);
    var name = points[i].series.name.split("$");
    var lName = name[0]; mapServerFundName(name[0],0);
    // rc += tooltipLegendRow(lColor, lColor+' outline', lName, '', points[i].y.toFixed(2)+'%');
    rc += tooltipLegendRow(lColor, '', lName, '', points[i].y.toFixed(2)+'%');
  }
  rc = tooltipRowGroup(rc);
  return rc;
}
function annualReturnsAllTooltip(me) {
  // console.log(me);
  var rc = returnsAllTooltip(me);
  // rc = tooltipHeader(getMonthYearName(me.x+1000000000))+rc;
  var title = 'Annual Returns ';
  if ((me.x + 1) > me.points[0].series.xAxis.max) { title = 'YTD Returns '}
  rc = tooltipHeader(title+me.x)+rc;
  rc = tooltipDiv('growth-100-tooltip', rc);
  // console.log(rc);
  return rc;
}
function monthlyReturnsAllTooltip(me) {
  // console.log(me);
  var rc = returnsAllTooltip(me);
  // rc = tooltipHeader(getMonthYearName(me.x+1000000000))+rc;
  var title = 'Monthly Returns ';
  if ((me.x + 1) > me.points[0].series.xAxis.max) { title = 'YTD Returns '}
  rc = tooltipHeader(getMonthYearName(me.x+1000000000))+rc;
  rc = tooltipDiv('growth-100-tooltip', rc);
  // console.log(rc);
  return rc;
}
function getSeriesID(name, chart) {
  var chart = $('#'+chart).highcharts();
  if (chart == null) { return; }
  var series = chart.series;
  for (var i = 0; i < series.length; i++) {
    if (series[i].name == name) { return i; }
  }
  return -1;
}
function checkAnnualReturnsGroup() {
  var flag = true;
  var lf = ['L___Income', 'L___2020', 'L___2030', 'L___2040', 'L___2050'];
  lf.forEach(function(id) { flag &= $('#'+id).prop('checked') });
  $('#Lfunds').prop('checked', flag);
  flag = true;
  var idv = ['G___Fund', 'F___Fund', 'C___Fund', 'S___Fund', 'I___Fund'];
  idv.forEach(function(id) { flag &= $('#'+id).prop('checked'); });
  $('#InvFunds').prop('checked', flag);
}
function chartResize(chartName) {
  setInterval(function() { $('#'+chartName).highcharts().reflow(); }, 50);
  return false;
}

function parseEmptyData(columns) {
  var newColumns = [];
  Highcharts.each(columns, function(c, j) {
    newColumns.push([]);
    Highcharts.each(c, function(p, i) {
      //console.log('p = |'+p+'|');
      newColumns[j].push(parseFloat(p) || null);
    })
  })
  return newColumns;
}
var deletedAlready = {};
function deleteEmptyPoints(chartName, me) {
  // console.log(me);
  if (chartName in deletedAlready) { return; }  // been there, done that already
  //deletedAlready[chartName] = 1;
  //console.log('delete called on '+chartName);
  var series = me.series;
  for (var s = 0; s < series.length; s++) {
    // console.log('series '+s+'  '+series[s].points);
    // console.log(series[s].data);
    for (var p = series[s].data.length-1; p >= 0; p--) {
      if (series[s].data[p].y == null)  { series[s].data[p].remove(false, false); } else { break; }
    }
    for (var p = 0; p < series[s].data.length; p++) {
      if (series[s].data[p].y == null)  { series[s].data[p].remove(false, false); } else { break; }
      //console.log(series[s].data[p]);
    }
  }
  // series[x].data[y].remove(true);
}
function getAnnualReturnsAll(chartName) {
  var me = Highcharts.chart(chartName, {
    credits: { enabled: false },
    chart: {
      type: 'line',
      styledMode: true,
      // events: { load: function(e) { setInterval(function() { $('#annualReturnsAll').highcharts().reflow(); }, 500); } }
      // events: { load: function() { deleteEmptyPoints(chartName, this); }}
    },
    title: {
      align: 'left',
      text: 'Annual Returns'
    },
    data: {
      beforeParse: function (csv) {
        var values = buildMonthlyReturnsAllTable(csv);
        // console.log('monthly: ', values[1]);
        // console.log('yearly: ', values[0]);
        getMonthlyReturnsAll(chartName+'-monthly', values[1]);
        return values[0];
      },
      csvURL: 'https://www.tsp.gov/components/CORS/getMonthlyReturnsSummary.html?Lfunds=1&IndexFunds=1&InvFunds=1'
    },
    plotOptions: {
      series: { events: {
        legendItemClick: function(e) {
          var i = e.target.index;
          legendItemClickedPairs(chartName, i);
          // this.xAxis.setExtremes();
          return false;
        }
      }}
    },
    responsive: {
      rules: [{
        condition: {
          minWidth: 500
        },
        chartOptions: {
          legend: {
            // labelFormatter: function() { return mapServerFundName (this.name, 0); },
            align: 'right', verticalAlign: 'top',
            layout: 'vertical', x: 0, y: 100
          },
        }
      }]
    },
    // series: [{ colorIndex: colorIndexFund }, { colorIndex: colorIndexValues }, { colorIndex: colorIndexInfl }, { colorIndex: colorIndexValues }],
    // series: [{ colorIndex: colorIndexFund }, { colorIndex: colorIndexInfl }],
    series: [{ colorIndex: 'lf' }, { colorIndex: 'lf' }, { colorIndex: 'lf' }, { colorIndex: 'lf' }, { colorIndex: 'lf' },
      { colorIndex: 'g' },
      { colorIndex: 'f' }, { colorIndex: 'if' },
      { colorIndex: 'c' }, { colorIndex: 'ic' },
      { colorIndex: 's' }, { colorIndex: 'is' },
      { colorIndex: 'i' }, { colorIndex: 'ii' }
    ],
    yAxis: {
      labels: {
        formatter: function() {
          return this.value + '%';
        }
      },
      title: { text: '' }
    },
    tooltip: {
      formatter: function () {
        return annualReturnsAllTooltip(this);
      },
      shared: true,
      useHTML: true
    }
  });
  // deleteEmptyPoints(chartName, me);
}
function getMonthlyReturnsAll(chartName, monthData) {
  // monthData = [100, 200, 300, 400];
  //console.log(monthData);
  //console.log('in getMonthlyReturnsAll');
  Highcharts.chart(chartName, {
    credits: { enabled: false },
    chart: {
      type: 'line',
      styledMode: true,
      // events: { load: function(e) { setInterval(function() { $('#annualReturnsAll').highcharts().reflow(); }, 500); } }
      // events: { load: function() { deleteEmptyPoints(chartName, this); }}
      // events: { render: function() { deleteEmptyPoints(chartName, this); }}
    },
    title: {
      align: 'left',
      text: 'Monthly Returns'
    },
    data: {
            csv: monthData,
            // parsed: function(columns) { this.columns = parseEmptyData(columns); }
          },
    plotOptions: {
      series: { events: {
        legendItemClick: function(e) {
          var i = e.target.index;
          legendItemClickedPairs(chartName, i);
          // this.xAxis.setExtremes();
          return false;
        }
      }}
    },
    responsive: {
      rules: [{
        condition: {
          minWidth: 500
        },
        chartOptions: {
          legend: {
            // labelFormatter: function() { return mapServerFundName (this.name, 0); },
            align: 'right', verticalAlign: 'top',
            layout: 'vertical', x: 0, y: 100
          },
        }
      }]
    },
    series: [{ colorIndex: 'lf' }, { colorIndex: 'lf' }, { colorIndex: 'lf' }, { colorIndex: 'lf' }, { colorIndex: 'lf' },
      { colorIndex: 'g' },
      { colorIndex: 'f' }, { colorIndex: 'if' },
      { colorIndex: 'c' }, { colorIndex: 'ic' },
      { colorIndex: 's' }, { colorIndex: 'is' },
      { colorIndex: 'i' }, { colorIndex: 'ii' }
    ],
    // series: [{ data: monthData }],
    yAxis: {
      labels: {
        formatter: function() {
          return this.value + '%';
        }
      },
      title: { text: '' }
    },
    tooltip: {
      formatter: function () {
        return monthlyReturnsAllTooltip(this);
      },
      shared: true,
      useHTML: true
    }
  });
}
function borderClass(fund) {
  if (fund.trim().substring(0,1).toLowerCase() == 'l') { return 'border-l-fund'; }
  if (fund.slice(-4).toLowerCase() == 'fund') { return 'border-'+fund.trim().substring(0,1).toLowerCase()+'-fund'; }
  // its an index fund
  if (fund.substring(0,4) == 'U.S.') { return 'border-index-f'; }
  if (fund.substring(0,4) == 'S&P ') { return 'border-index-c'; }
  if (fund.substring(0,4) == 'Dow ') { return 'border-index-s'; }
  if (fund.substring(0,4) == 'EAFE') { return 'border-index-i'; }
  return 'border-'+fund;
}


// for monthly and annual returns results
function buildMonthlyReturnsAllTableNew(arr) {
  var i, j;
  var lines = arr.split("\n");
  var yearLines = [];
  var monthLines = [];
  var lastLineType = 'x';

  var header = lines[0].trim().split(',');

  // first argument indicates type of line and is not data
  var lineType = col[0]; col.shift();
  var yearHead = lines[0];
  var monthHead = lines[0].replace('Year', 'Month');

  var YTD = ' YTD';
  for (j=lines.length-1; j > 0; j--) {
  // for (j=1; j < lines.length-1; j++) {
    if (lines[j].trim() == '') { continue; }
    col = lines[j].split(',');
    lineType = col[0]; col.shift();
    if (lineType == 'm') {
    } else {
    }
    lines[j] = col.join(',');
    if (lineType == 'm') { monthLines.push(lines[j]);  col[0] = monthName; }
      else { yearLines.push(lines[j]); }
    if (lineType != lastLineType) {
      // new tbody section
      table += tBodyClose;
      if (lineType == 'y') {
        rowID = col[0];  // year from above
        var myID = 'year_'+rowID;
        table += "  <tbody class='annual-returns'>\n";
        col[0] = "    <label id='"+myID+"_label' for='"+myID+"'>"+col[0]+YTD+"</label>\n";
        col[0] += "    <input type='checkbox' id='"+myID+"' onClick='toggleTableMonths(\""+myID+"\")' data-toggle='toggle'>\n";
        YTD='';
      } else {
        table += "  <tbody id='year_"+rowID+"_months' class='monthly-returns hide'>\n";
      }
      tBodyClose = "  </tbody>\n";
      lastLineType = lineType;
    }
    table += '<tr>';
    table += '      <th scope="row">'+col[0].trim()+'</th>';
    for (i = 1; i < col.length; i++) {
      if (col[i].trim() == '') {
        table += '      <td class="empty-table-cell col'+(i-1)+'"></td>';
      }else {
        table += '      <td class="col'+(i-1)+'">'+col[i].trim()+'%</td>';
      }
    }
    table += '</tr>';
  }
  table += "  </tbody>\n";
  table = sideScrollTable('  ', 'rates-of-returns', '', table, true);

  $('#annualReturnsAll-table').html(table);
  // return lines.join("\n");
  yearLines.reverse(); monthLines.reverse();
  yearLines.unshift(yearHead); monthLines.unshift(monthHead);
  return [yearLines.join("\n"), monthLines.join("\n")];
}

function buildAnnualReturnsAllTable(arr) {
  var i, j;
  var table = "<table>\n";
  var lines = arr.split("\n");
  table += "  <thead>\n";
  table += "    <tr>\n";
  var col = lines[0].trim().split(',');
  for (i = 0; i < col.length; i++) {
    if (i != 0) { col[i] = mapServerFundName (col[i], 0); }
    var border = borderClass(col[i]);
    table += '      <th scope="col" class="'+border+' col'+(i-1)+'">'+col[i].trim()+'</th>';
  }
  lines[0] = col.join(',');
  table += "    </tr>\n";
  table += "  </thead>\n";
  table += "  <tbody>\n";
  for (j=lines.length-1; j > 0; j--) {
    if (lines[j].trim() == '') { continue; }
    col = lines[j].split(',');
    table += '<tr>';
    table += '      <th>'+col[0].trim()+'</th>';
    for (i = 1; i < col.length; i++) {
      if (col[i].trim() == '') {
        table += '      <td class="empty-table-cell col'+(i-1)+'"></td>';
      }else {
        table += '      <td class="col'+(i-1)+'">'+col[i].trim()+'%</td>';
      }
    }
    table += '</tr>';
  }
  table += "  </tbody>\n";
  table += "</table>\n";

  $('#annualReturnsAll-table').html(table);
  return lines.join("\n");
}

function toggleTableWidth(chartName) {
  if ($('#'+chartName+'-section').hasClass('full-width')) {
    $('#'+chartName+'-section').removeClass('full-width');
    document.getElementById(chartName+'-button').innerHTML = "Expand table <i class='fal fa-expand-wide'></i>";
  } else {
    $('#'+chartName+'-section').addClass('full-width');
    document.getElementById(chartName+'-button').innerHTML = "Collapse table <i class='fal fa-compress-wide'></i>";
  }
  // window.redraw();
  return false;
}

function toggleTableMonths(rowID) {
  if ($('#'+rowID+'_label').hasClass('bounce')) {
    $('#'+rowID+'_label').removeClass('bounce');
    $('#'+rowID+'_months').addClass('hide');
  } else {
    $('#'+rowID+'_label').addClass('bounce');
    $('#'+rowID+'_months').removeClass('hide');
  }
  // window.redraw();
  return false;
}

function toggleChart(chartName) {
  if ($('#'+chartName+'-cb').hasClass('bounce')) {
    $('#'+chartName+'-cb').removeClass('bounce');
    $('#'+chartName+'').removeClass('hide');
  } else {
    $('#'+chartName+'-cb').addClass('bounce');
    $('#'+chartName+'').addClass('hide');
  }
  // window.redraw();
  return false;
}

// for monthly and annual returns results
function buildMonthlyReturnsAllTable(arr) {
  var i, j;
  var table = "";
  var lines = arr.split("\n");
  var yearLines = [];
  var monthLines = [];
  var lastLineType = 'x';
  var tBodyClose = '';
  var rowID = 'x';
  var monthName = '';
  table += "  <thead>\n";
  table += "    <tr>\n";
  var col = lines[0].trim().split(',');
  // first argument indicates type of line and is not data
  var lineType = col[0]; col.shift();
  for (i = 0; i < col.length; i++) {
    if (i != 0) { col[i] = mapServerFundName (col[i], 0); }
    var border = borderClass(col[i]);
    table += '      <th scope="col" class="'+border+' col'+(i-1)+'">'+col[i].trim()+'</th>';
  }
  table += "    </tr>\n";
  table += "  </thead>\n";
  lines[0] = col.join(',');
  // yearLines.push(lines[0]);
  // monthLines.push(lines[0].replace('Year', 'Month'));
  var yearHead = lines[0];
  var monthHead = lines[0].replace('Year', 'Month');
  table += "  <tbody>\n";
  var YTD = ' YTD';
  for (j=lines.length-1; j > 0; j--) {
  // for (j=1; j < lines.length-1; j++) {
    if (lines[j].trim() == '') { continue; }
    col = lines[j].split(',');
    lineType = col[0]; col.shift();
    if (lineType == 'm') {
      monthName = getMonthName(parseInt(col[0].substr(4, 2))-1);
      col[0] = monthName + ' ' + parseInt(col[0].substr(0, 4));
      // col[0] = getMonthName(parseInt(col[0].substr(4, 2))-1);
      // col[0] = col[0].substr(0,6);
    } else {
      col[0] = col[0].substr(0,4);
    }
    lines[j] = col.join(',');
    if (lineType == 'm') { monthLines.push(lines[j]);  col[0] = monthName; }
      else { yearLines.push(lines[j]); }
    if (lineType != lastLineType) {
      // new tbody section
      table += tBodyClose;
      if (lineType == 'y') {
        rowID = col[0];  // year from above
        var myID = 'year_'+rowID;
        table += "  <tbody class='annual-returns'>\n";
        col[0] = "    <label id='"+myID+"_label' for='"+myID+"'>"+col[0]+YTD+"</label>\n";
        col[0] += "    <input type='checkbox' id='"+myID+"' onClick='toggleTableMonths(\""+myID+"\")' data-toggle='toggle'>\n";
        YTD='';
      } else {
        table += "  <tbody id='year_"+rowID+"_months' class='monthly-returns hide'>\n";
      }
      tBodyClose = "  </tbody>\n";
      lastLineType = lineType;
    }
    table += '<tr>';
    table += '      <th scope="row">'+col[0].trim()+'</th>';
    for (i = 1; i < col.length; i++) {
      if (col[i].trim() == '') {
        table += '      <td class="empty-table-cell col'+(i-1)+'"></td>';
      }else {
        table += '      <td class="col'+(i-1)+'">'+col[i].trim()+'%</td>';
      }
    }
    table += '</tr>';
  }
  table += "  </tbody>\n";
  table = sideScrollTable('  ', 'rates-of-returns', '', table, true);

  $('#annualReturnsAll-table').html(table);
  // return lines.join("\n");
  yearLines.reverse(); monthLines.reverse();
  yearLines.unshift(yearHead); monthLines.unshift(monthHead);
  return [yearLines.join("\n"), monthLines.join("\n")];
}

// table-side-scroll building function
function sideScrollTable(prefix, xclass, id, tableContent, nl) {
  var myClass = '';
  var myID = '';
  var myNL = '';
  if (nl) { myNL = "\n";}
  if (xclass != '') { myClass = ' class="'+xclass+'"'; }
  if (id != '') { myID = ' id="'+id+'"'; }
  var rc =  prefix + '<table' + myID + myClass + '>' + myNL;
  rc += prefix + '  <colgroup><col class=“column-width”></colgroup>' + myNL;
  rc += tableContent;
  rc += prefix + '</table>' + myNL;
  return rc;
}
function sideScrollTH(prefix, scope, xclass, txt, nl) {
  var myClass = '';
  if (xclass != '') { myClass = ' class="'+xclass+'"'; }
  var rc = prefix + '<th scope="'+scope+'"' + myClass + '>' + txt + '</th>';
  if (nl) rc += "\n";
}
// tbody, tr, thead
function sideScrollWrapper(prefix, tag, id, xclass, content, nl) {
  var myID = '';
  var myID = '';
  var myClass = '';
  if (nl) { myNL = "\n";}
  if (xclass != '') { myClass = ' class="'+xclass+'"'; }
  if (id != '') { myID = ' id="'+id+'"'; }
  return    prefix + '  <'+tag+'>' + "\n"
          + coontent
          + prefix + '  </'+tag+'>' + "\n"
}
