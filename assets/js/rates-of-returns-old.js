
function toggleFund(chartName, name) {
  if (name == 'Index') { indexFundSync(chartName, true); return false; }
  if (name == 'Lfunds') {
    // do L group
    var val = $('#Lfunds').prop('checked');  // get its new value
    if ($('#L_Income').prop('checked') != val) { $('#L_Income').click(); }
    if ($('#L_2020').prop('checked') != val) { $('#L_2020').click(); }
    if ($('#L_2030').prop('checked') != val) { $('#L_2030').click(); }
    if ($('#L_2040').prop('checked') != val) { $('#L_2040').click(); }
    if ($('#L_2050').prop('checked') != val) { $('#L_2050').click(); }
    return false;
  }
  if (name == 'InvFunds') {
    // do individual group
    var val = $('#InvFunds').prop('checked');  // get its new value
    if ($('#G_Fund').prop('checked') != val) { $('#G_Fund').click(); }
    if ($('#F_Fund').prop('checked') != val) { $('#F_Fund').click(); }
    if ($('#C_Fund').prop('checked') != val) { $('#C_Fund').click(); }
    if ($('#S_Fund').prop('checked') != val) { $('#S_Fund').click(); }
    if ($('#I_Fund').prop('checked') != val) { $('#I_Fund').click(); }
    return false;
  }
  // if (name.charAt(0) == 'L') { $('#Lfunds').prop('checked', false); }
  legendItemClickedPairs(chartName, getSeriesID(name.replace('_', ' '), chartName));
  // turn group back on?
  syncFundCheckboxGroups();
  return false;
}

function legendItemClickedPairs(chartName, idx) {
  if (idx < 0) { return; }
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
  if (idx < 0) { return; }
  chartName = chartName.replace('-monthly', '');
  // console.log('lic: '+chartName+', '+idx);
  var chart = $('#'+chartName).highcharts();
  var chart2 = $('#'+chartName+'-monthly').highcharts();
  if (chart == null) { return; }
  deleteEmptyPoints(chartName);
  deleteEmptyPoints(chartName+'-monthly');
  var series = chart.series;
  var series2 = chart2.series;
  if (series[idx].visible) {
    series[idx].hide();
    series2[idx].hide();
    $('.col'+idx).hide();
    if (series[idx].name.includes('&') != true) {
      $('#'+(series[idx].name.replace(' ', '_'))).prop('checked', false);
    }
  } else {
    series[idx].show();
    series2[idx].show();
    $('.col'+idx).show();
    if (series[idx].name.includes('&') != true) {
      $('#'+(series[idx].name.replace(' ', '_'))).prop('checked', true);
    }
  }
  syncFundCheckboxGroups();
  return false;
}
