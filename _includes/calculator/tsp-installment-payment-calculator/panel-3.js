{% comment %}
This is the javascript specific to panel 3.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
  return true;
};

panelEnter[{{ panelID }}] = function(panel) {
    // calculate and set values here
    // $('#account-depleted').html(CurrencyFormatted(contributionLimit, 'no_cent'));
    return true;
}
panelExit[{{ panelID }}] = function(panel) {
    return true;
}

var defdot = { symbol: 'circle', radius: 0.1 };
var defcircle = { symbol: 'circle', radius: 2.4 };
var defdiamond = { symbol: 'diamond', radius: 2.6 };

// the color names below are not HTML defined names, just a close name to identify what is on the screen
var colorSubBlue = '#4572A7';
var colorSubRed = '#AA4643';
var colorSubGreen = '#89A54E';
var colorSubPurple = '#80699B';
var colorSubCyan = '#3D96AE';
var colorSubOrange = '#DB843D';
var colorSubSkyBlue = '#92A8CD';
var colorSubBrown = '#A47D7C';

function runCalc1(frequency) {

  /* Calculate Coordinates */
  var line1 = [];
  var lineFDbal = [];

  var tableRows = "";
  var evenrow = false;
  var RMDflag = '*';
  var arr_length = rates_ages.length;
  for (var i=0; i<arr_length; i++) {
    if (i < payments_bal_FD.length) { lineFDbal.push([rates_ages[i], payments_bal_FD[i]]); }
    if (i < payments_Amt.length) { line1.push([rates_ages[i], payments_Amt[i]]); }
  }
  var age = AgeDepleted;
  if (monthsRemainder >= 12) { age++; }
  var cit = '**';
  var half = arr_length / 2;
  for (var i=0; i<half; i++) {
    if (evenrow) {
      evenrow = false;
      tableRows += '<tr class="evenRow">';
    } else {
      evenrow = true;
      tableRows += '<tr class="oddRow">';
    }

    if (payments_RMD[i] > 0) {
      // RMDflag = "<span width=15px title='RMD: " + CurrencyFormatted(payments_RMD[i]) + "'>*</span>";
      RMDflag = "*";
    } else {
      // RMDflag = "<span width=15px " + CurrencyFormatted(payments_RMD[i]) + ">&nbsp;</span>";
      RMDflag = "&nbsp;";
    }
    if (i < arr_length) {
      if ((i+1) == age) { cit = '**'; } else { cit = ''; }
      tableRows += '<td class="packed">' + rates_ages[i] + '</td>'
        + '<td class="packed ">' + CurrencyFormatted(payments_Amt[i]) + cit + '</td>'
        + '<td class="packed ">' + CurrencyFormatted(payments_bal_FD[i]) + RMDflag + '</td>';
      if ((i+half+1) == age) { cit = '**'; } else { cit = ''; }
      tableRows += '<td class="packed leftBorder">' + rates_ages[i+half] + '</td>'
        + '<td class="packed">' + CurrencyFormatted(payments_Amt[i+half]) + cit + '</td>'
        + '<td class="packed ">' + CurrencyFormatted(payments_bal_FD[i+half]) + RMDflag + '</td>';
    }
  }

  /* Chart Drawing */
  chart = new Highcharts.Chart({
//    chart: { renderTo: 'chartDiv', defaultSeriesType: 'line', marginTop: 30, marginRight: 230, marginBottom: 50 },
    chart: { renderTo: 'chartDiv', defaultSeriesType: 'area', marginRight: 27 }, // , borderWidth: 2 },
    title: { text: null },
//    title: { text: 'Projected Year-End Balances', x: -20, y: 5, margin: 30 },
//    subtitle: { text: 'Results Based on Requested Installment Payment Amounts', x: -20, y: 25 },
    credits: { enabled: false },
    xAxis: {
      title: { text: 'Payment Year' },
      labels: {
      min: 0,
      max: 40,
        formatter: function() {
          return this.value;
        }
      },
      maxPadding: 0.05,
      minRange: 0.01,
      showLastLabel: true,
      plotLines: [{value: 110, color: '#777777', width: 1, id: 'ageToLiveLine', label: { y:-5, text: '110', rotation: 0, style: { fontWeight: 'bold'} }}]
    },
    yAxis: {
      title: { text: 'Year-End Balance' },
      labels: {
        formatter: function() {
          return CurrencyFormatted(this.value, 'no_cent');
        }
      },
      minRange: 0.01,
      min: 0,
      plotLines: [{ value: 0, width: 1, color: '#808080' }]
    },
    tooltip: {
      useHTML: true,
      borderColor: '#aaaaaa',
      shared: true,
      followPointer: true,
      crosshairs: true,
      style: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        shadow: true,
        fontSize: '11px'
      },
      formatter: function() {
        chart.xAxis[0].removePlotLine('tmpline');
        var age = AgeDepleted;
        if (monthsRemainder >= 12) { age++; }
        var idx = this.x - rates_ages[0];
        var output = '<table><tr><td><strong>Year ' + this.x + '</strong>:</td></tr>';
        var installmentPayments = false;
        var cit = '';
        if (this.x <= age) { installmentPayments = true; }
        if (this.x == age) { cit = '**'; }
        if (installmentPayments) {
          output += '<tr><td>With ' + frequency + ' payments of:</td><td align=right><strong>  '
                        + CurrencyFormatted(payments_Amt[0]) + cit + '</strong></td></tr>';
        }
        var j = 0;
        for (j=0; j<chart.series.length; j++) {
          if ((chart.series[j].visible) && (chart.series[j].data.length > idx)) {
            if (chart.series[j].data[idx]) {
              output += '<tr align=right>';
              output += '<td align=left>' + chart.series[j].name + ':</td><td align=right><strong>  ';
              output += CurrencyFormatted(chart.series[j].data[idx].y) + '</strong></td>';
              output += '</tr>';
            }
          }
        }
        output += '</table>';
        chart.xAxis[0].addPlotLine({value: this.x, color: '#777777', width: 1, id: 'tmpline', label: { y:12, text: this.x, rotation: 0, style: { fontWeight: 'bold'}}});
        return output;
      }
    },
    legend: { enabled: false },
//    legend: { layout: 'vertical', align: 'right', verticalAlign: 'top', x:5, y:26, borderWidth: 0 },
    series: [{
      name: 'Year-End Balance', marker: defcircle, color: colorSubGreen, data: lineFDbal, showInLegend: false, visible: true }, {
      name: 'Installment Payment (Fixed Dollar)', marker: defcircle, color: colorSubGreen, data: line1, visible: false }]
  });

  /* Table Writing */
  var choice = frequency.charAt(0).toUpperCase() + frequency.slice(1);
  if (choice == 'Annually') { choice = 'Annual'; }
  var strHeader = '  <table class="tspStandard"><tr class="headingRow">'
        + '  <th class="packed normalWhiteSpace " style="white-space: normal;">Year</th>'
        + '  <th class="packed normalWhiteSpace " style="white-space: normal;">'+choice+' Payment</th>'
        + '  <th class="packed normalWhiteSpace" style="white-space: normal;">Year-End Balance</th>'
        + '  <th class="packed normalWhiteSpace leftBorder">Year</th>'
        + '  <th class="packed normalWhiteSpace " style="white-space: normal;">'+choice+' Payment</th>'
        + '  <th class="packed normalWhiteSpace" style="white-space: normal;">Year-End Balance</th>'

        + tableRows + '</tr></table>';
  $('#resultTableHolder').html(strHeader);
}

function viewDetailReport(reportNum) {

  var pageUrl = "retirementCalculatorReport.shtml?tabNumber=" + reportNum;
  var qString = buildQueryString();
  pageUrl += '&' + qString;
  openWindow(pageUrl, 775, 600);
}
-->
</script>
