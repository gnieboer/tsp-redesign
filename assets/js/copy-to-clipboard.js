// added by Dav to include posted text
function copyPlanNewsToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#'+element).text() + ' ' + $('#'+element+'_posted').text()).select();
  document.execCommand("copy");
  // $temp.remove();

  var tooltip = document.getElementById("myTooltip_"+element);
  tooltip.innerHTML = "Copied!";
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#'+element).text()).select();
  document.execCommand("copy");
  // $temp.remove();

  var tooltip = document.getElementById("myTooltip_"+element);
  tooltip.innerHTML = "Copied!";
}

// ref: https://codepen.io/shaikmaqsood/pen/XmydxJ


// Adapting the tooltip functionality for use with the function above.
function myFunction(element) {
  var copyText = document.getElementById("myInput_"+element);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");

  var tooltip = document.getElementById("myTooltip_"+element);
  tooltip.innerHTML = "Copied: " + copyText.value;
}

// Using outFunc() with copyToClipboard(element)
function outFunc(element) {
  var tooltip = document.getElementById("myTooltip_"+element);
  tooltip.innerHTML = "Copy to clipboard";
}

// ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_copy_clipboard2
