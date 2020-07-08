{% comment %}
This is the javascript specific to panel 2.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
  return accountAmountGood(forceValue) & frequencyGood(forceValue)
    & rateOfReturnGood(forceValue) & amountToReceiveGood(forceValue);
};

panelEnter[{{ panelID }}] = function(panel) {
  return true;
}
panelExit[{{ panelID }}] = function(panel) {
  // testPrimeSettingsGrowth();
    return true;
}

// my functions
function accountAmountGood(submit) {
  if ((!submit) && $('#accountAmount').val() === '') return true;
  var val = parseInt($('#accountAmount').val()) || 0;
  if (val > 0) { $('#accountAmount').val(val); }

  if (val <= 0.0) {
    return showError('accountAmount',
                     "Enter the amount from your account that will be used for TSP installment payments.");
  }
  if (val < 200.0) {
    return showError('accountAmount', "Enter a dollar amount that is at least $200.");
  }
  if (val > 10000000.0) {
    return showError('accountAmount', "Enter a dollar amount that is at most $10,000,000.");
  }

  $('#account-amount').html(CurrencyFormatted(val, 'no_cent'));
  return clearError('accountAmount');
}

function getFrequency() {
  if ($('#Monthly').prop('checked')) { return 'Monthly'; }
  if ($('#Quarterly').prop('checked')) { return 'Quarterly'; }
  if ($('#Annually').prop('checked')) { return 'Annually'; }
  // return 'Monthly';
  return 'none';
}

var lastSubmit = false;
function frequencyGood(submit) {
  clearError('amountToReceive');
  amountToReceiveGood(lastSubmit);
  var choice = getFrequency();
  $('#monthly-payment').html(choice);
  if (choice == 'Monthly') {
    $('#frequency').html('Monthly');
    // $('#lblAYRfrequency').html($('#frequency').html());
    return clearError('frequency');
  }

  if (choice == 'Quarterly') {
    $('#frequency').html('Quarterly');
    return clearError('frequency');
  }

  if (choice == 'Annually') {
    $('#frequency').html('Annually');
    return clearError('frequency');
  }

  if ((!submit)) {
    return clearError('frequency');
  }

  return showError('frequency', "Choose installment period.");
}

function rateOfReturnGood(submit) {
  if ((!submit) && $('#rateOfReturn').val() === '') return true;
  if ($("#rateOfReturn").val() == '') {
    return showError('rateOfReturn', "Please enter your expected rate of return.");
  }
  $('#rateOfReturn').val(parseFloat($('#rateOfReturn').val()).toFixed(2));
  var val = parseFloat($('#rateOfReturn').val());
  if (isNaN(val)) { $("input#rateOfReturn").val(0.0); val = 0.0; }

  if ((val < 0.0) || (val > 99.0)) {
    return showError('rateOfReturn', "Rate of Return should be between 0% and 99%.");
  }

  $('#rate-of-return').html(CurrencyFormatted(val, 'cent'));
  return clearError('rateOfReturn');
}
function amountToReceiveErrorString() {
  var choice = getFrequency();
  var val = 'period';
  if (choice == 'Monthly') { val = 'month'; }
  if (choice == 'Quarterly') { val = 'quarter'; }
  if (choice == 'Annually') { val = 'year'; }
  return "Enter the amount that you would like to receive each " + val + '.';
}
function amountToReceiveGood(submit) {
  lastBlankOK = submit;
  if ((!submit) && $('#amountToReceive').val() === '') return true;
  var amountToReceive = parseFloat($('#amountToReceive').val()) || 0.0;
  var accountAmount = parseFloat($('#accountAmount').val()) || 0.0;
  if (amountToReceive > 0.0) {
    amountToReceive = parseFloat(amountToReceive.toFixed(2));
    $('#amountToReceive').val(amountToReceive);
  }

  if (amountToReceive <= 0.0) {
    return showError('amountToReceive', amountToReceiveErrorString());
  }
  if (amountToReceive < 25.0) {
    return showError('amountToReceive', "Enter a dollar amount that is at least $25.");
  }
  if (amountToReceive > accountAmount) {
    return showError('amountToReceive',
        "The amount that you want to receive each month is greater than the amount from your account that you want to use for TSP installment payments."
        + "   Either increase the amount you want to use for TSP installment payments, or decrease your payment amount.");
  }

  return clearError('amountToReceive');
}
-->
</script>
