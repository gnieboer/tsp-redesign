{% comment %}
This is the javascript specific to panel 2.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
  return ( growthSelectorGood() & yearsServedGood(1) & DIEMSdateGood(1) & balanceGood()
             & yearsToGoGood() & rateOfReturnGood()
    );

  //
  //     & contributionsGood() );
};

panelEnter[{{ panelID }}] = function(panel) {
  applyGrowthSelectorChoice(getGrowthSelector());
  // window.scroll(0,0);
  return true;
}
panelExit[{{ panelID }}] = function(panel) {
  return true;
}

function set_FC_text(rs) {
  if ($('#FC_'+rs) != 'undefined') {
    $('.FC_Info').hide();
    $('#FC_'+rs).show();
  }
}

function selectedGrowth(id) {
  console.log(id);
  growthSelectorGood();
  // deemphasize(0);
}
// my functions
function balanceGood() {
  return ( amountToUseGood() );
}
function contributionsGood() {
  return ( annualPayGood() & payScheduleGood() & annualPayPercentGood() & annualPayIncreasePercentGood() & catchupAmountGood() & yearsToContributeGood() );
}

function getGrowthSelector() {
  if ($('#BP').prop('checked')) { return 'balanceOnly'; }
  if ($('#balanceOnly').prop('checked')) { return 'balanceOnly'; }
  if ($('#futureOnly').prop('checked')) { return 'futureOnly'; }
  if ($('#bothGrowth').prop('checked')) { return 'bothGrowth'; }

  return '';
}

function applyGrowthSelectorChoice(growthSelector) {
  if (growthSelector == 'balanceOnly') {
    $('#accountBalanceDiv').removeClass('hide');
    $('#futureContributionsDiv').addClass('hide');
    return true;
  }
  if (growthSelector == 'futureOnly') {
    $('#accountBalanceDiv').addClass('hide');
    $('#futureContributionsDiv').removeClass('hide');
    return true;
  }
  if (growthSelector == 'bothGrowth') {
    $('#accountBalanceDiv').removeClass('hide');
    $('#futureContributionsDiv').removeClass('hide');
    return true;
  }
  $('#accountBalanceDiv').addClass('hide');
  $('#futureContributionsDiv').addClass('hide');
  return false;
}
function growthSelectorGood() {
  var growthSelector = getGrowthSelector();
  console.log('gs '+ growthSelector);
  if (growthSelector == '') return showError('growthSelector', 'Please select how you will use this calculator.');
  applyGrowthSelectorChoice(growthSelector);

  var choice = 'Both';
  if (growthSelector == 'balanceOnly') choice = 'Existing Account Balance';
  if (growthSelector == 'futureOnly') choice = 'Future Contributions';
  $('#lblAYRgrowthSelector').html(choice);
  return clearError('growthSelector');
}

function set_gc(gc) {
  if (gc == 'balanceOnly') { $('#balanceOnly').prop('checked', true); }
  if (gc == 'futureOnly') { $('#futureOnly').prop('checked', true); }
  if (gc == 'bothGrowth') { $('#bothGrowth').prop('checked', true); }
  growthSelectorGood();
}

var DIEMS = flatpickr("#DIEMSdate", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "F j, Y",
  // dateFormat: "Y-m-d",
  allowInput: true,
  // defaultDate: [new Date().fp_incr(-30), "today"],
  minDate: "01/01/1900",
  maxDate: "today",
});

function DIEMSdateGood(submit) {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('DIEMSdate'); }
  var DIEMSdate = $.trim($('#DIEMSdate').val());
  console.log('Date '+DIEMSdate);
  console.log(DIEMS);
  $('#lblAYRDIEMSdate').html(DIEMSdate);
  if (!$('#USBRS').prop('checked')) { return clearError('DIEMSdate'); }
  if (DIEMSdate.length > 0) { return clearError('DIEMSdate'); }
  if (submit) { return showError('DIEMSdate', 'Enter DIEMS date.'); }
  clearError('DIEMSdate');
  return false;
}

function yearsServedGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('yearsServed'); }
  if (!$('#USBRS').prop('checked')) { return clearError('yearsServed'); }

  var yearsServed = getPosInteger('yearsServed', -1);
  $('#lblAYRyearsServed').html(yearsServed);

  if (yearsServed < 0) {
    return showError('yearsServed', "Enter your years served.");
  }
  if ((yearsServed < 0) || (yearsServed > 99)) {
    return showError('yearsServed', "Years Served must be between 0 and 99.");
  }
//  if (yearsServed > 26) {
//    return showError('yearsServed', "Years served more than 26 makes you inelligble for US-BRS.");
//  }

  testWarning();
  return clearError('yearsServed');
}

function testWarning() {
 console.log('still need to add testWarning');
}

function amountToUseGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'futureOnly') || (growthSelector == '')) { return clearError('amountToUse'); }

  var amountToUse = getPosInteger('amountToUse', -1);
  if (amountToUse > 1) { $('#amountToUse').val(amountToUse); }
  console.log(amountToUse);

  if (amountToUse <= 0) {
    return showError('amountToUse', "You must enter the amount that is currently in your TSP account.");
  }
  if (amountToUse > 5000000) {
    return showError('amountToUse', "Existing balance must not be greater than $5,000,000.");
  }

  $('#lblAYRamountToUse').html(CurrencyFormatted(amountToUse));
  return clearError('amountToUse');
}




function checkYearsToGo() {
  var yearsToGo = getPosInteger('yearsToGo', -1);
  $('#yearsToGo').val(yearsToGo);
  if (yearsToGo <= 0) {
    return showError('yearsToGo', "The number of years you expect to leave your money in the TSP account must be greater than 0.");
  }
  if (yearsToGo > 99) {
    return showError('yearsToGo', "The number of years you expect to leave your money in the TSP account must not be greater than 99.");
  }

  $('#lblAYRyearsToGo').html(yearsToGo);
  return clearError('yearsToGo');
}

function yearsToGoGood() {
  if (checkYearsToGo() == false) return false;

  if (getPosInteger('yearsToContribute', -1) < 0) return true;

  if (checkYearsToContribute() == false) return false;

  return yearsContribAndGo();
}

function rateOfReturnGood() {
  if ($("#rateOfReturn").val() == '') {
    return showError('rateOfReturn', "Please enter your expected rate of return.");
  }
  var rateOfReturn = parseFloat($("#rateOfReturn").val());

  if ((rateOfReturn < 0.0) || (rateOfReturn > 99.0)) {
    return showError('rateOfReturn', "Rate of Return should be between 0% and 99%.");
  }

  $("#rateOfReturn").val(parseFloat($("#rateOfReturn").val()).toFixed(2));
  $('#lblAYRrateOfReturn').html($("#rateOfReturn").val()+'%');
  return clearError('rateOfReturn');
}

/*
function deemphasize(flag) {
  if (flag == 0) {
    $('#ServiceSoFar').addClass("deemphasis");
    $('#ServiceSoFarAYR').addClass("deemphasis");
    $('#AccountBalance').removeClass("deemphasis");
    $('#AccountBalanceAYR').removeClass("deemphasis");
    $('#modal-formexistingbalance').show();
    $('#FutureContributions').addClass("deemphasis");
    $('#FutureContributionsAYR').addClass("deemphasis");
    $('#modal-formfuturecontributions').hide();
    if (getPosInteger('yearsToGo', -1) > 0) checkYearsToGo();
    if (getPosInteger('amountToUse', -1) > 0) amountToUseGood();
    disableServiceSoFar();
    enableAccountBalance();
    disableFutureContributions();
    contributionsGood();
  }
  if (flag == 1) {
    $('#ServiceSoFar').removeClass("deemphasis");
    $('#ServiceSoFarAYR').removeClass("deemphasis");
    $('#AccountBalance').addClass("deemphasis");
    $('#AccountBalanceAYR').addClass("deemphasis");
    $('#modal-formexistingbalance').hide();
    $('#FutureContributions').removeClass("deemphasis");
    $('#FutureContributionsAYR').removeClass("deemphasis");
    $('#modal-formfuturecontributions').show();
    if ((getPosInteger('yearsToContribute', -1) > 0) && (getPosInteger('yearsToGo', -1) > 0)) { yearsToGoGood(); }
    if (getPosFloat('annualPayIncreasePercent', 0.0) > 0.0) { annualPayIncreasePercentGood(); }
    if (getPosInteger('annualPayPercent', -1) > 0) { annualPayPercentGood(); }
    if (getPosInteger('catchupAmount', -1) > 0) catchupAmountGood();
    enableServiceSoFar();
    disableAccountBalance();
    enableFutureContributions();
    balanceGood();
  }
  if (flag == 2) {
    $('#ServiceSoFar').removeClass("deemphasis");
    $('#ServiceSoFarAYR').removeClass("deemphasis");
    $('#AccountBalance').removeClass("deemphasis");
    $('#AccountBalanceAYR').removeClass("deemphasis");
    $('#modal-formexistingbalance').show();
    $('#FutureContributions').removeClass("deemphasis");
    $('#FutureContributionsAYR').removeClass("deemphasis");
    $('#modal-formfuturecontributions').show();
    if (getPosInteger('amountToUse', -1) > 0) amountToUseGood();
    if ((getPosInteger('yearsToContribute', -1) > 0) && (getPosInteger('yearsToGo', -1) > 0)) { yearsToGoGood(); }
    if (getPosFloat('annualPayIncreasePercent', 0.0) > 0.0) { annualPayIncreasePercentGood(); }
    if (getPosInteger('annualPayPercent', -1) > 0) { annualPayPercentGood(); }
    if (getPosInteger('catchupAmount', -1) > 0) catchupAmountGood();
    enableServiceSoFar();
    enableAccountBalance();
    enableFutureContributions();
  }
  growthSelectorGood();
}

$('#catchupNoteText').html("Catch-up contributions are traditional and/or Roth contributions that are made by "
    + "a participant age 50 or older. You must first exceed the elective deferral limit ("
    + CurrencyFormatted(IRC_contribution_limit) + " in " + IRC_limit_year + ") to make catch-up contributions.");


function enableServiceSoFar() {
  enableElement('yearsServed');
  // enableElement('DIEMSdate');
  // $('DIEMSdate').datepicker({ showOn: 'on'});
}

function disableServiceSoFar() {
  disableElement('yearsServed');
  // disableElement('DIEMSdate');
  // $('DIEMSdate').datepicker({ showOn: 'off'});
}



function amountToUseGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'futureOnly') || (growthSelector == '')) { return clearError('amountToUse'); }

  var amountToUse = getPosInteger('amountToUse', -1);

  if (amountToUse <= 0) {
    return showError('amountToUse', "You must enter the amount that is currently in your TSP account.");
  }
  if (amountToUse > 5000000) {
    return showError('amountToUse', "Existing balance must not be greater than $5,000,000.");
  }

  $('#lblAYRamountToUse').html(CurrencyFormatted(amountToUse));
  return clearError('amountToUse');
}

function enableAccountBalance() {
  enableElement('amountToUse');
}

function disableAccountBalance() {
  disableElement('amountToUse');
}

function enableFutureContributions() {
  enableElement('yearsToContribute');
  enableElement('annualPay');
  // enableElement('paySchedule');
  $('#paySchedule').removeAttr('disabled');
  enableElement('annualPayPercent');
  enableElement('annualPayIncreasePercent');
  enableElement('catchupAmount');
  testWarning();
}

function disableFutureContributions() {
  disableElement('yearsToContribute');
  disableElement('annualPay');
  // disableElement('paySchedule');
  $('#paySchedule').attr('disabled','disabled');
  disableElement('annualPayPercent');
  disableElement('annualPayIncreasePercent');
  disableElement('catchupAmount');
}

function annualPayGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('annualPay'); }
  if ($('#BP').prop('checked')) { return clearError('annualPay'); }

  var annualPay = getPosInteger('annualPay', -1);

  if (annualPay <= 0) {
    return showError('annualPay', "Enter your annual pay.");
  }
  if ((annualPay < 1) || (annualPay > 1000000)) {
    return showError('annualPay', "Annual pay amount must be between $1 and $1,000,000.");
  }

  testWarning();
  $('#lblAYRannualPay').html(CurrencyFormatted(annualPay));
  return clearError('annualPay');
}

function payScheduleGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('paySchedule'); }
  if ($('#BP').prop('checked')) { return clearError('paySchedule'); }
  if ($('#US').prop('checked')) { return clearError('paySchedule'); }
  if ($('#USBRS').prop('checked')) { return clearError('paySchedule'); }

  $('#lblAYRpaySchedule').html($('#paySchedule').val());
  if ($('#paySchedule').val() == 'Select') {
    return showError('paySchedule', "Select your pay schedule.");
  }

  return clearError('paySchedule');
}

function annualPayPercentGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('annualPayPercent'); }
  if ($('#BP').prop('checked')) { return clearError('annualPayPercent'); }

  if ($("#annualPayPercent").val() == '') {
    return showError('annualPayPercent', "Please enter the percent of your annual pay you would like to save.");
  }
  var annualPayPercent = parseInt($("#annualPayPercent").val());

  if ((annualPayPercent < 0) || (annualPayPercent > 99)) {
    return showError('annualPayPercent', "Annual percent to save should be between 0% and 99%.");
  }

  testWarning();
  $("#annualPayPercent").val(parseInt($("#annualPayPercent").val()));
  $('#lblAYRannualPayPercent').html($("#annualPayPercent").val()+'%');
  return clearError('annualPayPercent');
}

function annualPayIncreasePercentGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('annualPayIncreasePercent'); }
  if ($('#BP').prop('checked')) { return clearError('annualPay'); }

  if ($("#annualPayIncreasePercent").val() == '') {
    // return showError('annualPayIncreasePercent', "Please enter your estimated annual pay increase.");
    $('#lblAYRannualPayIncreasePercent').html('0.00%');
    return clearError('annualPayIncreasePercent');
  }

  var annualPayIncreasePercent = getPosFloat('annualPayIncreasePercent', 0.0);
  $("#annualPayIncreasePercent").val((annualPayIncreasePercent).toFixed(2));

  // if ((annualPayIncreasePercent < 0.0) || (annualPayIncreasePercent > 15.0)) {
  if (annualPayIncreasePercent > 15.0) {
    return showError('annualPayIncreasePercent', "Salary increase should be between 0% and 15%.");
  }

  $('#lblAYRannualPayIncreasePercent').html($("#annualPayIncreasePercent").val()+'%');
  return clearError('annualPayIncreasePercent');
}

function catchupAmountGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('catchupAmount'); }
  if ($('#BP').prop('checked')) { return clearError('catchupAmount'); }

  var catchupAmount = getPosInteger('catchupAmount', 0);

  // if (catchupAmount <= 0) {
  //   return showError('catchupAmount', "Enter your catch up amount.");
  // }
  // if ((catchupAmount < 1) || (catchupAmount > IRC_catchup_contribution_limit)) {
  if (catchupAmount > IRC_catchup_contribution_limit) {
    return showError('catchupAmount', "Catch-up contributions cannot exceed " + CurrencyFormatted(IRC_catchup_contribution_limit) + ".");
  }

  $('#lblAYRcatchupAmount').html(CurrencyFormatted(catchupAmount));
  return clearError('catchupAmount');
}

// test relation to each other
function yearsContribAndGo() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return true; }
  var yearsToGo = getPosInteger('yearsToGo', -1);
  var yearsToContribute = getPosInteger('yearsToContribute', -1);

  if (yearsToContribute > yearsToGo) {
    showError('yearsToContribute',
        "The number of years you plan to contribute to the plan must be less than or equal to the number of years until you begin withdrawing from your TSP account.");
    return showError('yearsToGo',
        "The number of years until you begin withdrawing from your TSP account must be greater than or equal to the number of years you plan to contribute to the plan.");
  }
  return true;
}

function checkYearsToContribute() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('yearsToContribute'); }
  var yearsToContribute = getPosInteger('yearsToContribute', -1);

  if (yearsToContribute <= 0) {
    return showError('yearsToContribute', "The number of years you plan to contribute must be greater than 0.");
  }

  if (yearsToContribute > 99) {
    return showError('yearsToContribute', "The number of years you expect to contribute must not be greater than 99.");
  }

  $('#lblAYRyearsToContribute').html(yearsToContribute);
  return clearError('yearsToContribute');
}

function yearsToContributeGood() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('yearsToContribute'); }
  if ($('#BP').prop('checked')) { return clearError('yearsToContribute'); }

  if (checkYearsToContribute() == false) return false;

  if (getPosInteger('yearsToGo', -1) < 0) return true;

  if (checkYearsToGo() == false) return false;

  return yearsContribAndGo();
}

// we only have one warning in this calculator.  Parameter is for future use if needed
function show_amount_warnings(whichwarn) {
  option_open(false, true, '17000', false, ''); disable_warning_icon('contrib');
}

function clear_warning_icon() { $('#WarnOpContr').hide(); }
function show_warning_icon() { $('#WarnOpContr').show(); }

function testWarning() {
  if ($('#BP').prop('checked')) { return; }
  if (getPosInteger('yearsToContribute', -1) <= 0) { return; }

  var annualPay = getPosInteger('annualPay', -1);
  if ((annualPay < 1) || (annualPay > 1000000)) { return; }

  if ($("#annualPayPercent").val() == '') { return; }
  var annualPayPercent = parseInt($("#annualPayPercent").val());
  if ((annualPayPercent < 0) || (annualPayPercent > 99)) { return; }

  // we have good input for the salary fields
  var contrib = annualPay * (annualPayPercent / 100.0);

  if (contrib > IRC_contribution_limit)
    show_warning_icon();
  else
    clear_warning_icon();
}

$(document).ready(function () {
  disableServiceSoFar();
  disableAccountBalance();
  disableFutureContributions();
});
*/
-->
</script>
