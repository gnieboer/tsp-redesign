{% comment %}
This is the javascript specific to panel 2.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign panelName = include.panelName | default: 'panel' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(submit) {
  return totalContributionGood(true, true);
};

panelEnter[{{ panelID }}] = function(panel) {
  // getPrimeSettingsGrowth();
  totalContributionGood(false, false);
  setYearValues();
  return true;
}
panelExit[{{ panelID }}] = function(panel) {
  // testPrimeSettingsGrowth();
    return true;
}

function setYearValues() {
  var planYear = $('#planYear').val();
  $('#yearA').html(planYear);
  $('#yearB').html(planYear);
  $('#contributionYear').html(planYear);
  $('#yearD').html(planYear);
  $('#yearE').html(planYear);
  $('#yearF').html(planYear);
  $('#yearG').html(planYear);
}

function totalMadeGood(contributionLimit, planYear, forceValue) {
  var def = 0;
  if (forceValue) { def = -1; }
  var totalMade = getPosInteger('totalMade', def);

  if (totalMade < 0) {
    return showError('totalMade', "Please enter the amount that you have contributed so far this year.");
  }
  if (totalMade > contributionLimit) {
    return showError('totalMade', "The amount you entered exceeds " + CurrencyFormatted(contributionLimit, 'no_cent')
        + ", the IRS elective deferral limit for " + planYear + ".");
  }

  return clearError('totalMade');
}

function additionalAmountGood(contributionLimit, planYear, forceValue) {
  var def = 0;
  if (forceValue) { def = -1; }
  var additionalAmount = getPosInteger('additionalAmount', def);

  if (additionalAmount < 0) {
    return showError('additionalAmount', "Please enter the additional amount you expect to contribute before your new election takes effect.");
  }
  if (additionalAmount > contributionLimit) {
    return showError('additionalAmount', "The amount you entered exceeds " + CurrencyFormatted(contributionLimit, 'no_cent')
        + ", the IRS elective deferral limit for " + planYear + ".");
  }

  return clearError('additionalAmount');
}

function totalContributionGood(forceTotal, forceAdditional) {
  var totalMade = getPosInteger('totalMade', 0);
  var additionalAmount = getPosInteger('additionalAmount', 0);
  var planYear = getPosInteger('planYear', 2019);
  var contributionLimit = getContributionLimit(planYear);

  var rc = totalMadeGood(contributionLimit, planYear, forceTotal) & additionalAmountGood(contributionLimit, planYear, forceAdditional);

  if (rc) {
    if ((totalMade + additionalAmount) > contributionLimit) {
      var msg = "The combined total of Items A and B cannot exceed " + CurrencyFormatted(contributionLimit, 'no_cent')
        + ", the IRS elective deferral limit for " + planYear + ".";
      showError('totalMade', msg);
      return showError('additionalAmount', msg);
    }
  }

  return rc;
}

-->
</script>
