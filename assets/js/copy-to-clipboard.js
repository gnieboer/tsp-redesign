// added by Dav to include posted text
function copyPlanNewsToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#'+element+'-div').text() + ' ' + $('#'+element+'-posted').text()).select();
  document.execCommand("copy");
  // $temp.remove();

  var tooltip = document.getElementById("tooltip_"+element);
  tooltip.innerHTML = "Copied!";
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#'+element).text()).select();
  document.execCommand("copy");
  // $temp.remove();

  var tooltip = document.getElementById("tooltip_"+element);
  tooltip.innerHTML = "Copied!";
}

function inputToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#'+element).val()).select();
  document.execCommand("copy");
  // $temp.remove();
}

// ref: https://codepen.io/shaikmaqsood/pen/XmydxJ

// Using outFunc() with copyToClipboard(element)
function outFunc(element) {
  var tooltip = document.getElementById("tooltip_"+element);
  tooltip.innerHTML = "Copy to clipboard";
}

// ref: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_copy_clipboard2
