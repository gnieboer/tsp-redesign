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
    var contributionLimit = getContributionLimit(+reviewYear);
    $('#deferral-limit').html(CurrencyFormatted(contributionLimit, 'no_cent'));
    return true;
}
panelExit[{{ panelID }}] = function(panel) {
    return true;
}

/*
function get_pay_freq(paySchedule) {
  if (paySchedule == 'Biweekly')      return 26.0;
  if (paySchedule == 'Weekly')        return 52.0;
  if (paySchedule == 'Semimonthly')  return 24.0;
  if (paySchedule == 'Monthly')       return 12.0;
  return 1.0;
}

// Calculate how much FERS will match users contrib
function FERSmatch(matchPercent) {
  if (matchPercent <= 0.00) { return 0.01; }

  if (matchPercent >= 0.05) { return matchPercent + 0.05; }

  if (matchPercent <= 0.03) { return matchPercent * 2 + 0.01; }

  // all that's left is between 3% and 5%
  return (matchPercent - 0.03) * 1.5 + 0.07;
}

// Calculate how much USBRS will match users contrib
function USBRSmatch(years, months, matchPercent) {
  if (years > 26) { return matchPercent; }
  if ((years <= 1) && (months <= 2)) { return matchPercent; }
  if (years <= 2) { return FERSmatch(0.0) + matchPercent; }
  return FERSmatch(matchPercent);
}

// alert('functions done');

var accountBalance = new Array();
var accountGrowth = new Array();
var contributions = new Array();
var contributionGrowth = new Array();
var total = new Array();
var salary = new Array();

// These variables hold values used in the calculations
var agency = 'agency';
var isMatching = false;
var rs = 'FERS';
var contributionsText = 'Contributions';
if ((rs == 'FERS') || (rs == 'USBRS')) {
  contributionsText = 'Contributions*';
  isMatching = true;
  if (rs == 'USBRS') { agency = 'service'; }
}
var matchFootnoteChart = '*Includes any '+agency+'<BR>&nbsp;&nbsp;contributions';
var matchFootnoteTable = '*Includes any '+agency+' contributions';

var amountToUse = parseInt(0);
var yearsToContribute = parseInt(0);
var DIEMSdate = '';
var matchDelay = 0;
if (Date.parse(DIEMSdate) < Date.parse('01/01/2018')) { matchDelay = 2; }
var annualPay = parseInt(0);
var paySchedule = 'Select';
var annualPayPercent = parseFloat(0);
var annualPayIncreasePercent = parseFloat(0);
var yearsToGo = parseInt(0);
var yearsServed = parseInt(0);
var catchupAmount = parseInt(0);
var rateOfReturn = parseFloat(0);

var growthSelector = 'growthBoth';
if (rs == 'BP') { growthSelector = 'balanceOnly'; }
if (growthSelector == 'futureOnly') { amountToUse = 0; }
if (growthSelector == 'balanceOnly') { yearsToContribute = 0; }
// alert(growthSelector);

// loop control
var periodLength = get_pay_freq(paySchedule);
if (rs == 'US') { periodLength = 12.0; }
if (rs == 'USBRS') { periodLength = 12.0; }
if (rs == 'BP') { periodLength = 1.0; }
var period = 0;
var year = 0;
var returnRate = rateOfReturn / 100.0;
// returnRate = returnRate/periodLength;
// alert(returnRate/periodLength);
returnRate = Math.pow(1 + returnRate, 1.0 / periodLength) - 1.0;
// alert(returnRate);

var annualPayRate = annualPayPercent / 100.0;
if (rs == 'FERS') { annualPayRate = FERSmatch(annualPayRate); }
if (rs == 'BP') { yearsToContribute = 0; }
// annualPayRate = annualPayRate / periodLength;
var annualPayIncreaseRate = (annualPayIncreasePercent) / 100.0 + 1.00;
// deal with rounding of catchup
var catchupPaycheck = parseInt(catchupAmount / periodLength * 100.0) / 100.0;
var catchupCatchup = parseInt(100 * parseFloat(catchupAmount - parseFloat(catchupPaycheck) * periodLength).toFixed(2));

// alert(catchupPaycheck + '  ' + catchupCatchup);

// yearly loop
var  tablestr = "<br>\n<table class='tspStandard paycheck-estimator-table' width=100% cellspacing=5>\n";
  tablestr += "<tr  align=center>\n";
  tablestr += "<td class='subHeading bold' style='text-align:center; border-right:1px solid #A0A0A0;'>Year</td>";
  // tablestr += "<td class='subHeading bold' style='text-align:center; border-right:1px solid #A0A0A0;'>Salary</td>";
  tablestr += "<td class='subHeading bold' style='text-align:right'>Existing Balance</td>";
  tablestr += "<td class='subHeading bold' style='text-align:right; border-right:1px solid #A0A0A0;'>Account Balance Growth</td>";
  if (rs != "BP") {
    tablestr += "<td class='subHeading bold' style='text-align:right'>" + contributionsText + "</td>";
    tablestr += "<td class='subHeading bold' style='text-align:right; border-right:1px solid #A0A0A0;'>Contribution Growth</td>";
  }
  tablestr += "<td class='subHeading bold' style='text-align:right'>Total Projected Balance</td>";
  tablestr += "</tr>\n";
var rowclass = 'evenRow';

accountBalance[year] = amountToUse;
accountGrowth[year] = 0.0;
contributions[year] = 0.0;
contributionGrowth[year] = 0.0;
total[year] = accountBalance[year] + accountGrowth[year] + contributions[year] + contributionGrowth[year];
salary[year] = parseFloat((annualPay / periodLength).toFixed(2));
salary[year+1] = salary[year];

if (rowclass == 'evenRow') { rowclass = 'oddRow'; } else { rowclass = 'evenRow'; }
  tablestr += "<tr class='" + rowclass + "'>\n";
  tablestr += "<td class='packed'  style='text-align:center; border-right:1px solid #A0A0A0;'>" + year + "</td>";
  // tablestr += "<td class='packed roth-padding' style='border-right:1px solid #A0A0A0;'>" + CurrencyFormatted(salary[year]) + "</td>";
  tablestr += "<td class='packed'>" + CurrencyFormatted(accountBalance[year]) + "</td>";
  tablestr += "<td class='packed roth-padding' style='border-right:1px solid #A0A0A0;'>" + CurrencyFormatted(accountGrowth[year]) + "</td>";
  if (rs != "BP") {
    tablestr += "<td class='packed'>" + CurrencyFormatted(contributions[year]) + "</td>";
    tablestr += "<td class='packed roth-padding' style='border-right:1px solid #A0A0A0;'>" + CurrencyFormatted(contributionGrowth[year]) + "</td>";
  }
  tablestr += "<td class='packed'>" + CurrencyFormatted(total[year]) + "</td>";
  tablestr += "</tr>\n";

for (year = 1; year <= yearsToGo; year++) {
  accountBalance[year] = amountToUse;
  accountGrowth[year] = accountGrowth[year-1];
  contributions[year] = contributions[year-1];
  contributionGrowth[year] = contributionGrowth[year-1];
  if (year > 1) { salary[year] = parseFloat((salary[year-1] * annualPayIncreaseRate).toFixed(2)); }
  for (period = 1; period <= periodLength; period++) {
    contributionGrowth[year] += parseFloat(((contributions[year] + contributionGrowth[year]) * returnRate).toFixed(2));
    if (year <= yearsToContribute) {
// console.log(yearsServed, year, period, yearsToContribute);
      if (rs == 'USBRS') {
// console.log(year, period, annualPayRate, salary[year]*annualPayRate, parseFloat(salary[year] * USBRSmatch(year+yearsServed, period, annualPayRate).toFixed(2)), catchupPaycheck);
        contributions[year] += parseFloat((salary[year] * USBRSmatch(year+yearsServed+matchDelay, period, annualPayRate)).toFixed(2));
      } else {
        contributions[year] += parseFloat((salary[year] * annualPayRate).toFixed(2));
      }
      contributions[year] += parseFloat(catchupPaycheck);
      if (period <= catchupCatchup) { contributions[year] += 0.01; }
    }
  }
  accountGrowth[year] += parseFloat(((accountBalance[year-1] + accountGrowth[year-1]) * (rateOfReturn / 100.0)).toFixed(2));

  total[year] = accountBalance[year] + accountGrowth[year] + contributions[year] + contributionGrowth[year];

  if (rowclass == 'evenRow') { rowclass = 'oddRow'; } else { rowclass = 'evenRow'; }
    tablestr += "<tr class='" + rowclass + "'>\n";
    tablestr += "<td class='packed'  style='text-align:center; border-right:1px solid #A0A0A0;'>" + year + "</td>";
    // tablestr += "<td class='packed roth-padding' style='border-right:1px solid #A0A0A0;'>" + CurrencyFormatted(salary[year]*periodLength) + "</td>";
    tablestr += "<td class='packed'>" + CurrencyFormatted(accountBalance[year]) + "</td>";
    tablestr += "<td class='packed roth-padding' style='border-right:1px solid #A0A0A0;'>" + CurrencyFormatted(accountGrowth[year]) + "</td>";
    if (rs != "BP") {
      tablestr += "<td class='packed'>" + CurrencyFormatted(contributions[year]) + "</td>";
      tablestr += "<td class='packed roth-padding' style='border-right:1px solid #A0A0A0;'>" + CurrencyFormatted(contributionGrowth[year]) + "</td>";
    }
    tablestr += "<td class='packed'>" + CurrencyFormatted(total[year]) + "</td>";
    tablestr += "</tr>\n";
}

tablestr += "</table>\n";
if (isMatching) { tablestr += matchFootnoteTable; }
$('#thetable').html(tablestr);

var defdot = { symbol: 'circle', radius: 0.1 };
var defcircle = { symbol: 'circle', radius: 2.4 };
var defdiamond = { symbol: 'diamond', radius: 2.6 };

// the color names below are not HTML defined names, just a close name to identify what is on the screen
var colorContributions = '#9C1B9C';
var colorContributionsGrowth = '#C679DD';
var colorBalance = '#EA6A17';
var colorBalanceGrowth = '#F4B55B';

var chart;

function dataBoth() {
  return [
      { name: 'Contributions Growth',   legendIndex: 1, marker: defcircle, color: colorContributionsGrowth, data: contributionGrowth },
      { name: contributionsText,                legendIndex: 2, marker: defcircle, color: colorContributions, data: contributions },
      { name: 'Account Balance Growth',         legendIndex: 3, marker: defcircle, color: colorBalanceGrowth, data: accountGrowth },
      { name: 'Existing Balance',               legendIndex: 4, marker: defcircle, color: colorBalance, data: accountBalance }
    ];
}
function dataFuture() {
  return [
      { name: 'Contributions Growth',   legendIndex: 1, marker: defcircle, color: colorContributionsGrowth, data: contributionGrowth },
      { name: contributionsText,                legendIndex: 2, marker: defcircle, color: colorContributions, data: contributions }
    ];
}
function dataBalance() {
    return [
      { name: 'Account Growth',         legendIndex: 1, marker: defcircle, color: colorBalanceGrowth, data: accountGrowth },
      { name: 'Existing Balance&nbsp;&nbsp;&nbsp;',             legendIndex: 2, marker: defcircle, color: colorBalance, data: accountBalance }
    ];
}

function makeChart(tickInterval, rs, gs) {
  if(typeof(tickInterval)==='undefined') tickInterval = 5;
  var plotdata = dataBoth();
  if (gs == 'futureOnly') { plotdata = dataFuture(); }
  if (gs == 'balanceOnly') { plotdata = dataBalance(); }
  if (rs == 'BP') { plotdata = dataBalance(); }

  return  new Highcharts.Chart({
    credits: { enabled: false },
    chart: {
      renderTo: 'chartResult',
      type: 'area'
    },
    legend: {
      enabled: true,
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'top',
      useHTML: true,
      margin: 8,
          x: -3,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
      borderColor: '#CCC',
      symbolWidth: 10,
      symbolPadding: 3,
      shadow: false
    },
    title: {
//      x: -40,
//      margin: 30,
//      text: 'Projected Savings Growth'
      text: ''
    },
//    subtitle: { text: 'Subtitle' },
    xAxis: {
      tickInterval: tickInterval,
      tickmarkPlacement: 'on',
      title: { text: 'Years' }
    },
    yAxis: {
      title: { text: '' },
      labels: {
        formatter: function() {
          return CurrencyFormatted(this.value, 'no_cent')
        }
      }
    },
    tooltip: {
      // valueSuffix: ' millions',
      useHTML: true,
      borderColor: '#aaaaaa',
      crosshairs: true,
      positioner: function (boxWidth, boxHeight, point) {
        var x = point.plotX;
        if (point.plotX > 350) { x = 350; }
        var y = point.plotY;
        if (point.plotY > 225) { y = 225; }
        return { x: x, y: y };
      },
      formatter: function() {
        var yValues = new Array();
        var output = '<table>' + '<tr><td><strong>Year ' + this.x + '</strong>:</td></tr>';
        // output += '<tr><td>&nbsp;</td></tr>';
        var j = 0;
        for (j=chart.series.length-1; j>=0; j--) {
          if ((chart.series[j].visible) && (chart.series[j].data.length > this.x)) {
              output += '<tr align=right>';
              output += '<td align=left>' + chart.series[j].name + ':</td><td><strong>';
              output += CurrencyFormatted(chart.series[j].data[this.x].y) + '</strong></td>';
              yValues.push(chart.series[j].data[this.x].y);
              output += '</tr>';
          }
        }
        output += '<tr><td colspan=2><hr></td></tr>';
        output += '<tr><td>Total Projected Balance: &nbsp;&nbsp;&nbsp;</td><td><strong>' + CurrencyFormatted(total[this.x]) + '</strong></td></tr>';
        output += '</table>';
        return output;
      },
//      formatter: function() {
//      return CurrencyFormatted(this.y, 'no_cent')
//      },
      shared: true
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        events: { legendItemClick: function () { return false; } }      // disable disabling of plot items
      }
    },
    series: plotdata
  });
}

$("#rateDiv").html(rateOfReturn.toFixed(2));
$("#accountExisting").html(CurrencyFormatted(accountBalance[yearsToGo]));
$("#growthExisting").html(CurrencyFormatted(accountGrowth[yearsToGo]));
$("#contribFuture").html(CurrencyFormatted(contributions[yearsToGo]));
$("#contribFutureGrowth").html(CurrencyFormatted(contributionGrowth[yearsToGo]));
$("#totalBalance").html('<strong>' + CurrencyFormatted(total[yearsToGo]) + '</strong>');

if (growthSelector == 'futureOnly') {
  $("#accountExisting").html('');
  $("#growthExisting").html('');
  $('#AccountBalanceResult1').addClass("deemphasis");
  $('#AccountBalanceResult2').addClass("deemphasis");
}
if (growthSelector == 'balanceOnly') {
  $("#contribFuture").html('');
  $("#contribFutureGrowth").html('');
  $('#FutureContributionsResult1').addClass("deemphasis");
  $('#FutureContributionsResult2').addClass("deemphasis");
}

function doReport() {
  var pageUrl = "howSavingsGrowReport.html" + window.location.search;
  openWindow(pageUrl, 750, 600);
}

var text = 'Includes any agency<BR>contributions';
*/
-->
</script>
