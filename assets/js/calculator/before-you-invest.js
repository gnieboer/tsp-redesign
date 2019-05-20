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
  // return content name for three columns and which column to highlight
  if (born >= 1982) { return [2030, 2040, 2050, 2050, 'three']; }
  if (born >= 1972) { return [2030, 2040, 2050, 2040, 'two']; }
  if (born >= 1962) { return [2020, 2030, 2040, 2030, 'two']; }
  if (born >= 1956) { return ['Income', 2020, 2030, 2020, 'two']; }
  return ['Income', 2020, 2030, 'Income', 'one'];  // oldest choice
}

function showChoice(born) {
  // assume oldest choice
  var fundArray = pickBestFund(born);
  var fundOne = fundArray[0];
  var fundTwo = fundArray[1];
  var fundThree = fundArray[2];
  var fund = fundArray[3];
  var success = fundArray[4];

  // show best 3 choices
  $('#column-one-inner').html($('#L'+fundOne+'inner').html());
  $('#column-two-inner').html($('#L'+fundTwo+'inner').html());
  $('#column-three-inner').html($('#L'+fundThree+'inner').html());
  bestChoice(fund);

  // highlight best bestChoice

  var columns = ['one', 'two', 'three'];
  columns.forEach(function(c) {
    $('#column-'+ c +'-outer').removeClass('success');
    $('#column-'+ c +'-inner').removeClass('success');
  });
  $('#column-'+success+'-outer').addClass('success');
  $('#column-'+success+'-inner').addClass('success');
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
  var newpage = '/funds-lifecycle/l-' + fund.toLowerCase() + '/';
  window.location.href = newpage;
  // alert('The more button for fund ' + fund + ' was clicked.');
  // console.log('The more button for fund ' + fund + ' was clicked.');
  return true;
}

$(".positiveinteger").numeric({ negative : false, decimalPlaces: 0 });

$(document ).ready(function() {
  $('#review-funds').hide();
});
