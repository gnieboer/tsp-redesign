function show(prefix, suffix) {
  var element = document.getElementById(prefix+'-'+suffix);
  var accordion = document.getElementById(prefix+'-content-'+suffix);
  if (element.hasClass('down')) {
    accordion.show();
  } else {
    accordion.hide();
  }
   element.classList.toggle("down");
}

function showMorePlans(type, formNum) {
  var controlDiv = 'more-'+type+'-'+formNum;
  var contentDiv = 'more-'+type+'-content-'+formNum;
  if ($('#'+controlDiv).hasClass('down')) {
    $('#'+contentDiv).addClass('hide');
    $('#'+controlDiv).removeClass('down');
  } else {
    $('#'+contentDiv).removeClass('hide');
    $('#'+controlDiv).addClass('down');
  }
}
