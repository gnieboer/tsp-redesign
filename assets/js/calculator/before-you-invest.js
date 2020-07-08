function checkYearBorn(doCalc) {
  // if (getPosInteger('year-born', 0) == 0) { return false; }
  $('#review-funds').hide();
  var born = getPosInteger('year-born', 0);
  if (born > 0) { $('#year-born').val(born); }
  var thisYear = new Date().getFullYear();
  var minYear = thisYear - 120;
  var maxYear = thisYear - 18;
  // if (born < 1900) { showError('year-born', 'Year born should be at least 1900.'); return false; }
  // if (born > 2030) { showError('year-born', 'Year born should be less than 2030.'); return false; }
  if ((born >= minYear) && (born <= maxYear)) {
    clearError('year-born');
    if (doCalc) { return showChoice(born); }
    return true;
  }
  return showError('year-born', 'Enter a birth year between '+minYear+'-'+maxYear+'.');
}

function pickBestFund(born) {
  // return content name for three columns and which column to highlight
  if (born >= 1999) { return [2055, 2060, 2065, 2065, 'three']; }
  if (born >= 1995) { return [2055, 2060, 2065, 2060, 'two']; }
  if (born >= 1990) { return [2050, 2055, 2060, 2055, 'two']; }
  if (born >= 1985) { return [2045, 2050, 2055, 2050, 'two']; }
  if (born >= 1980) { return [2040, 2045, 2050, 2045, 'two']; }
  if (born >= 1975) { return [2035, 2040, 2045, 2040, 'two']; }
  if (born >= 1970) { return [2030, 2035, 2040, 2035, 'two']; }
  if (born >= 1965) { return [2025, 2030, 2035, 2030, 'two']; }
  if (born >= 1958) { return ['Income', 2025, 2030, 2025, 'two']; }
  return ['Income', 2025, 2030, 'Income', 'one'];  // oldest choice
}

function pickBestFundSafety(born) {
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
  $('#column-one-inner').html($('#L'+fundOne+'inner').html().replace('FUNDNAME', 'One'));
  $('#column-two-inner').html($('#L'+fundTwo+'inner').html().replace('FUNDNAME', 'Two'));
  $('#column-three-inner').html($('#L'+fundThree+'inner').html().replace('FUNDNAME', 'Three'));
  bestChoice(fund);

  // add chart to each box
  var idx = getIdx();

  var glidePath = getLFundData(fundOne);
  var data = buildHighchartData(glidePath[idx]);
  var chartOne = smallLifeCyclePie(fundOne, 'pie-One', data);
  glidePath = getLFundData(fundTwo);
  data = buildHighchartData(glidePath[idx]);
  var chartTwo = smallLifeCyclePie(fundTwo, 'pie-Two', data);
  glidePath = getLFundData(fundThree);
  data = buildHighchartData(glidePath[idx]);
  var chartThree = smallLifeCyclePie(fundThree, 'pie-Three', data);

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
  var bc = '#best-choice-l-'+fund;
  $('.best-choice').hide();
  $(bc.toLowerCase()).show();
  return true;
  var str = 'Based on the year you were born L ' + fund + ' is a good choice for you because you have time.';
  $('#best-choice').html(str);
  // console.log(str);
  return true;
}

function showMore(fund) {
  var newpage = '/funds-lifecycle/l-' + fund.toLowerCase() + '/';
  window.location.href = newpage;
  // alert('The more button for fund ' + fund + ' was clicked.');
  // console.log('The more button for fund ' + fund + ' was clicked.');
  return true;
}

$(document ).ready(function() {
  $('#review-funds').hide();
});
