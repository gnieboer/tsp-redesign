prop{% comment %}
This is the javascript specific to panel 1.
{% endcomment %}
{% assign panelID = include.panelID | default: 1 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
  return rsGood(true);
};

panelEnter[{{ panelID }}] = function(panel) {
  return true;
}
panelExit[{{ panelID }}] = function(panel) {
  rsExit();
  return true;
}

// my functions
function rsShowHide(rs) {
  if (rs == 'USBRS') {
    hideServiceSoFar(false);
  } else {
    hideServiceSoFar(true);
  }

  if (rs == 'BP') {
    hideFuture(true);
    hideGrowth(true);
    return;
  }

  if ((rs == 'FERS') || (rs == 'CSRS')) {
    hidePaySchedule(false);
  } else {
    hidePaySchedule(true);
  }

  hideGrowth(false);
/*
  $('#SelectGrowth').show();
  $('#FutureContributionsResult1').show();
  $('#FutureContributionsResult2').show();
  $('#FutureContributions').show();
*/
  return;
}

function rsExit() {

  if ($('#FERS').prop('checked')) {
    rsShowHide('FERS');
    $('#retirementSystem').html('FERS');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('FERS');
    return clearError('rs');
  }

  if ($('#CSRS').prop('checked')) {
    rsShowHide('CSRS');
    $('#retirementSystem').html('CSRS');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('CSRS');
    return clearError('rs');
  }

  if ($('#US').prop('checked')) {
    rsShowHide('US');
    $('#retirementSystem').html('Uniformed Services: All Other Systems');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('US');
    return clearError('rs');
  }

  if ($('#USBRS').prop('checked')) {
    rsShowHide('USBRS');
    $('#retirementSystem').html('Uniformed Services: Blended Retirement System');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('USBRS');
    return clearError('rs');
  }

  if ($('#BP').prop('checked')) {
    rsShowHide('BP');
    $('#retirementSystem').html('Beneficiary Participant');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('BP');
    return clearError('rs');
  }

  console.log('still in rsExit()');
  return showError('rs', "Select your retirement system.");
}

function getRetirementSystem() {
  if ($('#FERS').prop('checked')) { return 'FERS'; }
  if ($('#CSRS').prop('checked')) { return 'CSRS'; }
  if ($('#US').prop('checked')) { return 'US'; }
  if ($('#USBRS').prop('checked')) { return 'USBRS'; }
  if ($('#BP').prop('checked')) { return 'BP'; }
  return '';
}

function rsGood(submit) {
  var rs = getRetirementSystem();
  if (rs == '') {
    if (submit) { return showError('rs', "Select your retirement system."); }
  }
  return clearError('rs');
}

-->
</script>
