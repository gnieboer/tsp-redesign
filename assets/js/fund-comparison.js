// show/hide all the cells of the supplied class
function toggleCells(cb, className) {
  if (cb.checked) {
    $('.'+className).show();
  }  else {
    $('.'+className).hide();
  }
  return true;
}

function toggleColumn(cb, className) {
  var checkCount = $("input[name='fundCB']:checked").length;
  if (checkCount >= 3) {
    $("input[name='fundCB']").attr('disabled', 'disabled');
    $("input[name='fundCB']:checked").removeAttr('disabled');
  } else {
    $("input[name='fundCB']").removeAttr('disabled');
  }
  return toggleCells(cb, className);
}

function clickFund(idx) {
  $('#compare-show-col'+idx).click();
}

function toggleRow(cb, className) { return toggleCells(cb, className); }
