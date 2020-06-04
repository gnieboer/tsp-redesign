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
    calculateResults();
    return true;
}
panelExit[{{ panelID }}] = function(panel) {
    return true;
}

function showData(choice) {
  if (choice == 'graph') {
    $('#resultSelectorGraph').prop('checked', true);
    $('#show-data-graph').removeClass('hide');
    $('#show-data-table').addClass('hide');
    return true;
  }
  if (choice == 'table') {
    $('#resultSelectorTable').prop('checked', true);
    $('#show-data-graph').addClass('hide');
    $('#show-data-table').removeClass('hide');
    return true;
  }
  $('#resultSelectorCombined').prop('checked', true);
  $('#show-data-graph').removeClass('hide');
  $('#show-data-table').removeClass('hide');
  return true;
}

// Calculate how much FERS will match users contrib (note: auto 1% is added elsewhere)
function FERSmatching(grossPay, total_contrib) {
  var grossPay1 = grossPay * 0.01;
  var grossPay3 = grossPay * 0.03;
  var grossPay5 = grossPay * 0.05;
  var contribPercent = total_contrib / grossPay;

  if (contribPercent <= 0.00) { return 0.0; }

  if (contribPercent >= 0.05) { return grossPay5 - grossPay1; }

  if (contribPercent <= 0.03) { return total_contrib; }

  // all that's left is between 3% and 5%
  var over3 = total_contrib - grossPay3;
  return grossPay3 + (0.5 * over3);
}

// Calculate how much USBRS will match users contrib (note: auto 1% is added elsewhere)
// same as FERS for now
function USBRSmatching(grossPay, total_contrib) {
  return FERSmatching(grossPay, total_contrib);
}

function calculateResults() {
/*
  return [val1, val2, trad_option1, roth_option1, trad_option2, roth_option2,
                catch_option1Trad, catch_option1Roth, catch_option2Trad, catch_option2Roth];
  return [val, grossPay, addHold, beforeHold, afterHold, monthTax1, monthTax2];
*/
  // get values
  var contribs = sumContributions();
  var amts = sumWithholding(contribs[2]+contribs[6], contribs[4]+contribs[8]);

  var grossPay = amts[1];
  var rs = getRetirementSystem();
  var trad1amt = contribs[2];
  var roth1amt = contribs[3];
  var catchTrad1amt = contribs[6];
  var catchRoth1amt = contribs[7];
  var trad2amt = contribs[4];
  var roth2amt = contribs[5];
  var catchTrad2amt = contribs[8];
  var catchRoth2amt = contribs[9];
  var monthTax1 = amts[5];
  var monthTax2 = amts[6];
  var additionalWithholding = amts[2];
  var beforeDeduction = amts[3];
  var afterDeduction = amts[4];
  var match_contrib1 = (trad1amt + roth1amt);
  var match_contrib2 = (trad2amt + roth2amt);
  var total_contrib1 = (trad1amt + catchTrad1amt + roth1amt + catchRoth1amt);
  var total_contrib2 = (trad2amt + catchTrad2amt + roth2amt + catchRoth2amt);
  var totalDeducted1 = beforeDeduction + afterDeduction + additionalWithholding + monthTax1 + total_contrib1;
  var totalDeducted2 = beforeDeduction + afterDeduction + additionalWithholding + monthTax2 + total_contrib2;
  var netPay1 = grossPay - totalDeducted1;
  var netPay2 = grossPay - totalDeducted2;
  var EMPauto = 0.0;
  var EMPmatch1 = 0.0;
  var EMPmatch2 = 0.0;
  if (rs == 'FERS') {
    EMPauto = grossPay * 0.01;
    EMPmatch1 = FERSmatching(grossPay, match_contrib1);
    EMPmatch2 = FERSmatching(grossPay, match_contrib2);
  }
  if (rs == 'USBRS') {
    EMPauto = grossPay * 0.01;
    EMPmatch1 = USBRSmatching(grossPay, match_contrib1);
    EMPmatch2 = USBRSmatching(grossPay, match_contrib2);
  }

  // set input values in results table1
  $('#grosspay1').html('<strong>' + CurrencyFormatted(grossPay) + '</strong>');
  $('#grosspay2').html('<strong>' + CurrencyFormatted(grossPay) + '</strong>');
  $('#trad1').html('-' + CurrencyFormatted(trad1amt));
  $('#trad2').html('-' + CurrencyFormatted(trad2amt));
  $('#roth1').html('-' + CurrencyFormatted(roth1amt));
  $('#roth2').html('-' + CurrencyFormatted(roth2amt));
  $('#tradCatchup1').html('-' + CurrencyFormatted(catchTrad1amt));
  $('#tradCatchup2').html('-' + CurrencyFormatted(catchTrad2amt));
  $('#rothCatchup1').html('-' + CurrencyFormatted(catchRoth1amt));
  $('#rothCatchup2').html('-' + CurrencyFormatted(catchRoth2amt));
  $('#federalTaxes1').html('-' + CurrencyFormatted(monthTax1));
  $('#federalTaxes2').html('-' + CurrencyFormatted(monthTax2));
  $('#addlFedTax1').html('-' + CurrencyFormatted(additionalWithholding));
  $('#addlFedTax2').html('-' + CurrencyFormatted(additionalWithholding));
  $('#otherTaxDeductions1').html('-' + CurrencyFormatted(beforeDeduction + afterDeduction));
  $('#otherTaxDeductions2').html('-' + CurrencyFormatted(beforeDeduction + afterDeduction));
  $('#totalDeduct1').html('<strong>-' + CurrencyFormatted(totalDeducted1) + '</strong>');
  $('#totalDeduct2').html('<strong>-' + CurrencyFormatted(totalDeducted2) + '</strong>');
  $('#netPay1').html('<strong>' + CurrencyFormatted(netPay1) + '</strong>');
  $('#netPay2').html('<strong>' + CurrencyFormatted(netPay2) + '</strong>');
  $('#totalContributions1').html(CurrencyFormatted(total_contrib1));
  $('#totalContributions2').html(CurrencyFormatted(total_contrib2));
  $('#agencyAutomatic1').html(CurrencyFormatted(EMPauto));
  $('#agencyAutomatic2').html(CurrencyFormatted(EMPauto));
  $('#agencyMatchingContributions1').html(CurrencyFormatted(EMPmatch1));
  $('#agencyMatchingContributions2').html(CurrencyFormatted(EMPmatch2));
  $('#TSPIncrease1').html('<strong>' + CurrencyFormatted(parseFloat(total_contrib1 +EMPauto + EMPmatch1)) + '</strong>');
  $('#TSPIncrease2').html('<strong>' + CurrencyFormatted(parseFloat(total_contrib2 + EMPauto + EMPmatch2)) + '</strong>');


  return true;

  // alert('growthbar12');
  growthbar12 = makeChart(goodMax(maxyear), maxyear);

  $('#option12year').val(39);
  $('#option12year').trigger('change');
  doZoom();

  showData(0);
  $('#showChart').attr("checked","checked");
  $('#showChart').trigger('change');

  $('#option12year').val(40);
  $('#option12year').trigger('change');
  doZoom();
}


function get_contrib(accountlc, option, grossPay) {
  var accountUc = accountlc.charAt(0).toUpperCase() + accountlc.slice(1);
  var accountAmt = 0;
// var tmp = accountlc+'_option'+option+'Percent';
// alert('0 ' + tmp + ' |' + $('#' + tmp).val() + '|');
  if ($(accountlc+'_option'+option).val() == 'percent') {
    accountAmt = ($(accountlc+'_option'+option+'Percent').val() / 100.0) * grossPay;
  } else {
    accountAmt = parseInt($(accountlc+'_option'+option+'Amount').val());
  }
  var catchAmt = parseInt($('#catch_option'+option+accountUc).val());

  return { accountAmt: accountAmt, catchAmt: catchAmt };
}


// alert('functions done');

  // These arrays hold the data that is plotted
  var grossPaycheck = new Array();
  var net1Paycheck = new Array();
  var net2Paycheck = new Array();

  var taxes1 = new Array();
  var taxes2 = new Array();
  var beforetaxes = new Array();
  var aftertaxes = new Array();

  var trad1Contribution = new Array();
  var roth1Contribution = new Array();
  var trad1Growth = new Array();
  var roth1Growth = new Array();

  var trad2Contribution = new Array();
  var trad2Growth = new Array();
  var roth2Contribution = new Array();
  var roth2Growth = new Array();

  // loop control
  var year = 0;
  var maxyear = 40;
  var paySchedule = $('#paySchedule').val();
  var maxpay_freq = get_pay_freq(paySchedule);
  var pay_freq = 0;

  // These variables hold values used in the calculations
  var rs = 'FERS';
  if ($('#FERS').attr('checked')) { rs = 'FERS'; }
  if ($('#CSRS').attr('checked')) { rs = 'CSRS'; }
  if ($('#US').attr('checked')) { rs = 'US'; }
  if ($('#USBRS').attr('checked')) { rs = 'USBRS'; }

  var rate = ($('#annualReturn').val() / 100 + 1);
  $('#rateDiv').html($('#annualReturn').val());

  var grossPay = parseInt($('#grossPay').val()) || 0;
  var fedAllowances = parseInt($('#fedAllowances').val()) || 0;
  var additionalWithholding = parseInt($('#additionalWithholding').val()) || 0;
  var beforeDeduction = parseInt($('#beforeDeduction').val()) || 0;
  var afterDeduction = parseInt($('#afterDeduction').val()) || 0;

  var trad1amt = parseFloat($('#trad_option1Amount').val()) || 0.0;
  if (trad_option1 == 'percent') { trad1amt = ((parseFloat($('#trad_option1Percent').val()) || 0.0) / 100.0) * grossPay; }
  var roth1amt = parseFloat($('#roth_option1Amount').val()) || 0.0;
  if (roth_option1 == 'percent') { roth1amt = ((parseFloat($('#roth_option1Percent').val()) || 0.0)/ 100.0) * grossPay; }
  var catchTrad1amt = parseFloat($('#catch_option1Trad').val()) || 0.0;
  var catchRoth1amt = parseFloat($('#catch_option1Roth').val()) || 0.0;

  var trad2amt = parseFloat($('#trad_option2Amount').val()) || 0.0;
  if (trad_option2 == 'percent') { trad2amt = ((parseFloat($('#trad_option2Percent').val()) || 0.0)/ 100.0) * grossPay; }
  var roth2amt = parseFloat($('#roth_option2Amount').val()) || 0.0;
  if (roth_option2 == 'percent') { roth2amt = ((parseFloat($('#roth_option2Percent').val()) || 0.0)/ 100.0) * grossPay; }
  var catchTrad2amt = parseFloat($('#catch_option2Trad').val()) || 0.0;
  var catchRoth2amt = parseFloat($('#catch_option2Roth').val()) || 0.0;

  var rate2 = 1 + ($('#annualReturn').val())/(100*maxpay_freq);
  // annualized rate
  rate = Math.pow(1 + $('#annualReturn').val() / 100.0, 1.0 / maxpay_freq);
  rate2 = Math.pow(1 + $('#annualReturn').val() / 100.0, 1.0 / maxpay_freq);

  var netPay = grossPay - beforeDeduction;
  var netPay1 = netPay - trad1amt - catchTrad1amt;
  var monthTax1 = annualTax(netPay1 * maxpay_freq - fedAllowances * withholding_allowance_rate, taxtableS);
  if ($('#taxStatusMarried').attr('checked')) { monthTax1 = annualTax(netPay1 * maxpay_freq - fedAllowances * withholding_allowance_rate, taxtableM); }
  monthTax1 = parseFloat((monthTax1 / maxpay_freq).toFixed(2));
  netPay1 -= monthTax1;
  netPay1 -= afterDeduction + additionalWithholding;
  netPay1 -= (roth1amt + catchRoth1amt);
  var netPay2 = netPay - trad2amt - catchTrad2amt;
  var monthTax2 = annualTax(netPay2 * maxpay_freq - fedAllowances * withholding_allowance_rate, taxtableS);
  if ($('#taxStatusMarried').attr('checked')) { monthTax2 = annualTax(netPay2 * maxpay_freq - fedAllowances * withholding_allowance_rate, taxtableM); }
  monthTax2 = parseFloat((monthTax2 / maxpay_freq).toFixed(2));
  netPay2 -= monthTax2;
  netPay2 -= afterDeduction + additionalWithholding;
  netPay2 -= (roth2amt + catchRoth2amt);

  // matching
  var FERSauto = 0;
  var FERSmatch1 = 0;
  var FERSmatch2 = 0;
  var match_contrib1 = (trad1amt + roth1amt);
  var match_contrib2 = (trad2amt + roth2amt);
  var total_contrib1 = (trad1amt + catchTrad1amt + roth1amt + catchRoth1amt);
  var total_contrib2 = (trad2amt + catchTrad2amt + roth2amt + catchRoth2amt);
  if (rs == "FERS") {
    FERSauto = grossPay * 0.01;
    FERSmatch1 = FERSmatching(grossPay, match_contrib1);
    FERSmatch2 = FERSmatching(grossPay, match_contrib2);
  }
  if (rs == "USBRS") {
    FERSauto = grossPay * 0.01;
    FERSmatch1 = USBRSmatching(grossPay, match_contrib1);
    FERSmatch2 = USBRSmatching(grossPay, match_contrib2);
  }

  // what's the difference in Netpay?
  var monthTax0 = annualTax(netPay * maxpay_freq, taxtableS);
  if ($('#taxStatus').val() == "M") { monthTax0 = annualTax(netPay * maxpay_freq, taxtableM); }
  monthTax0 = parseFloat((monthTax0 / maxpay_freq).toFixed(2));
  var netPay0 = netPay - monthTax0;
  netPay0 -= afterDeduction;

  // yearly loop
  var  tablestr = "<br>\n<table class='tspStandard paycheck-estimator-table' width=100% cellspacing=5>\n";
    tablestr += "<tr  align=center>\n";
    tablestr += "<td class='subHeading bold' style='text-align:center; border-right:1px solid #A0A0A0;'>Year</td>";
    tablestr += "<td class='subHeading bold' style='text-align:left'>&nbsp;</td>";
    tablestr += "<td class='subHeading bold' style='text-align:left; border-right:1px solid #A0A0A0;'>Scenario 1</td>";
    tablestr += "<td class='subHeading bold' style='text-align:left'>&nbsp;</td>";
    tablestr += "<td class='subHeading bold' style='text-align:left'>Scenario 2</td>";
    tablestr += "</tr>\n";
    tablestr += "<tr class='headingRow'  style='text-align:right'>\n";
    tablestr += "<th style=' border-right:1px solid #A0A0A0;' width=20%>&nbsp;</th>";
    tablestr += "<th style='text-align:right' width=20%>Traditional</th>";
    tablestr += "<th class='roth-padding' style='text-align:right; border-right:1px solid #A0A0A0;' width=20%>Roth</th>";
    tablestr += "<th style='text-align:right' width=20%>Traditional</th>";
    tablestr += "<th class='roth-padding' style='text-align:right' width=20%>Roth</th>";
    tablestr += "</tr>\n";
  var rowclass = 'evenRow';
  grossPaycheck[1] = 0;
  net1Paycheck[1] = 0;
  net2Paycheck[1] = 0;

  taxes1[1] = 0;
  taxes2[1] = 0;
  beforetaxes[1] = 0;
  aftertaxes[1] = 0;

  trad1Contribution[1] = 0;
  roth1Contribution[1] = 0;
  trad1Growth[1] = 0;
  roth1Growth[1] = 0;

  trad2Contribution[1] = 0;
  trad2Growth[1] = 0;
  roth2Contribution[1] = 0;
  roth2Growth[1] = 0;

      year = 1;
      grossPaycheck[year] += grossPay;
      net1Paycheck[year] += netPay1;
      net2Paycheck[year] += netPay2;
      taxes1[year] += parseFloat(monthTax1);
      taxes2[year] += parseFloat(monthTax2);
      beforetaxes[year] += beforeDeduction;
      aftertaxes[year] += afterDeduction;

      trad1Contribution[year] += trad1amt + catchTrad1amt + (FERSauto + FERSmatch1);
      roth1Contribution[year] += roth1amt + catchRoth1amt;
      trad1Growth[year] += parseFloat(trad1amt + catchTrad1amt + (FERSauto + FERSmatch1)).toFixed(2);
      roth1Growth[year] += parseFloat(roth1amt + catchRoth1amt).toFixed(2);

      trad2Contribution[year] += trad2amt + catchTrad2amt + (FERSauto + FERSmatch2);
      roth2Contribution[year] += roth2amt + catchRoth2amt;
      trad2Growth[year] += parseFloat(trad2amt + catchTrad2amt + (FERSauto + FERSmatch2)).toFixed(2);
      roth2Growth[year] += parseFloat(roth2amt + catchRoth2amt).toFixed(2);

    if (rowclass == 'evenRow') { rowclass = 'oddRow'; } else { rowclass = 'evenRow'; }
    tablestr += "<tr class='" + rowclass + "'>\n";
    tablestr += "<td class='packed'  style='text-align:center; border-right:1px solid #A0A0A0;'>0</td>";
    tablestr += "<td class='packed'>" + CurrencyFormatted(trad1Growth[1]) + "</td>";
    tablestr += "<td class='packed roth-padding' style='border-right:1px solid #A0A0A0;'>" + CurrencyFormatted(roth1Growth[1]) + "</td>";
    tablestr += "<td class='packed'>" + CurrencyFormatted(trad2Growth[1]) + "</td>";
    tablestr += "<td class='packed roth-padding'>" + CurrencyFormatted(roth2Growth[1]) + "</td>";
    tablestr += "</tr>\n";


  for (year = 1; year <= maxyear; year++) {
    if (year > 1) {
      grossPaycheck[year] = parseFloat(grossPaycheck[year-1]);
      net1Paycheck[year] = parseFloat(net1Paycheck[year-1]);
      net2Paycheck[year] = parseFloat(net2Paycheck[year-1]);
      taxes1[year] = parseFloat(taxes1[year-1]);
      taxes2[year] = parseFloat(taxes2[year-1]);
      beforetaxes[year] = parseFloat(beforetaxes[year-1]);
      aftertaxes[year] = parseFloat(aftertaxes[year-1]);
      trad1Contribution[year] = parseFloat(trad1Contribution[year-1]);
      roth1Contribution[year] = parseFloat(roth1Contribution[year-1]);
      trad1Growth[year] = parseFloat(trad1Growth[year-1]).toFixed(2);
      roth1Growth[year] = parseFloat(roth1Growth[year-1]).toFixed(2);
      trad2Contribution[year] = parseFloat(trad2Contribution[year-1]);
      roth2Contribution[year] = parseFloat(roth2Contribution[year-1]);
      trad2Growth[year] = parseFloat(trad2Growth[year-1]).toFixed(2);
      roth2Growth[year] = parseFloat(roth2Growth[year-1]).toFixed(2);
    }

    // paychecks for year loop
    for (pay_freq = 1; pay_freq <= maxpay_freq; pay_freq++) {
      // save values for the year
      //trad1Growth[year] = (trad1Growth[year]) * Math.pow(rate, 1.0/maxpay_freq);
      //roth1Growth[year] = (roth1Growth[year]) * Math.pow(rate, 1.0/maxpay_freq);
      //trad1Growth[year] = (trad1Contribution[year]) * Math.pow(rate2, year*maxpay_freq);
      //roth1Growth[year] = (roth1Contribution[year]) * Math.pow(rate2, year*maxpay_freq);
      trad1Growth[year] = (trad1Growth[year]) * rate2;
      roth1Growth[year] = (roth1Growth[year]) * rate2;

      //trad2Growth[year] = (trad2Growth[year]) * Math.pow(rate, 1.0/maxpay_freq);
      //roth2Growth[year] = (roth2Growth[year]) * Math.pow(rate, 1.0/maxpay_freq);
      //trad2Growth[year] = (trad2Contribution[year]) * Math.pow(rate2, year*maxpay_freq);
      //roth2Growth[year] = (roth2Contribution[year]) * Math.pow(rate2, year*maxpay_freq);
      trad2Growth[year] = (trad2Growth[year]) * rate2;
      roth2Growth[year] = (roth2Growth[year]) * rate2;
    }

    grossPaycheck[year] = grossPaycheck[year].toFixed(2);
    net1Paycheck[year] = net1Paycheck[year].toFixed(2);
    net2Paycheck[year] = net2Paycheck[year].toFixed(2);

    beforetaxes[year] = beforetaxes[year].toFixed(2);
    taxes1[year] = taxes1[year].toFixed(2);
    taxes2[year] = taxes2[year].toFixed(2);
    aftertaxes[year] = aftertaxes[year].toFixed(2);

    trad1Contribution[year] = trad1Contribution[year].toFixed(2);
    roth1Contribution[year] = roth1Contribution[year].toFixed(2);
    trad1Growth[year] = trad1Growth[year].toFixed(2);
    roth1Growth[year] = roth1Growth[year].toFixed(2);

    trad2Contribution[year] = trad2Contribution[year].toFixed(2);
    trad2Growth[year] = trad2Growth[year].toFixed(2);
    roth2Contribution[year] = roth2Contribution[year].toFixed(2);
    roth2Growth[year] = roth2Growth[year].toFixed(2);

    if (rowclass == 'evenRow') { rowclass = 'oddRow'; } else { rowclass = 'evenRow'; }
    tablestr += "<tr class='" + rowclass + "'>\n";
    tablestr += "<td class='packed'  style='text-align:center; border-right:1px solid #A0A0A0;'>" + year + "</td>";
    tablestr += "<td class='packed'>" + CurrencyFormatted(trad1Growth[year]) + "</td>";
    tablestr += "<td class='packed roth-padding' style='border-right:1px solid #A0A0A0;'>" + CurrencyFormatted(roth1Growth[year]) + "</td>";
    tablestr += "<td class='packed'>" + CurrencyFormatted(trad2Growth[year]) + "</td>";
    tablestr += "<td class='packed roth-padding'>" + CurrencyFormatted(roth2Growth[year]) + "</td>";
    tablestr += "</tr>\n";
  }
  tablestr += "</table>\n";
$('#table12').html(tablestr);

var colorTrad = '#9C1B9C';
var colorAgency = '#58A4C3';
var colorRoth = '#EA6A17';
var colorGrowthTrad = '#C679DD';
var colorGrowthRoth = '#F4B55B';
var colors = new Array();
colors[0] = colorGrowthTrad;
colors[1] = colorGrowthTrad;
colors[2] = colorGrowthRoth;
colors[3] = colorAgency;
colors[4] = colorRoth;
colors[5] = colorTrad;

var trad1Contributionplot = [];
var trad1Growthplot = [];
var roth1Contributionplot = [];
var roth1Growthplot = [];
var trad2Contributionplot = [];
var trad2Growthplot = [];
var roth2Contributionplot = [];
var roth2Growthplot = [];
var years = [];
  years[0] = 0;
  trad1Contributionplot[0] = parseFloat(trad1Contribution[1]);
  trad1Growthplot[0] = parseFloat(trad1Contribution[1]);
  roth1Contributionplot[0] = parseFloat(roth1Contribution[1]);
  roth1Growthplot[0] = parseFloat(roth1Contribution[1]);
  trad2Contributionplot[0] = parseFloat(trad2Contribution[1]);
  trad2Growthplot[0] = parseFloat(trad2Contribution[1]);
  roth2Contributionplot[0] = parseFloat(roth2Contribution[1]);
  roth2Growthplot[0] = parseFloat(roth2Contribution[1]);
for (var i = 0; i < 40; i++) {
  years[i+1] = i+1;
  trad1Contributionplot[i+1] = parseFloat(trad1Contribution[i+1]);
  trad1Growthplot[i+1] = parseFloat(trad1Growth[i+1]);
  roth1Contributionplot[i+1] = parseFloat(roth1Contribution[i+1]);
  roth1Growthplot[i+1] = parseFloat(roth1Growth[i+1]);
  trad2Contributionplot[i+1] = parseFloat(trad2Contribution[i+1]);
  trad2Growthplot[i+1] = parseFloat(trad2Growth[i+1]);
  roth2Contributionplot[i+1] = parseFloat(roth2Contribution[i+1]);
  roth2Growthplot[i+1] = parseFloat(roth2Growth[i+1]);
}

// $("#slider").slider();

var growthbar12;

function goodMax(year) {
  // return Math.round(Math.max(parseFloat(trad1Growth[year]),parseFloat(roth1Growth[year]), parseFloat(trad2Growth[year]),parseFloat(roth2Growth[year])) * 1.07);
  return Math.round(Math.max(parseFloat(trad1Growth[year])+parseFloat(roth1Growth[year]), parseFloat(trad2Growth[year])+parseFloat(roth2Growth[year])) * 1.07);
}

var stack1 = 'Scenario1';
// var stack2 = '2Roth';
var stack2 = 'Scenario2';

function makeChart(chartMax, year) {

  if (year < 1) { year = 1; }
  if (year > 40) { year = 40; }

  return  new Highcharts.Chart({
            credits: { enabled: false },
            chart: {
                height: 400,
                spacingBottom: 20,
//              marginTop: 100,
//                zoomType: 'y',
//              redraw: function() { check_labels(); },
                type: 'column',
                renderTo: 'option12growthbar'
            },
            title: { text: null },
            xAxis: {
                categories: [' '],
//                categories: ['Scenario 1', 'Scenario 2'],
                labels: { y: 25, style: { font: '14px Helvetica', fontWeight: 'bold' } }
//              useHTML : true
            },
            yAxis: {
                min: 0, max: chartMax,
                title: { text: '' },
                startOnTick: false, endOnTick: false, alignTicks: false,
                gridLineWidth: 1, labels: { enabled: false },
                stackLabels: {
                    formatter: function() {
                        return '<strong>' + CurrencyFormatted(this.total) + '</strong>';
                    },
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '12pt',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }
            },
            legend: {
                useHTML: true,
                enabled: true,
                align: 'right',
                layout: 'vertical',
                verticalAlign: 'top',
        margin: 8,
        x: -3,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
                borderColor: '#CCC',
                symbolWidth: 10,
                symbolPadding: 3,
                title: {
                    text: 'City<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to hide)</span>',
                    style: { fontStyle: 'italic' }
                },
                shadow: false
            },
            tooltip: {
                positioner: function (labelWidth, labelHeight, point) {
                    var x = 212;
                    if ((this.chart.hoverSeries.data[0].series.stackKey).indexOf("Scenario2") >= 0) {
                        x = 88;
                    }
                    var y = 50;
                    if (point.plotY > 50) { y = point.plotY; }
                    if (point.plotY > 200) { y = 200; }
                    // if (point.plotX > 200) { return { x: 117, y: y }; }
                    return { x: x, y: y };
                },
                useHTML: true,
                borderColor: '#aaaaaa',
//              backgroundColor: 'white',
                formatter: function() {
                  if (this.series.index <= 0) { return null; }
                  var idx = 0;
                  var key = 'Scenario 1';
                  if ((this.series.index % 2) <= 0 ) { key = 'Scenario 2'; }
                  // var output = '<table><tr><td style="text-align:center; font-weight:bold; color:black" colspan=2>' + key + '</td></tr>';
                  var output = '<table><tr><td align=center colspan=2><strong>' + key + '</strong></td></tr>';
                  output += '<tr><td style="color:white">&nbsp;</td></tr>';
                  var data = this.series.xAxis.series;
                  output += '<tr align=right>';
                  output += '<td style="font-weight:bold; color:' + 'black' + '">' + 'Total' + ': </td>'
                          + '<td style="font-weight:bold; color: black">' + CurrencyFormatted(this.point.stackTotal) + '</td>';
                  output += '</tr>';
                  var j = this.series.index % 2;
                  for (; j<data.length; j += 2) {
                    output += '<tr align=right>';
                    if (data[j].points[idx].y > 0) {
                      output += '<td style="font-weight:bold; color:' + data[j].color + '">' + data[j].name + ': </td>'
                            + '<td style="font-weight:bold; color: black">' + CurrencyFormatted(data[j].points[idx].y) + '</td>';
                    }
                    output += '</tr>';
                  }
                  output += '</table>';
                  return output;
                }
            },
            plotOptions: {
                borderWidth: 0.1, shadow: false,
                column: {
                    shadow: false,
                    borderColor: '#444444',
                    pointWidth: 120,
                    pointPadding: 0.25,
                    groupPadding: 0.05,
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true, padding: 0,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black',
                        formatter: function() {
                            if (this.y == -0.00005) { return 'Scenario 1'; }
                            if (this.y == -0.00006) { return 'Scenario 2'; }
                            if (this.y == 0.0) { return ''; };
                            return '<strong>' + CurrencyFormatted(this.y) + '</strong>'; }
                    },
                    events: { legendItemClick: function () { return false; }}
                }
            },
            series: [{
                name: '<b>Contribution Type</b>', stack: stack1, color: 'white', data: [0]
            }, {
                name: 'Roth Growth', stack: stack1, color:  colorGrowthRoth,
                        data: [parseFloat(roth1Growth[year])-parseFloat(roth1Contribution[year])]
            }, {
                name: 'Roth Growth', stack: stack2, color:  colorGrowthRoth, showInLegend: false,
                        data: [parseFloat(roth2Growth[year])-parseFloat(roth2Contribution[year])]
            }, {
                name: 'Roth**', stack: stack1, color: colorRoth,
                        data: [parseFloat(roth1Contribution[year])]
            }, {
                name: 'Roth**', stack: stack2, color: colorRoth, showInLegend: false,
                        data: [parseFloat(roth2Contribution[year])]
            }, {
                name: 'Traditional Growth', stack: stack1, color: colorGrowthTrad,
                        data: [parseFloat(trad1Growth[year])-parseFloat(trad1Contribution[year])]
            }, {
                name: 'Traditional Growth', stack: stack2, color: colorGrowthTrad, showInLegend: false,
                        data: [parseFloat(trad2Growth[year])-parseFloat(trad2Contribution[year])]
            }, {
                name: 'Traditional**', stack: stack1, color: colorTrad,
                        data: [trad1amt + catchTrad1amt]
            }, {
                name: 'Traditional**', stack: stack2, color: colorTrad, showInLegend: false,
                        data: [trad2amt + catchTrad2amt]
            }, {
              dataLabels: { verticalAlign: 'top', x: 0, y: 3, crop: false, color: '#666666', style: { fontWeight: 'bold', fontSize: '11pt' } },
                name: 'S1', stack: stack1, showInLegend: false, color: '#666666', data: [-0.00005]
            }, {
              dataLabels: { verticalAlign: 'top', x: 0, y: 3, crop: false, color: '#666666', style: { fontWeight: 'bold', fontSize: '11pt' } },
                name: 'S2', stack: stack2, showInLegend: false, color: '#666666', data: [-0.00006]

            }]
        });
}

var lastMax = -1;

function check_labels() {
  var i, color, align, height, x;
  var plotSizeY = growthbar12.plotSizeY/1000.0;
  var series = growthbar12.series;
  var length = series.length - 2;
  for (i = 1; i < length; i++) {
      color = series[i].options.dataLabels.color;
      align = series[i].options.dataLabels.align;
      height = parseInt((series[i].data[0].yBottom - series[i].data[0].plotY)/plotSizeY);
      x = series[i].options.dataLabels.x;

      if (height <= 30) {
        if (parseInt(i/2) % 2) {
          if (series[i].options.dataLabels.align != 'right') {
            series[i].options.dataLabels.align = 'right';
            series[i].options.dataLabels.x = -120;
            series[i].hide(); series[i].show();
          }
        } else {
          if (series[i].options.dataLabels.align != 'left') {
            series[i].options.dataLabels.align = 'left';
            series[i].options.dataLabels.x = 120;
            series[i].hide(); series[i].show();
          }
        }
      } else {
          if (series[i].options.dataLabels.align != null) {
            series[i].options.dataLabels.align = null;
            series[i].options.dataLabels.x = 0;
            series[i].hide(); series[i].show();
          }
      }
  }

}

function doZoom() {
  $('#unzoomedSpan').addClass("hidden");
  $('#zoomTextImg').addClass("hidden");
  $('#zoomedSpan').removeClass("hidden");

  if ($('#option12year').val() >= 40) {
    $('#zoomedSpan').addClass("hidden");
  }
}
function unZoom() {
  $('#unzoomedSpan').removeClass("hidden");
  $('#zoomTextImg').removeClass("hidden");
  $('#zoomedSpan').addClass("hidden");
}

$('#option12zoom').click(function() {
  var newyear = $('#option12year').val();
  var newMax = goodMax(newyear);

  if ($('#unzoomedSpan').hasClass("hidden")) {
    unZoom();
    newMax = goodMax(40);
  } else {
    doZoom();
    newMax = goodMax(newyear);
  }

  growthbar12.destroy();
  growthbar12 = makeChart(newMax, newyear);
  lastMax = newMax;
  $('#option12year').val(newyear);
  check_labels();
});

$('#option12year').change(function() {
  var newyear = this.value;
  var zone = newyear;
  zone = Math.floor((zone-1)/10) * 10 + 10;
zone = 40;
  var newMax = goodMax(zone);

  // lastMax = newMax;
  // decide if I need to remake the chart or not
  if (lastMax != newMax) {
    growthbar12.destroy();
    growthbar12 = makeChart(newMax, newyear);
    lastMax = newMax;
  } else {
    growthbar12.series[5].setData([parseFloat(trad1Growth[newyear])-parseFloat(trad1Contribution[newyear])]);
    growthbar12.series[6].setData([parseFloat(trad2Growth[newyear])-parseFloat(trad2Contribution[newyear])]);
    growthbar12.series[1].setData([parseFloat(roth1Growth[newyear])-parseFloat(roth1Contribution[newyear])]);
    growthbar12.series[2].setData([parseFloat(roth2Growth[newyear])-parseFloat(roth2Contribution[newyear])]);
  }
  unZoom();
  // if ($('#option12year').val() >= 40) { doZoom(); }
  check_labels();
});

function doReport() {
  var pageUrl = "paycheckEstimatorReport.html" + window.location.search;
  openWindow(pageUrl, 750, 600);
}

// // The next two functions make sure the graph gets initialized correctly, even when the browser is slow
// window.onload = function() { // this will be run when the whole page is loaded
//   setTimeout(setGraph, 3000);
// };

function setGraph() {
   //finish doing things - make sure graph is ready before setting init value
  $('#option12year').val(40);
  $('#option12year').trigger('change');
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

var defdot = { symbol: 'circle', radius: 0.1 };
var defcircle = { symbol: 'circle', radius: 2.4 };
var defdiamond = { symbol: 'diamond', radius: 2.6 };
// the color names below are not HTML defined names, just a close name to identify what is on the screen
var colorContributions = 'gold'; // legacy '#9C1B9C';
var colorContributionsGrowth = 'gold-lighter'; // legacy '#C679DD';
var colorBalance = 'secondary'; // legacy '#EA6A17';
var colorBalanceGrowth = 'secondary-light'; // legacy '#F4B55B';
var contributionsText = 'Contributions<sup>1</sup>';

function dataBoth() {
  return [
      { name: 'Contributions Growth',   legendIndex: 1, marker: defcircle, colorIndex: colorContributionsGrowth, data: contributionGrowth },
      { name: contributionsText,                legendIndex: 2, marker: defcircle, colorIndex: colorContributions, data: contributions },
      { name: 'Account Balance Growth',         legendIndex: 3, marker: defcircle, colorIndex: colorBalanceGrowth, data: accountGrowth },
      { name: 'Existing Balance',               legendIndex: 4, marker: defcircle, colorIndex: colorBalance, data: accountBalance }
    ];
}
function dataFuture() {
  return [
      { name: 'Contributions Growth',   legendIndex: 1, marker: defcircle, colorIndex: colorContributionsGrowth, data: contributionGrowth },
      { name: contributionsText,                legendIndex: 2, marker: defcircle, colorIndex: colorContributions, data: contributions }
    ];
}
function dataBalance() {
    return [
      { name: 'Account Growth',         legendIndex: 1, marker: defcircle, colorIndex: colorBalanceGrowth, data: accountGrowth },
      { name: 'Existing Balance&nbsp;&nbsp;&nbsp;',             legendIndex: 2, marker: defcircle, colorIndex: colorBalance, data: accountBalance }
    ];
}

function savingsGrowTooltip(me) {
  // console.log(me);
  var rc = tooltipHeader(getMonthYearName(me.x+1000000000));
  rc = '';
  var points = me.points;
  // console.log(me);
  for (var i = 0; i < points.length; i++) {
    var lColor = points[i].series.colorIndex;
    var name = points[i].series.name;
    rc += tooltipLegendRow(lColor, '', name, '', CurrencyFormatted(points[i].y, 'cent'));
  }
  rc = tooltipRowGroup(rc);
  rc = tooltipHeader('Year '+me.x)+rc;
  rc = tooltipDiv('savings-grow-tooltip', rc);
  console.log(rc);
  return rc;
}

function makeChart(tickInterval, rs, gs, isMatching, matchFootnoteChart) {

  if(typeof(tickInterval)==='undefined') tickInterval = 5;
  var plotdata = dataBoth();
  if (gs == 'futureOnly') { plotdata = dataFuture(); }
  if (gs == 'balanceOnly') { plotdata = dataBalance(); }
  if (rs == 'BP') { plotdata = dataBalance(); }

  return  new Highcharts.Chart({
    credits: { enabled: false },
    chart: {
      renderTo: 'chartResult',
      type: 'area',
      spacingBottom: 25,
      styledMode: true,
    },
    legend: {
      enabled: true,
      reversed: true,
      // align: 'right',
      // layout: 'vertical',
      // verticalAlign: 'top',
      useHTML: true,
      // margin: 8,
      //    x: -3,
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
      formatter: function () {
        return savingsGrowTooltip(this);
      },
      shared: true,
      useHTML: true
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

// alert('functions done');
var chart;
var accountBalance = null;
var accountGrowth = null;
var contributions = null;
var contributionGrowth = null;
var total = null;
var salary = null;

function clearArrays() {
  accountBalance = new Array();
  accountGrowth = new Array();
  contributions = new Array();
  contributionGrowth = new Array();
  total = new Array();
  salary = new Array();
}

function buildTable(growthSelector, contributionsText, yearsToGo) {
  // build table header
  var headerHTML = sideScrollTH('', 'col', '', 'Year', false);
  if (growthSelector != 'futureOnly') {
    // headerHTML += sideScrollTH('', 'col', mapServerFundClassName(colorBalance), 'Existing Balance', false);
    // headerHTML += sideScrollTH('', 'col', mapServerFundClassName(colorBalanceGrowth), 'Account Balance Growth', false);
    headerHTML += sideScrollTH('', 'col', 'border-balance-existing', 'Existing Balance', false);
    headerHTML += sideScrollTH('', 'col', 'border-balance-growth', 'Account Balance Growth', false);
  }
  if (growthSelector != 'balanceOnly') {
    // headerHTML += sideScrollTH('', 'col', mapServerFundClassName(colorContributions), contributionsText, false);
    // headerHTML += sideScrollTH('', 'col', mapServerFundClassName(colorContributionsGrowth), 'Contribution Growth', false);
    headerHTML += sideScrollTH('', 'col', 'border-contributions', contributionsText, false);
    headerHTML += sideScrollTH('', 'col', 'border-contributions-growth', 'Contribution Growth', false);
  }
  headerHTML += sideScrollTH('', 'col', '', 'Total Projected Balance', false);
  headerHTML = sideScrollWrapper('', 'tr', '', '', headerHTML, false);
  headerHTML = sideScrollWrapper('  ', 'thead', '', '', headerHTML, true);

  var bodyHTML = '';
  for (var year = 0; year <= yearsToGo; year++) {
    row = sideScrollTH('', 'row', '', year, false);
    if (growthSelector != 'futureOnly') {
      row += sideScrollWrapper('', 'td', '', '', CurrencyFormatted(accountBalance[year], 'cent'), false);
      row += sideScrollWrapper('', 'td', '', '', CurrencyFormatted(accountGrowth[year], 'cent'), false);
    }
    if (growthSelector != 'balanceOnly') {
      row += sideScrollWrapper('', 'td', '', '', CurrencyFormatted(contributions[year], 'cent'), false);
      row += sideScrollWrapper('', 'td', '', '', CurrencyFormatted(contributionGrowth[year], 'cent'), false);
    }
    row += sideScrollWrapper('', 'td', '', '', CurrencyFormatted(total[year]), false);
    bodyHTML += sideScrollWrapper('    ', 'tr', '', '', row, true);
  }
  bodyHTML = sideScrollWrapper('  ', 'tbody', '', '', bodyHTML, true);
  var tableHTML = sideScrollTable('', 'savings-grow-table', '', headerHTML+bodyHTML, true);
  return tableHTML;
}

function calculateResultsX() {
  clearArrays();

  // These variables hold values used in the calculations
  var agency = 'agency';
  var isMatching = false;
  var rs = getRetirementSystem();
  contributionsText = 'Contributions';
  if ((rs == 'FERS') || (rs == 'USBRS')) {
    contributionsText = 'Contributions<sup>1</sup>';
    isMatching = true;
    if (rs == 'USBRS') { agency = 'service'; }
  }
  var matchFootnoteChart = '1. Includes any '+agency+' contributions';
  var matchFootnoteTable = "<div id='footnotes'>\n  <ol>    <li>Includes any "+agency+" contributions</li>\n  </ol>\n</div>";

  // console.log('rs '+rs, 'agency '+agency);

  var amountToUse = getPosInteger('amountToUse', 0);
  var yearsToContribute = getPosInteger('yearsToContribute', 0);
  var matchDelay = 0;
  var annualPay = getPosInteger('annualPay', 0);
  var paySchedule = getPaySchedule();
  var contributionSelector = 'xxx'; // getContributionSelector();
  var annualPayFixed = getPosFloat('annualPayFixed', 0.0);
  var annualPayPercent = getPosFloat('annualPayPercent', 0.0);
  var annualPayIncreasePercent = getPosFloat('annualPayIncreasePercent', 0.0);
  var yearsToGo = getPosInteger('yearsToGo', 0);
  var yearsServed = getPosInteger('yearsServed', 0);
  var catchupAmount = getPosInteger('catchupAmount', 0);
  var rateOfReturn = getPosFloat('rateOfReturn', 0.0);

  var growthSelector = 'xxx'; //  getGrowthSelector();
  if (rs == 'BP') { growthSelector = 'balanceOnly'; }
  if (growthSelector == 'futureOnly') { amountToUse = 0; }
  if (growthSelector == 'balanceOnly') { yearsToContribute = 0; }
  // console.log(growthSelector);
  // console.log(amountToUse,yearsToContribute,matchDelay,annualPay,paySchedule,annualPayPercent,annualPayIncreasePercent,yearsToGo,yearsServed,catchupAmount,rateOfReturn);

  // loop control
  var periodLength = get_pay_freq(paySchedule);
  if (rs == 'US') { periodLength = 12.0; }
  if (rs == 'USBRS') { periodLength = 12.0; }
  if (rs == 'BP') { periodLength = 1.0; }
  var period = 0;
  var year = 0;
  var returnRate = rateOfReturn / 100.0;
  returnRate = Math.pow(1 + returnRate, 1.0 / periodLength) - 1.0;
  // console.log(periodLength, returnRate);
  var annualPayRate = annualPayPercent / 100.0;
  if (rs == 'FERS') { annualPayRate = FERSmatch(annualPayRate); }
  if (rs == 'BP') { yearsToContribute = 0; }
  // annualPayRate = annualPayRate / periodLength;
  var annualPayAmt = 0.0;
  var annualPayIncreaseRate = (annualPayIncreasePercent) / 100.0 + 1.00;
  // deal with rounding of catchup
  var catchupPaycheck = parseInt(catchupAmount / periodLength * 100.0) / 100.0;
  var catchupCatchup = parseInt(100 * parseFloat(catchupAmount - parseFloat(catchupPaycheck) * periodLength).toFixed(2));

  // alert(catchupPaycheck + '  ' + catchupCatchup);
  accountBalance[year] = amountToUse;
  accountGrowth[year] = 0.0;
  contributions[year] = 0.0;
  contributionGrowth[year] = 0.0;
  total[year] = accountBalance[year] + accountGrowth[year] + contributions[year] + contributionGrowth[year];
  salary[year] = parseFloat((annualPay / periodLength).toFixed(2));
  salary[year+1] = salary[year];

  for (year = 1; year <= yearsToGo; year++) {
    accountBalance[year] = amountToUse;
    accountGrowth[year] = accountGrowth[year-1];
    contributions[year] = contributions[year-1];
    contributionGrowth[year] = contributionGrowth[year-1];
    if (year > 1) { salary[year] = parseFloat((salary[year-1] * annualPayIncreaseRate).toFixed(2)); }
    for (period = 1; period <= periodLength; period++) {
      contributionGrowth[year] += parseFloat(((contributions[year] + contributionGrowth[year]) * returnRate).toFixed(2));
      if (year <= yearsToContribute) {
        // console.log('1', yearsServed, year, period, yearsToContribute);
        if (rs == 'USBRS') {
          // console.log('2', year, period, annualPayRate, salary[year]*annualPayRate, parseFloat(salary[year] * USBRSmatch(year+yearsServed, period, annualPayRate).toFixed(2)), catchupPaycheck);
          annualPayAmt = parseFloat((salary[year] * USBRSmatch(year+yearsServed+matchDelay, period, annualPayRate)).toFixed(2));
        } else {
          if (contributionSelector == 'contributionFixed') {
            annualPayAmt = parseFloat((annualPayFixed / periodLength).toFixed(2));
          } else {
            annualPayAmt = parseFloat((salary[year] * annualPayRate).toFixed(2));
          }
        }
        console.log('contrib is ' + annualPayAmt + ' and ' + parseFloat(catchupPaycheck));
        contributions[year] += annualPayAmt + parseFloat(catchupPaycheck);
        if (period <= catchupCatchup) { contributions[year] += 0.01; }
      }
    }
    accountGrowth[year] += parseFloat(((accountBalance[year-1] + accountGrowth[year-1]) * (rateOfReturn / 100.0)).toFixed(2));
    total[year] = accountBalance[year] + accountGrowth[year] + contributions[year] + contributionGrowth[year];
  }
  var table = buildTable(growthSelector, contributionsText, yearsToGo);

  // if (isMatching) { table += matchFootnoteTable; }
  if (isMatching) { $('#show-data-footnote').html(matchFootnoteTable); }
    else { $('#show-data-footnote').html(''); }
  $('#savings-grow-table').html(table);

  $('#existing-balance').html(CurrencyFormatted(accountBalance[yearsToGo], 'cent'));
  $('#balance-growth').html(CurrencyFormatted(accountGrowth[yearsToGo], 'cent'));
  $('#future-contributions').html(CurrencyFormatted(contributions[yearsToGo], 'cent'));
  $('#future-growth').html(CurrencyFormatted(contributionGrowth[yearsToGo], 'cent'));
  $('#final-total').html('<strong>' + CurrencyFormatted(total[yearsToGo], 'cent') + '</strong>');


  var tickInterval = parseInt(yearsToGo / 10);
  chart = makeChart(tickInterval, rs, growthSelector, isMatching, matchFootnoteChart);
  // if (isMatching) {
  //   chart.renderer.text(matchFootnoteChart, chart.legend.group.translateX+5, chart.chartHeight-15).css({ fontSize: '12', textAlign: 'left'}).add();
  //   //chart.renderer.label(matchFootnoteChart, chart.legend.group.translateX+5, chart.chartHeight-15, null, null, null, true).css({ fontSize: '12', textAlign: 'left'}).add();
  // }
}

-->
</script>
