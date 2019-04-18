function checkYearBorn(doCalc) {
  if ($('#your-age').val() == '') { return false; }
  var born = getPosInteger('year-born', 0);
  if (born < 1900) { showError('year-born', ''); return false; }
  if (born > 2050) { showError('year-born', ''); return false; }
  clearError('year-born');
  if (doCalc) { return showChoice(born); }
  return true;
}

function pickBestFund(born) {
  if (born >= 1982) { return [2040, 2050, '']; }
  if (born >= 1972) { return [2030, 2040, 2050]; }
  if (born >= 1962) { return [2020, 2030, 2040]; }
  if (born >= 1956) { return ['Income', 2020, 2030]; }
  return ['', 'Income', 2020];  // oldest choice
  return true;
}

function showChoice(born) {
  // assume oldest choice
  var fundArray = pickBestFund(born);
  var fundBefore = fundArray[0];
  var fund = fundArray[1];
  var fundAfter = fundArray[2];

  $('#L'+'Income'+'outer').hide();
  $('#L'+'2020'+'outer').hide();
  $('#L'+'2030'+'outer').hide();
  $('#L'+'2040'+'outer').hide();
  $('#L'+'2050'+'outer').hide();

  // show best 3 choices
  if (fundBefore != '') { $('#L'+fundBefore+'outer').show(); }
  $('#L'+fund+'outer').show();
  if (fundAfter != '') { $('#L'+fundAfter+'outer').show(); }
  bestChoice(fund);

  // highlight best bestChoice
  $('#L'+fund+'outer').addClass('success');
  $('#L'+fund+'inner').addClass('success');
  $('#review-funds').show();
  return true;
}

function bestChoice(fund) {
  var str = 'Based on the year you were born L ' + fund + ' is a good choice for you because you have time.';
  $('#best-choice').html(str);
  console.log(str);
  return true;
}

function showMore(fund) {
  alert('The more button for fund ' + fund + ' was clicked.');
  console.log('The more button for fund ' + fund + ' was clicked.');
  return true;
}

$(".positiveinteger").numeric({ negative : false, decimalPlaces: 0 });

$(document ).ready(function() {
  $('#review-funds').hide();
});
