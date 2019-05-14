function ageGood(forSubmit) {
  if ($('#your-age').val() == '' && forSubmit) { showError('your-age', 'Enter Age.'); return false; }
  var age = getPosInteger('your-age', 0);
  if (age < 20) { showError('your-age', 'Age must be at least 20.'); return false; }
  if (age > 60) { showError('your-age', 'Age must be less than 60'); return false; }
  return clearError('your-age');
}

function salaryGood(forSubmit) {
  if ($('#your-salary').val() == '' && forSubmit) { showError('your-salary', 'Enter Salary.'); return false; }
  var salary = getPosInteger('your-salary', 0);
  if (salary < 1000) { showError('your-salary', 'Salary must be at least $1000'); return false; }
  if (salary > 100000) { showError('your-salary', 'Salary cannot exceed $100,000'); return false; }
  return clearError('your-salary');
}

function frequencyGood(forSubmit) {
  if ($('#pay-frequency').val() == 'Select' && forSubmit) { showError('pay-frequency', 'Enter Frequency.'); return false; }
  var frequency = getFrequency();
  if (frequency <= 0) { showError('pay-frequency', 'Unknown frequency selected.'); return false; }
  return clearError('pay-frequency');
}

function rateGood(forSubmit) {
  if ($('#your-rate-of-return').val() == '') { return 3.0; }
  var rate = getPosFloat('your-rate-of-return', 0);
  if (rate < 0.0) { showError('your-rate-of-return', 'Rate must be more than 0.0%.'); return false; }
  if (rate > 12.0) { showError('your-rate-of-return', 'Rate cannot exceed 12.0%.'); return false; }
  return clearError('your-rate-of-return');
}

function inputsGood(doCalc) {
  // is there a value for all fields?
  var rc = true;

  rc &= ageGood(doCalc);
  rc &= salaryGood(doCalc);
  rc &= frequencyGood(doCalc);
  return rc;
}

function getFrequency() {
  var dropVal = $('#pay-frequency').val();
  if (dropVal == 'Biweekly') { return 26; }
  if (dropVal == 'Weekly') { return 52; }
  if (dropVal == 'Semi-monthly') { return 24; }
  if (dropVal == 'Monthly') { return 12; }
  return 0;
}

function calculate(doCalc) {
  if (inputsGood(doCalc) != true) { return; }
  // get values
  var age = getPosInteger('your-age', 0);
  var salary = getPosInteger('your-salary', 0);
  var frequency = getFrequency();
  var rate = getPosFloat('your-rate-of-return', 0);
  var paycheckRate = 1.0 + ((rate / 100.0) / frequency);
  var paycheck = Math.round((salary * 100.0) / frequency) / 100.0;
  var your5 = Math.round(paycheck * 5.0) / 100.0;
  $('#contrib1').html(CurrencyFormatted(your5));
  var your8 = Math.round(paycheck * 8.0) / 100.0;
  $('#contrib2').html(CurrencyFormatted(your8));
  var your10 = Math.round(paycheck * 10.0) / 100.0;
  $('#contrib3').html(CurrencyFormatted(your10));
  var agency1 = Math.round(paycheck * 1.0) / 100.0;
  $('#agencyContrib').html(CurrencyFormatted(agency1));
  var agency4 = Math.round(paycheck * 4.0) / 100.0;
  $('#agencyMatch').html(CurrencyFormatted(agency4));

  $('#how-much-you-saved').show();

  var balance5 = [], balance8 = [], balance10 = [];
  balance5[age-1] = 0.0;
  balance8[age-1] = 0.0;
  balance10[age-1] = 0.0;
  for (year = age; year <= 75; year++) {
    balance5[year] = balance5[year-1];  // balance when year starts
    balance8[year] = balance8[year-1];
    balance10[year] = balance10[year-1];
    for (payment = 1; payment <= frequency; payment++) {
      // each pay period
      balance5[year] = Math.round((balance5[year] + your5 + agency1 + agency4) * paycheckRate * 100) / 100.0;
      balance8[year] = Math.round((balance8[year] + your8 + agency1 + agency4) * paycheckRate * 100) / 100.0;
      balance10[year] = Math.round((balance10[year] + your10 + agency1 + agency4) * paycheckRate * 100) / 100.0;
    }
  }

  var milestones = [62, 67, 72];
  for (let i of milestones) {
    $('#balance-1-'+i).html(CurrencyFormatted(balance5[i]));
    $('#balance-2-'+i).html(CurrencyFormatted(balance8[i]));
    $('#balance-3-'+i).html(CurrencyFormatted(balance10[i]));
  }
}

$(document ).ready(function() {
  $('#how-much-you-saved').hide();
});
