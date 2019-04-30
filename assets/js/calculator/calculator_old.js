/*

Do not delete this file before checking with Dav.

I need the contents for reference while porting the calculators.

I expect to remove this file before we go to production.

*/

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

// var warningClass = "warningInput";
var warningClass = "bgYellow";
function isWarning(element) {
  if ($('#'+element).hasClass(warningClass)) { return true; }
  return false;
}

function clearWarning(element) {
  // $('#'+element).removeClass("warningInput");
  $('#'+element).removeClass(warningClass);
  return false;
}
function clearDisabled(element) {
  $('#'+element).removeClass("disabledInput");
  return false;
}
function showWarning(element) {
  // $('#'+element).addClass("warningInput");
  $('#'+element).addClass(warningClass);
  return false;
}
function showDisabled(element) {
  $('#'+element).addClass("disabledInput");
  return false;
}
function showError(element, message) {
  $('#'+element).addClass("errInput");
  $('#'+element).removeClass("regInput");
  $('#tspError'+element).html(message);
  $('#tspError'+element).show();
  return false;
}
function clearError(element) {
  $('#'+element).removeClass("errInput");
  $('#'+element).addClass("regInput");
  $('#tspError'+element).html("");
  $('#tspError'+element).hide();
  return true;
}

function testError(test, id, msg) {
    if (test) { clearError(id); } else { showError(id, msg); }
}

function getPosInteger(id, def) {
  var val = parseInt($('#'+id).val());
  if (isNaN(val)) { val = def; }

  return val;
}

function getPosFloat(id, def) {
  var val = parseFloat($('#'+id).val());
  if (isNaN(val)) { val = def; }

  return val;
}
function disable_warning_icon(warnicon) {
  return;
/*
  // don't do anything right now
  var name = '#WarnOp' + warnicon;
  $(name).attr('src', "/resources/images/yield_icon_disabled.png");
  return false;
  var name = '#WarnOp' + warnicon + 'Span';

  $(name).hide();
  $(name+'D').show();
*/
}
function handleWarnings(cond, messagebox, message, warnicon) {
    // if ($(warnicon).hasClass("errInput")) { return; }  // disable warnings if error
    // var tmp = warnicon + 'D';
    // if (!($(tmp).is(':visible'))) { warnicon = tmp; }
    // if ($(tmp).is(':hidden')) { warnicon = tmp; }
    if (cond) {
        showWarning(messagebox);
        $(warnicon).show();
    }
}

// function disableElement(element) {
//   $('#'+element).attr('disabled','disabled');
//   $('label[for='+element+']').addClass("disabled");
//   return true;
// }
// function enableElement(element) {
//   $('#'+element).removeAttr('disabled');
//   $('label[for='+element+']').removeClass('disabled');
//   return true;
// }
function disableElement(element) {
  $('#'+element).attr('readonly','readonly');
  clearError(element);
  return true;
}
function enableElement(element) {
  $('#'+element).removeAttr('readonly');
  return true;
}
function readOnlyDropdown(element, bool) {
  var length = element.options.length
  var selected = element.selectedIndex;

  for (var i = 0; i < length; i++) {
    if (i != selected) { element.options[i].disabled = bool; }
  }
}

// generic string validation
function stringGood(submit, warn, prefix, id, errorMsg) {
  var myID = prefix + id;
  // if (warn) { clearWarning(myID); }
  clearWarning(myID);
  if ($('#'+myID).length) {
    var val = $.trim($('#'+myID).val());
    $('#lblAYR'+myID).html(val);
    if (val.length > 0) { return clearError(myID); }
  }
  if (submit) { return showError(myID, errorMsg); }
  if (warn) { return showWarning(myID, errorMsg); }
  return clearError(myID);
}

// generic dropdown validation
function ddGood(submit, warn, prefix, id, errorMsg) {
  var myID = prefix + id;
  var val = $('#'+myID).val();
  $('#lblAYR'+myID).html(val);
  if (warn) { if (val == 'Select') { return showWarning(myID, errorMsg); } else { clearWarning(myID); } }
  if (submit == 0) { return clearError(myID); }
  if (val == 'Select') { return showError(myID, errorMsg); }
  return clearError(myID);
}


// remove troublesome characters (MS WORD) from an input field, return the string.
function launderString(string) {
    // smart single quotes and apostrophe
    string = string.replace(/[\u2018|\u2019|\u201A]/g, "\'");
    // smart double quotes
    string = string.replace(/[\u201C|\u201D|\u201E]/g, "\"");
    // ellipsis
    string = string.replace(/\u2026/g, "...");
    // dashes
    string = string.replace(/[\u2013|\u2014]/g, "-");
    // circumflex
    string = string.replace(/\u02C6/g, "^");
    // open angle bracket
    string = string.replace(/\u2039/g, "");
    // spaces
    string = string.replace(/[\u02DC|\u00A0]/g, " ");

    string = string.replace('&', " ");

    return string;
}
// fetch input field value, clean it, reset it, return it
function launderInput(field) {
  var val = launderString($.trim($('#'+field).val()));
  $('#'+field).val(val);
  return val;
}
