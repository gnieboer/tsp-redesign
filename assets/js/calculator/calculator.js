/* getQueryString was delivered in paycheckEstimator.js  */
function getQueryString(qs) {
  hu = window.location.search.substring(1);
  gy = hu.split("&");
  for (i=0;i<gy.length;i++) {
    ft = gy[i].split("=");
    if (ft[0] == qs) {
      return ft[1].replace(/%20/g, ' ');
    }
  }
}
/* CurrencyFormatted was delivered in paycheckEstimator.js */
function CurrencyFormatted(num, no_cent) {
  if(isNaN(num)) { num = "0"; }
  num = num.toString().replace(/\$|\,/g,'');
  if(isNaN(num)) { num = "0"; }
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num*100+0.50000000001);
  cents = num%100;
  num = Math.floor(num/100).toString();
  if(cents<10) {
    cents = "0" + cents;
  }
  for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) {
    num = num.substring(0,num.length-(4*i+3))+','+num.substring(num.length-(4*i+3));
  }

  if (no_cent != null && no_cent == 'no_cent') {
    return (((sign)?'':'-') + '$' + num);
  } else {
    return (((sign)?'':'-') + '$' + num + '.' + cents);
  }
}

function showError(element, message) {
  $('#'+element).addClass("usa-input-error");
  // $('#tspError'+element).html(message);
  // $('#tspError'+element).show();
  return false;
}
function clearError(element) {
  $('#'+element).removeClass("usa-input-error");
  // $('#tspError'+element).html("");
  // $('#tspError'+element).hide();
  return true;
}

function getPosFloat(id, def) {
  var val = parseFloat($('#'+id).val());
  if (isNaN(val)) { val = def; }

  return val;
}

function getPosInteger(id, def) {
  var val = parseInt($('#'+id).val());
  if (isNaN(val)) { val = def; }

  return val;
}
