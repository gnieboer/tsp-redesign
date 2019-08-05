var fundDates = flatpickr("#fundDates", {
  mode: "range",
  // altInput: true,
  // altFormat: "F j, Y",
  // dateFormat: "Y-m-d",
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
console.log('getSharePrices');
  // var fundDates = document.querySelector("#fundDates")._flatpickr;
  var sDate = fundDates.selectedDates[0];
  var eDate = fundDates.selectedDates[1];
  if ((sDate == null) || (eDate == null)) { console.log('ignore'); return false; }
  console.log(toYYYYMMDD(sDate), toYYYYMMDD(eDate));
  return false;
}

function downloadSharePrices() {
console.log('downloadSharePrices');
  // var fundDates = document.querySelector("#fundDates")._flatpickr;
  var sDate = fundDates.selectedDates[0];
  var eDate = fundDates.selectedDates[1];
  if ((sDate == null) || (eDate == null)) { console.log('ignore'); return false; }
  var startdate = toYYYYMMDD(sDate);
  var enddate = toYYYYMMDD(eDate);
  var format = 'CSV';
  var funds = ['Lfunds', 'S'];

  doSharePriceDownload(startdate, enddate, format, funds);
  return false;
}
