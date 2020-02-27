function showErrorAnnuityRateText(spanName) {
  var notWorking = somethingNotWorking();

  $('#'+spanName).html(notWorking);
  // $('#'+spanName).html('Annuity rates not currently available.');
}

function setAnnuityRateText(spanName, line1, line2) {
  // line is date,year,month,rate
  var rate1 = line1.split(","); // break into cols
  var rate2 = line2.split(","); // break into cols

  var text = 'The annuity interest rate index is ';
  // rate[3] is rate, rate[2] is month, rate[1] is year
  text += rate1[3] + '% for annuities purchased in ' + rate1[2] + ' ' + rate1[1];
  text += ' and ';
  if (rate1[3] != rate2[3]) { text += rate2[3] + '% for annuities purchased '; }
  text +=  'in ' + rate2[2] + ' ' + rate2[1] + '.';

  $('#'+spanName).html(text);
}
