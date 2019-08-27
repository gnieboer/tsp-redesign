var fundDates = flatpickr("#fundDates", {
  mode: "range",
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  defaultDate: [new Date().fp_incr(-30), "today"],
  minDate: "06/02/2003",
  maxDate: "today",
});

function toYYYYMMDD(d) {
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 101).toString().slice(-2);
    var dd = (d.getDate() + 100).toString().slice(-2);
    return yyyy + mm + dd;
}

function getSharePrices() {
  // var fundDates = document.querySelector("#fundDates")._flatpickr;
  var sDate = fundDates.selectedDates[0];
  var eDate = fundDates.selectedDates[1];
  if ((sDate == null) || (eDate == null)) { console.log('ignore'); return false; }
  var startdate = toYYYYMMDD(sDate);
  var enddate = toYYYYMMDD(eDate);
  var funds = ['Lfunds', 'InvFunds'];
  var url = sharePriceDownloadString(startdate, enddate, funds);
  url += '&download=0';
  // console.log(url);
  doAjaxRetrieve('dynamic-share-price-table', url);
  return false;
}

function downloadSharePrices() {
  // var fundDates = document.querySelector("#fundDates")._flatpickr;
  var sDate = fundDates.selectedDates[0];
  var eDate = fundDates.selectedDates[1];
  if ((sDate == null) || (eDate == null)) { console.log('ignore'); return false; }
  var startdate = toYYYYMMDD(sDate);
  var enddate = toYYYYMMDD(eDate);
  var format = 'CSV';
  var funds = ['Lfunds', 'InvFunds'];

  doSharePriceDownload(startdate, enddate, format, funds);
  return false;
}
function checkBoxColumnID(cb) {
  var names = ['empty', 'L___Income', 'L___2020', 'L___2030', 'L___2040', 'L___2050',
              'G___Fund', 'F___Fund', 'C___Fund', 'S___Fund', 'I___Fund'];
  //            'G___Fund', 'F___Fund', 'i', 'C___Fund', 'i', 'S___Fund', 'i', 'I___Fund'];
  return names.indexOf(cb);
}
function syncTableColumn(idx,name) {
  if ($('#'+name).prop('checked')) {
    $('.col'+idx).show();
  } else {
    $('.col'+idx).hide();
  }
}
function setTableColumn(name,val) {
  var idx = checkBoxColumnID(name);
  if (val) { $('#'+name).prop('checked', true); } else { $('#'+name).prop('checked', false); }
  syncTableColumn(idx,name);
}
function toggleFund(chartName, name) {
  // console.log(name);
  if (name == 'Lfunds') {
    // do L group
    var val = $('#Lfunds').prop('checked');  // get its new value
    console.log('val '+val)
    setTableColumn('L___Income',val);
    setTableColumn('L___2020',val);
    setTableColumn('L___2030',val);
    setTableColumn('L___2040',val);
    setTableColumn('L___2050',val);
    return false;
  }
  if (name == 'InvFunds') {
    var val = $('#InvFunds').prop('checked');  // get its new value
    setTableColumn('G___Fund',val);
    setTableColumn('F___Fund',val);
    setTableColumn('C___Fund',val);
    setTableColumn('S___Fund',val);
    setTableColumn('I___Fund',val);
    return false;
  }
  if (name == 'Index') {
    syncTableColumn(8, 'Index');
    syncTableColumn(10, 'Index');
    syncTableColumn(12, 'Index');
    syncTableColumn(14, 'Index');
    return false;
  }
  var idx = checkBoxColumnID(name);
  syncTableColumn(idx, name);
  checkAnnualReturnsGroup();
  return false;
}
