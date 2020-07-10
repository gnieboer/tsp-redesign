
function onSuccess(divName, data) {
  $('#'+divName).html(data);
  $('body').flowtype({
    minimum: 600,
    maximum: 1200,
    minfont: 11,
    maxFont: 30,
    fontRatio: 35
  });
}
function onFail(divName, textStatus, errorThrown) {
  $('#'+divName).html('unavailable');
}

function getMonthlyAnnuityFactors(chart) {
  doAjaxRetrieveCallback(chart, siteName+'/'+'monthlyAnnuityFactors.html?doFlow=0', onSuccess, onFail);
}
