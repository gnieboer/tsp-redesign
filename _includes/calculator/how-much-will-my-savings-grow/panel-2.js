{% comment %}
This is the javascript specific to panel 2.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
  return true;
  return ( growthChoiceGood() & yearsServedGood(1) & DIEMSdateGood(1)
      & balanceGood() & contributionsGood() & yearsToGoGood() & rateOfReturnGood() );
};

panelEnter[{{ panelID }}] = function(panel) {
  // window.scroll(0,0);
  return true;
}
panelExit[{{ panelID }}] = function(panel) {
  return true;
}

//
var FC_more_info =  "see <a class=\"textBoxLinkBlue\""
                    + " onClick=\"openWindow('/PlanParticipation/EligibilityAndContributions/typesOfContributions.html', 750, 650);\""
                    + " href=\"javascript:void(0);\">Types of Contributions</a> under Plan Participation."

var FC_prefix_array = new Array();
FC_prefix_array['FERS'] = "You may begin contributing to the TSP (through payroll contributions) as soon as you are hired. You also receive "
    + "Agency Automatic (1%) Contributions and are eligible to receive Agency Matching Contributions. Note: Newly hired or rehired "
    + "FERS employees are automatically enrolled to contribute 3% of basic pay unless they elect otherwise. For more information on agency contributions, "
    + FC_more_info;
FC_prefix_array['CSRS'] = "You may begin contributing to the TSP (through payroll contributions) as soon as you are hired. "
    + "Note: Newly rehired CSRS employees are automatically enrolled to contribute 3% of basic pay unless they elect otherwise. "
    + "CSRS employees do not receive agency contributions.";
FC_prefix_array['US'] = "You may begin contributing to the TSP (through payroll contributions) as soon as you are hired. "
    + "You can contribute from incentive pay, special pay, or bonus pay, as long you contribute from your basic pay. You can elect to "
    + "contribute from incentive pay, special pay, or bonus pay, even if you are not currently receiving them. These contributions "
    + "will be deducted when you do receive any of these types of pay. Note: Non-BRS members of the uniformed services do not receive "
    + "Service Automatic (1%) Contributions or Service Matching contributions.";
FC_prefix_array['USBRS'] = "You can contribute from incentive pay, special pay, or bonus pay, as long you contribute from your basic pay. "
    + "You can elect to contribute from incentive pay, special pay, or bonus pay, even if you are not currently receiving them. "
    + "These contributions will be deducted when you do receive any of these types of pay. BRS members also receive Service Automatic (1%) "
    + "Contributions and are eligible to receive Service Matching Contributions. Note: Newly hired or rehired uniformed services members "
    + "are automatically covered by BRS and enrolled to contribute 3% of basic pay unless they elect otherwise. For more information on service contributions, "
    + FC_more_info;
FC_prefix_array['BP'] = "You cannot contribute additional funds to the TSP account that was established for you. "
    + "For more information about Beneficiary Participant accounts, ";

function set_FC_text(rs) {
  if (typeof (FC_prefix_array[rs]) != 'undefined') { $('#FC_info').html(FC_prefix_array[rs]); }
}
set_FC_text('FERS');

function selectedGrowth(id) {
  console.log(id);
  // deemphasize(0);
}
// my functions
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
  growthChoiceGood();
}

function balanceGood() {
  return ( amountToUseGood() );
}
function contributionsGood() {
  return ( annualPayGood() & payScheduleGood() & annualPayPercentGood() & annualPayIncreasePercentGood() & catchupAmountGood() & yearsToContributeGood() );
}

function set_gc(gc) {
  if (gc == 'balanceOnly') { $('#balanceOnly').attr('checked', true); $('#balanceOnly').trigger('click'); }
  if (gc == 'futureOnly') { $('#futureOnly').attr('checked', true);   $('#futureOnly').trigger('click'); }
  if (gc == 'bothGrowth') { $('#bothGrowth').attr('checked', true);   $('#bothGrowth').trigger('click'); }
}

$('#catchupNoteText').html("Catch-up contributions are traditional and/or Roth contributions that are made by "
    + "a participant age 50 or older. You must first exceed the elective deferral limit ("
    + CurrencyFormatted(IRC_contribution_limit) + " in " + IRC_limit_year + ") to make catch-up contributions.");

function getGrowthChoice() {
  if ($('#balanceOnly').attr('checked')) { return 'balanceOnly'; }
  if ($('#futureOnly').attr('checked')) { return 'futureOnly'; }
  if ($('#bothGrowth').attr('checked')) { return 'bothGrowth'; }

  return '';
}

function growthChoiceGood() {
  var growthChoice = getGrowthChoice();

  if (growthChoice == '') return showError('growthChoice', 'Please select how you will use this calculator.');

  var choice = 'Both';
  if (growthChoice == 'balanceOnly') choice = 'Existing Account Balance';
  if (growthChoice == 'futureOnly') choice = 'Future Contributions';
  $('#lblAYRgrowthChoice').html(choice);
  return clearError('growthChoice');
}

function DIEMSdateGood(submit) {
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('DIEMSdate'); }
  var DIEMSdate = $.trim($('#DIEMSdate').val());
  $('#lblAYRDIEMSdate').html(DIEMSdate);
  if (!$('#USBRS').attr('checked')) { return clearError('DIEMSdate'); }
  if (DIEMSdate.length > 0) { return clearError('DIEMSdate'); }
  if (submit) { return showError('DIEMSdate', 'Enter DIEMS date.'); }
  clearError('DIEMSdate');
  return false;
}

function yearsServedGood() {
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('yearsServed'); }
  if (!$('#USBRS').attr('checked')) { return clearError('yearsServed'); }

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
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'futureOnly') || (growthChoice == '')) { return clearError('amountToUse'); }

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
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('annualPay'); }
  if ($('#BP').attr('checked')) { return clearError('annualPay'); }

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
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('paySchedule'); }
  if ($('#BP').attr('checked')) { return clearError('paySchedule'); }
  if ($('#US').attr('checked')) { return clearError('paySchedule'); }
  if ($('#USBRS').attr('checked')) { return clearError('paySchedule'); }

  $('#lblAYRpaySchedule').html($('#paySchedule').val());
  if ($('#paySchedule').val() == 'Select') {
    return showError('paySchedule', "Select your pay schedule.");
  }

  return clearError('paySchedule');
}

function annualPayPercentGood() {
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('annualPayPercent'); }
  if ($('#BP').attr('checked')) { return clearError('annualPayPercent'); }

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
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('annualPayIncreasePercent'); }
  if ($('#BP').attr('checked')) { return clearError('annualPay'); }

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
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('catchupAmount'); }
  if ($('#BP').attr('checked')) { return clearError('catchupAmount'); }

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
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return true; }
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
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('yearsToContribute'); }
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
  var growthChoice = getGrowthChoice();
  if ((growthChoice == 'balanceOnly') || (growthChoice == '')) { return clearError('yearsToContribute'); }
  if ($('#BP').attr('checked')) { return clearError('yearsToContribute'); }

  if (checkYearsToContribute() == false) return false;

  if (getPosInteger('yearsToGo', -1) < 0) return true;

  if (checkYearsToGo() == false) return false;

  return yearsContribAndGo();
}

function checkYearsToGo() {
  var yearsToGo = getPosInteger('yearsToGo', -1);

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

// we only have one warning in this calculator.  Parameter is for future use if needed
function show_amount_warnings(whichwarn) {
  option_open(false, true, '17000', false, ''); disable_warning_icon('contrib');
}

function clear_warning_icon() { $('#WarnOpContr').hide(); }
function show_warning_icon() { $('#WarnOpContr').show(); }

function testWarning() {
  if ($('#BP').attr('checked')) { return; }
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
