{% comment %}
This is the javascript specific to panel 2.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
  return amountToUseGood(forceValue);
};

panelEnter[{{ panelID }}] = function(panel) {
  return true;
}
panelExit[{{ panelID }}] = function(panel) {
  // testPrimeSettingsGrowth();
    return true;
}

// my functions
function amountToUseGood(submit) {
  if (!submit) {
    if ($("#amountToUse").val() == '') { return clearError('amountToUse'); }
  }
  var amountToUse = getPosInteger('amountToUse', -1);
  if (amountToUse > 0) { $('#amountToUse').val(amountToUse); }

  if (amountToUse < 0.0) {
    return showError('amountToUse', "Amount from your TSP account to use for monthly income is required.");
  }
  if (amountToUse < 3500.0) {
    return showError('amountToUse',
                     "You must enter at least $3,500 in this field in order to receive all the monthly retirement income estimates from this calculator.");
  }
  if (amountToUse > 99999999.0) {
    return showError('amountToUse', "Amount to use must be between $3,500 and $99,999,999.");
  }
  $('#amountToUseAYR').html(CurrencyFormatted(amountToUse));
  return clearError('amountToUse');
}
-->
</script>
