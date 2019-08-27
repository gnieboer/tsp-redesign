function toggleFund(chartName, name) {
  if (name == 'Lfunds') {
    // do L group
    var val = $('#Lfunds').prop('checked');  // get its new value
    if ($('#L___Income').prop('checked') != val) { $('#L___Income').click(); }
    if ($('#L___2020').prop('checked') != val) { $('#L___2020').click(); }
    if ($('#L___2030').prop('checked') != val) { $('#L___2030').click(); }
    if ($('#L___2040').prop('checked') != val) { $('#L___2040').click(); }
    if ($('#L___2050').prop('checked') != val) { $('#L___2050').click(); }
    return false;
  }
  if (name == 'InvFunds') {
    // do individual group
    var val = $('#InvFunds').prop('checked');  // get its new value
    if ($('#G___Fund').prop('checked') != val) { $('#G___Fund').click(); }
    if ($('#F___Fund').prop('checked') != val) { $('#F___Fund').click(); }
    if ($('#C___Fund').prop('checked') != val) { $('#C___Fund').click(); }
    if ($('#S___Fund').prop('checked') != val) { $('#S___Fund').click(); }
    if ($('#I___Fund').prop('checked') != val) { $('#I___Fund').click(); }
    return false;
  }
  // if (name.charAt(0) == 'L') { $('#Lfunds').prop('checked', false); }
  legendItemClickedPairs(chartName, getSeriesID(name.replace('___', ' '), chartName));
  // turn group back on?
  checkAnnualReturnsGroup();
  return false;
}


function legendItemClickedPairs(chartName, idx) {
  var chart = $('#'+chartName).highcharts();
  if (chart == null) { return; }
  var series = chart.series;
  // individual fund clicks buddy
  var name = series[idx].name;
  if ((name == 'F Fund') || (name == 'C Fund') || (name == 'S Fund') || (name == 'I Fund')) {
    // I clicked on an individual fund with an index
    if ((series[idx].visible) && (series[idx+1].visible)) { legendItemClicked(chartName, idx+1); }
    legendItemClicked(chartName, idx);
    return false;
  }
  // index fund clicks buddy
  if (idx > 0) {
    var name = series[idx-1].name;
    if ((name == 'F Fund') || (name == 'C Fund') || (name == 'S Fund') || (name == 'I Fund')) {
      // I clicked on an index fund
      if ((!series[idx].visible) && (!series[idx-1].visible)) { legendItemClicked(chartName, idx-1); }
      legendItemClicked(chartName, idx);
      return false;
    }
  }
  // I clicked on a fund with no index
  legendItemClicked(chartName, idx);
}
function legendItemClicked(chartName, idx) {
  chartName = chartName.replace('-monthly', '');
  // console.log('lic: '+chartName+', '+idx);
  if (idx < 0) { return; }
  var chart = $('#'+chartName).highcharts();
  var chart2 = $('#'+chartName+'-monthly').highcharts();
  if (chart == null) { return; }
  deleteEmptyPoints(chartName, chart);
  deleteEmptyPoints(chartName+'-monthly', chart2);
  var series = chart.series;
  var series2 = chart2.series;
  if (series[idx].visible) {
    series[idx].hide();
    series2[idx].hide();
    $('.col'+idx).hide();
    if (series[idx].name.includes('&') != true) {
      $('#'+(series[idx].name.replace(' ', '___'))).prop('checked', false);
    }
  } else {
    series[idx].show();
    series2[idx].show();
    $('.col'+idx).show();
    if (series[idx].name.includes('&') != true) {
      $('#'+(series[idx].name.replace(' ', '___'))).prop('checked', true);
    }
  }
  checkAnnualReturnsGroup();
  return false;
}
