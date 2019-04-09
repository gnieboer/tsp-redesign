function checkAge(doCalc) {
  if ($('#your-age').val() == '') { return false; }
  var age = getPosInteger('your-age', 0);
  if (age < 20) { showError('your-age', ''); return false; }
  if (age > 60) { showError('your-age', ''); return false; }
  clearError('your-age');
  if (doCalc) { return calculate(0); }
console.log('age is ' + age);
  return age;
}

function checkSalary(doCalc) {
  if ($('#your-salary').val() == '') { return false; }
  var salary = getPosInteger('your-salary', 0);
  if (salary < 1000) { showError('your-salary', ''); return false; }
  if (salary > 100000) { showError('your-salary', ''); return false; }
  clearError('your-salary');
  if (doCalc) { return calculate(0); }
console.log('salary is ' + salary)
  return salary;
}

function getFrequency() {
  var dropVal = $('#pay-frequency').val();
  if (dropVal == 'Biweekly') { return 26; }
  if (dropVal == 'Weekly') { return 52; }
  if (dropVal == 'Semi-monthly') { return 24; }
  if (dropVal == 'Monthly') { return 12; }
  return 0;
}

function checkFrequency(doCalc) {
  if ($('#pay-frequency').val() == 'Select') { return false; }
  var frequency = getFrequency();
  if (frequency <= 0) { showError('pay-frequency', ''); return false; }
  clearError('pay-frequency');
  if (doCalc) { return calculate(0); }
console.log('frequency is ' + frequency)
  return frequency;
}

function checkRate(doCalc) {
  if ($('#your-rate-of-return').val() == '') { return 3.0; }
  var rate = getPosFloat('your-rate-of-return', 0);
  if (rate < 0.0) { showError('your-rate-of-return', ''); return false; }
  if (rate > 12.0) { showError('your-rate-of-return', ''); return false; }
  clearError('your-rate-of-return');
  if (doCalc) { return calculate(0); }
console.log('rate is ' + rate)
  return rate;
}

function checkInputs(doCalc) {
  // is there a value for all fields?
  var rc = true;

  if ($('#your-age').val() == '') {
    if (doCalc == 1) { showError('your-age', ''); }
    rc = false;
  }
  if ($('#your-salary').val() == '') {
    if (doCalc == 1) { showError('your-salary', ''); }
    rc = false;
  }
  if ($('#pay-frequency').val() == 'Select') {
    if (doCalc == 1) { showError('pay-frequency', ''); }
    rc = false;
  }
  // if ($('#your-rate-of-return').val() == '') { return false; }
  return rc;
}

function calculate(doCalc) {
  if (checkInputs(doCalc) != true) { return; }
  // get values
  var age = checkAge(0);
  var salary = checkSalary(0);
  var frequency = checkFrequency(0);
  var rate = checkRate(0);
  var paycheckRate = 1.0 + ((rate / 100.0) / frequency);
console.log('freq = '+frequency+'   rate = '+rate+'%    per payperiod rate = '+paycheckRate)
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

console.log('paycheck = ' + paycheck);
console.log('5% = ' + your5);
console.log('8% = ' + your8);
console.log('10% = ' + your10);
console.log('a 1% = ' + agency1);
console.log('a 4% = ' + agency4);
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
console.log('year '+ year + '    '+balance5[year]+ '    '+balance8[year]+ '    '+balance10[year])
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
  console.log('maximize savings - ready done')
});
