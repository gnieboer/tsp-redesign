{% comment %}
This is the javascript specific to panel 2.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
( growthSelectorGood(true) & yearsServedGood(true) & DIEMSdateGood(true) & amountToUseGood(true)
 & contributionsGood(true) & yearsToGoGood(true) & rateOfReturnGood(true) );
return true;
  return ( growthSelectorGood(true) & yearsServedGood(true) & DIEMSdateGood(true) & amountToUseGood(true)
             & contributionsGood(true) & yearsToGoGood(true) & rateOfReturnGood(true)
    );
};

panelEnter[{{ panelID }}] = function(panel) {
  setLimits();
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

function selectedGrowth(id, submit) {
  growthSelectorGood(submit);
  // deemphasize(0);
}
// my functions
function contributionsGood(submit) {
  return ( annualPayGood(submit) & payScheduleGood(submit)
      & contributionSelectorGood(submit) & annualPayFixedGood(submit) & annualPayPercentGood(submit)
      & annualPayIncreasePercentGood(submit) & catchupAmountGood(submit) & yearsToContributeGood(submit) );
}

function getGrowthSelector() {
  if ($('#BP').prop('checked')) { return 'balanceOnly'; }
  if ($('#balanceOnly').prop('checked')) { return 'balanceOnly'; }
  if ($('#futureOnly').prop('checked')) { return 'futureOnly'; }
  if ($('#bothGrowth').prop('checked')) { return 'bothGrowth'; }

  return '';
}

function hideBlock(hideFlag, block1, block2, block3) {
  if (hideFlag) {
    $('#'+block1).addClass('hide');
    $('#'+block2).addClass('hide');
    return true;
  }
  $('#'+block1).removeClass('hide');
  $('#'+block2).removeClass('hide');
  return false;
}
function hideGrowth(hideFlag) { hideBlock(hideFlag, 'growthSelectorDiv', 'growthAYR'); }
function hideServiceSoFar(hideFlag) { hideBlock(hideFlag, 'serviceSoFar', 'serviceSoFarAYR'); }
function hideAccountBalance(hideFlag) {
  hideBlock(hideFlag, 'accountBalanceDiv', 'balanceAYR');
  hideBlock(hideFlag, 'existing-balance-row', 'account-growth-row');
}
function hideAccountContributions(hideFlag) { hideBlock(hideFlag, 'accountContributionsDiv', 'accountGrowthAYR'); }
function hideFuture(hideFlag) {
  hideBlock(hideFlag, 'futureContributionsDiv', 'futureAYR');
  hideBlock(hideFlag, 'future-contributions-row', 'future-growth-row');
}
function hidePaySchedule(hideFlag) { hideBlock(hideFlag, 'paySchedule-hide', 'lblAYRpaySchedule-row'); }

function applyGrowthSelectorChoice(growthSelector) {
  rsExit();
  if (growthSelector == 'balanceOnly') {
    hideAccountBalance(false);
    hideFuture(true);
    hideAccountContributions(false);
    return true;
  }
  if (growthSelector == 'futureOnly') {
    hideAccountBalance(true);
    hideFuture(false);
    hideAccountContributions(false);
    return true;
  }
  if (growthSelector == 'bothGrowth') {
    hideAccountBalance(false);
    hideFuture(false);
    hideAccountContributions(false);
    return true;
  }
  hideServiceSoFar(true);
  hideAccountBalance(true);
  hideFuture(true);
  hideAccountContributions(true);
  return false;
}
function growthSelectorGood(submit) {
  var growthSelector = getGrowthSelector();
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
  growthSelectorGood(submit);
}

var DIEMS = flatpickr("#DIEMSdate", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "F j, Y",
  // dateFormat: "Y-m-d",
  allowInput: false,
  // defaultDate: [new Date().fp_incr(-30), "today"],
  minDate: "01/01/1900",
  maxDate: "today",
});

function DIEMSdateGood(submit) {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('DIEMSdate'); }
  var DIEMSdate = $.trim($('#DIEMSdate').val());
  $('#lblAYRDIEMSdate').html(DIEMSdate);
  $('#DIEMSdate').val(DIEMSdate);
  if (!$('#USBRS').prop('checked')) { return clearError('DIEMSdate'); }
  if (DIEMSdate.length > 0) { return clearError('DIEMSdate'); }
  if (submit) { return showError('DIEMSdate', 'Enter DIEMS date.'); }
  clearError('DIEMSdate');
  return false;
}

function yearsServedGood(submit) {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('yearsServed'); }
  if (!$('#USBRS').prop('checked')) { return clearError('yearsServed'); }

  var yearsServed = getPosInteger('yearsServed', -1);
  if (yearsServed > 0) { $('#yearsServed').val(yearsServed); }
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

function clear_warning_icon() { $('#WarnOpContr').hide(); }
function show_warning_icon() { $('#WarnOpContr').show(); }

function setLimits() {
  // in CC note
  $('#catch-up-limit').html(CurrencyFormatted(IRC_catchup_contribution_limit, 'cent'));
  $('#catch-up-year').html(IRC_limit_year);
  $('#IRC-limit-cc').html(CurrencyFormatted(IRC_contribution_limit, 'cent'));
  $('#IRC-limit-year-cc').html(IRC_limit_year);

  // in warning
  $('#IRC-limit').html(CurrencyFormatted(IRC_contribution_limit, 'cent'));
  $('#IRC-limit-year').html(IRC_limit_year);
  return true;
}
function testWarning() {
  if ($('#BP').prop('checked')) { return; }
  if (getPosInteger('yearsToContribute', -1) <= 0) { return; }

  var annualPay = getPosInteger('annualPay', -1);
  if (catchupAmount > 0) { $('#catchupAmount').val(catchupAmount); }
  if ((annualPay < 1) || (annualPay > 1000000)) { return; }

  if ($("#annualPayPercent").val() == '') { return; }
  var annualPayPercent = parseInt($("#annualPayPercent").val());
  if ((annualPayPercent < 0) || (annualPayPercent > 99)) { return; }

  // we have good input for the salary fields
  var contrib = annualPay * (annualPayPercent / 100.0);
  var maxpcontrib = (100.0 * IRC_contribution_limit) / annualPay;

  $('#total-contribution').html(CurrencyFormatted(contrib, 'cent'));
  $('#maximum-percent-contribution').html(maxpcontrib.toFixed(2));

  if (contrib > IRC_contribution_limit)
    $('#contribution-exceeds-maximum').removeClass('hide');
  else
    $('#contribution-exceeds-maximum').addClass('hide');
}

function amountToUseGood(submit) {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'futureOnly') || (growthSelector == '')) { return clearError('amountToUse'); }

  if ($("#amountToUse").val() == '') {
    if (submit) {
      return showError('amountToUse', "You must enter the amount that is currently in your TSP account.");
    }
    return clearError('amountToUse');
  }

  var amountToUse = getPosInteger('amountToUse', -1);
  if (amountToUse > 0) { $('#amountToUse').val(amountToUse); }

  if (amountToUse <= 0) {
    return showError('amountToUse', "You must enter the amount that is currently in your TSP account.");
  }
  if (amountToUse > 5000000) {
    return showError('amountToUse', "Existing balance must not be greater than $5,000,000.");
  }

  $('#lblAYRamountToUse').html(CurrencyFormatted(amountToUse));
  return clearError('amountToUse');
}


function annualPayGood(submit) {
  if (noFuture()) { return clearError('annualPay'); }

  if ($("#annualPay").val() == '') {
    if (submit) {
      return showError('annualPay', "Enter your annual pay.");
    }
    return clearError('annualPay');
  }

  var annualPay = getPosInteger('annualPay', -1);
  if (annualPay > 0) { $('#annualPay').val(annualPay); }

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

function getPaySchedule() {
  var rs = getRetirementSystem();
  if ((rs == 'FERS') || (rs == 'CSRS')) {
    return $('#paySchedule').val();
  }
  return 'Monthly';
}
function payScheduleGood(submit) {
  if (noFuture()) { return clearError('paySchedule'); }
/*
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('paySchedule'); }
*/
  var paySchedule = getPaySchedule();

  if (paySchedule == 'Select') {
    if (submit) { return showError('paySchedule', "Select your pay schedule."); }
  }

  $('#lblAYRpaySchedule').html(paySchedule);
  return clearError('paySchedule');
}

// test if the future options have been selected.  true if no future options
function noFuture() {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return true; }
  if ($('#BP').prop('checked')) { return true; }
  return false;
}
function getContributionSelector() {
  if ($('#contributionFixed').prop('checked')) { return 'contributionFixed'; }
  if ($('#contributionPercentage').prop('checked')) { return 'contributionPercentage'; }
  return '';
}
function contributionSelectorGood(submit) {
  if (noFuture()) { return clearError('contributionSelector'); }
  var contributionSelector = getContributionSelector();
  if (contributionSelector == 'contributionFixed') {
    $('#annualPayFixed-div').removeClass('hide');
    $('#annualPayPercent-div').addClass('hide');
    return clearError('contributionSelector');
  }
  if (contributionSelector == 'contributionPercentage') {
    $('#annualPayFixed-div').addClass('hide');
    $('#annualPayPercent-div').removeClass('hide');
    return clearError('contributionSelector');
  }
  $('#annualPayFixed-div').addClass('hide');
  $('#annualPayPercent-div').addClass('hide');
  return showError('contributionSelector', 'Enter type of contribution')
}
function annualPayFixedGood(submit) {
  if (noFuture()) { return clearError('annualPayFixed'); }
  var contributionSelector = getContributionSelector();
  if (contributionSelector == 'contributionPercentage') { return clearError('annualPayFixed'); }

  var annualPay = getPosInteger('annualPay', -1);
  var annualPayFixed = getPosInteger('annualPayFixed', -1);
  if (annualPayFixed > 0) { $('#annualPayFixed').val(annualPayFixed); }
  if (annualPayFixed > annualPay) {
    return showError('annualPayFixed', "Fixed contribution amount must be less than annual pay.");
  }

  if (annualPayFixed <= 0) {
    return showError('annualPayFixed', "Please enter the fixed amount of your annual pay you would like to save.");
  }
  if ((annualPayFixed < 1) || (annualPayFixed > 1000000)) {
    return showError('annualPayFixed', "Fixed contribution amount must be between $1 and $1,000,000.");
  }

  return clearError('annualPayFixed');
}
function annualPayPercentGood(submit) {
  if (noFuture()) { return clearError('annualPayPercent'); }
  var contributionSelector = getContributionSelector();
  if (contributionSelector == 'contributionFixed') { return clearError('annualPayPercent'); }

  if ($("#annualPayPercent").val() == '') {
    if (submit) {
      return showError('annualPayPercent', "Please enter the percent of your annual pay you would like to save.");
    }
    return clearError('annualPayPercent');
  }
  var annualPayPercent = getPosInteger('annualPayPercent', -1);
  if (annualPayPercent >= 0) { $('#annualPayPercent').val(annualPayPercent); }

  if ((annualPayPercent < 0) || (annualPayPercent > 99)) {
    return showError('annualPayPercent', "Annual percent to save should be between 0% and 99%.");
  }

  testWarning();
  $('#lblAYRannualPayPercent').html(annualPayPercent + '%');
  return clearError('annualPayPercent');
}

function annualPayIncreasePercentGood(submit) {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('annualPayIncreasePercent'); }
  if ($('#BP').prop('checked')) { return clearError('annualPay'); }

  if ($("#annualPayIncreasePercent").val() == '') {
    // return showError('annualPayIncreasePercent', "Please enter your estimated annual pay increase.");
    $('#lblAYRannualPayIncreasePercent').html('0.00%');
    return clearError('annualPayIncreasePercent');
  }
  var annualPayIncreasePercent = getPosFloat('annualPayIncreasePercent', 0.0);

  // if ((annualPayIncreasePercent < 0.0) || (annualPayIncreasePercent > 15.0)) {
  if (annualPayIncreasePercent > 15.0) {
    return showError('annualPayIncreasePercent', "Salary increase should be between 0% and 15%.");
  }

  $("#annualPayIncreasePercent").val((annualPayIncreasePercent).toFixed(2));
  $('#lblAYRannualPayIncreasePercent').html(annualPayIncreasePercent.toFixed(2)+'%');
  return clearError('annualPayIncreasePercent');
}

function catchupAmountGood(submit) {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('catchupAmount'); }
  if ($('#BP').prop('checked')) { return clearError('catchupAmount'); }

  var catchupAmount = getPosInteger('catchupAmount', 0);
  if (catchupAmount > 0) { $('#catchupAmount').val(catchupAmount); }

  // if (catchupAmount <= 0) {
  //   return showError('catchupAmount', "Enter your catch up amount.");
  // }
  // if ((catchupAmount < 1) || (catchupAmount > IRC_catchup_contribution_limit)) {
  if (catchupAmount > IRC_catchup_contribution_limit) {
    return showError('catchupAmount', "Catch-up contributions cannot exceed "
      + CurrencyFormatted(IRC_catchup_contribution_limit) + " for " + IRC_limit_year + ".");
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
  if (yearsToContribute > 0) { $('#yearsToContribute').val(yearsToContribute); }

  if (yearsToContribute <= 0) {
    return showError('yearsToContribute', "The number of years you plan to contribute must be greater than 0.");
  }

  if (yearsToContribute > 99) {
    return showError('yearsToContribute', "The number of years you expect to contribute must not be greater than 99.");
  }

  $('#lblAYRyearsToContribute').html(yearsToContribute);
  return clearError('yearsToContribute');
}

function yearsToContributeGood(submit) {
  var growthSelector = getGrowthSelector();
  if ((growthSelector == 'balanceOnly') || (growthSelector == '')) { return clearError('yearsToContribute'); }
  if ($('#BP').prop('checked')) { return clearError('yearsToContribute'); }

  if (checkYearsToContribute() == false) return false;

  if (getPosInteger('yearsToGo', -1) < 0) return true;

  if (checkYearsToGo() == false) return false;

  return yearsContribAndGo();
}



function checkYearsToGo() {
  var yearsToGo = getPosInteger('yearsToGo', -1);
  if (yearsToGo > 0) { $('#yearsToGo').val(yearsToGo); }
  if (yearsToGo <= 0) {
    return showError('yearsToGo', "The number of years you expect to leave your money in the TSP account must be greater than 0.");
  }
  if (yearsToGo > 99) {
    return showError('yearsToGo', "The number of years you expect to leave your money in the TSP account must not be greater than 99.");
  }
  $('#lblAYRyearsToGo').html(yearsToGo);
  return clearError('yearsToGo');
}

function yearsToGoGood(submit) {
  if (checkYearsToGo() == false) return false;

  if (getPosInteger('yearsToContribute', -1) < 0) return true;

  if (checkYearsToContribute() == false) return false;

  return yearsContribAndGo();
}

function rateOfReturnGood(submit) {
  if ($("#rateOfReturn").val() == '') {
    if (submit) { return showError('rateOfReturn', "Please enter your expected rate of return."); }
    return clearError('rateOfReturn');
  }
  var rateOfReturn = getPosFloat('rateOfReturn', -1.0);
  if ((rateOfReturn < 0.0) || (rateOfReturn > 99.0)) {
    return showError('rateOfReturn', "Rate of Return should be between 0% and 99%.");
  }
  rateOfReturn = rateOfReturn.toFixed(2);
  $("#rateOfReturn").val(rateOfReturn);
  $('#lblAYRrateOfReturn').html(rateOfReturn + '%');
  $('#annual-rate').html(rateOfReturn + '%');
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
    if (getPosInteger('amountToUse', -1) > 0) amountToUseGood(true);
    disableServiceSoFar();
    enableAccountBalance();
    disableFutureContributions();
    contributionsGood(true);
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
    if ((getPosInteger('yearsToContribute', -1) > 0) && (getPosInteger('yearsToGo', -1) > 0)) { yearsToGoGood(true); }
    if (getPosFloat('annualPayIncreasePercent', 0.0) > 0.0) { annualPayIncreasePercentGood(true); }
    if (getPosInteger('annualPayPercent', -1) > 0) { annualPayPercentGood(true); }
    if (getPosInteger('catchupAmount', -1) > 0) catchupAmountGood(true);
    enableServiceSoFar();
    disableAccountBalance();
    enableFutureContributions();
    amountToUseGood(false);
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
    if (getPosInteger('amountToUse', -1) > 0) amountToUseGood(true);
    if ((getPosInteger('yearsToContribute', -1) > 0) && (getPosInteger('yearsToGo', -1) > 0)) { yearsToGoGood(true); }
    if (getPosFloat('annualPayIncreasePercent', 0.0) > 0.0) { annualPayIncreasePercentGood(true); }
    if (getPosInteger('annualPayPercent', -1) > 0) { annualPayPercentGood(true); }
    if (getPosInteger('catchupAmount', -1) > 0) catchupAmountGood(true);
    enableServiceSoFar();
    enableAccountBalance();
    enableFutureContributions();
  }
  growthSelectorGood(true);
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
