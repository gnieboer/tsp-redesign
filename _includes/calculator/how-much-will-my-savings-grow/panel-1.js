prop{% comment %}
This is the javascript specific to panel 1.
{% endcomment %}
{% assign panelID = include.panelID | default: 1 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
  return rsGood();
};

panelEnter[{{ panelID }}] = function(panel) {
  return true;
}
panelExit[{{ panelID }}] = function(panel) {
  rsExit();
  return true;
}

// my functions
function rsBPshowHide(show) {
  if (show) {
    $('#SelectGrowth').show();
    $('#FutureContributionsResult1').show();
    $('#FutureContributionsResult2').show();
    $('#FutureContributions').show();
  } else {
    $('#FutureContributions').hide();
    $('#FutureContributionsResult1').hide();
    $('#FutureContributionsResult2').hide();
    $('#SelectGrowth').hide();
    set_gc('balanceOnly');
  }
}

function rsShowHide(rs) {
  if (rs == 'USBRS') {
    $('#serviceSoFar').show();
    $('#serviceSoFarAYR').show();
  } else {
    $('#serviceSoFar').hide();
    $('#serviceSoFarAYR').hide();
  }

  if (rs == 'BP') {
    $('#FutureContributions').hide();
    $('#FutureContributionsResult1').hide();
    $('#FutureContributionsResult2').hide();
    $('#SelectGrowth').hide();
    set_gc('balanceOnly');
    return;
  }

  $('#SelectGrowth').show();
  $('#FutureContributionsResult1').show();
  $('#FutureContributionsResult2').show();
  $('#FutureContributions').show();
  return;
}

function rsExit() {

  if ($('#FERS').prop('checked')) {
    $('#payScheduleDropDown').show();
    rsShowHide('FERS');
    $('#retirementSystem').html('FERS');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('FERS');
    return clearError('rs');
  }

  if ($('#CSRS').prop('checked')) {
    $('#payScheduleDropDown').show();
    rsShowHide('CSRS');
    $('#retirementSystem').html('CSRS');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('CSRS');
    return clearError('rs');
  }

  if ($('#US').prop('checked')) {
    $('#payScheduleDropDown').hide();
    rsShowHide('US');
    $('#retirementSystem').html('Uniformed Services: All Other Systems');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('US');
    return clearError('rs');
  }

  if ($('#USBRS').prop('checked')) {
    $('#payScheduleDropDown').hide();
    rsShowHide('USBRS');
    $('#retirementSystem').html('Uniformed Services: Blended Retirement System');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('USBRS');
    return clearError('rs');
  }

  if ($('#BP').prop('checked')) {
    $('#payScheduleDropDown').show();
    rsShowHide('BP');
    $('#retirementSystem').html('Beneficiary Participant');
    $('#lblAYRretirementSystem').html($('#retirementSystem').html());
    set_FC_text('BP');
    return clearError('rs');
  }

  console.log('still in rsExit()');
  return showError('rs', "Select your retirement system.");
}

function rsGood() {
console.log('in rsGood()');
  if ($('#FERS').prop('checked')) { return clearError('rs'); }
  if ($('#CSRS').prop('checked')) { return clearError('rs'); }
  if ($('#US').prop('checked')) { return clearError('rs'); }
  if ($('#USBRS').prop('checked')) { return clearError('rs'); }
  if ($('#BP').prop('checked')) { return clearError('rs'); }
  console.log('still in rsGood()');
  return showError('rs', "Select your retirement system.");
}

-->
</script>
