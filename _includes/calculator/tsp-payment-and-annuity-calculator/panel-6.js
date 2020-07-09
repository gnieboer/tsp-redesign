{% comment %}
This is the javascript specific to panel 3.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(forceValue) {
  return true;
};

panelEnter[{{ panelID }}] = function(panel) {
    // calculate and set values here
    // $('#account-depleted').html(CurrencyFormatted(contributionLimit, 'no_cent'));
    return true;
}
panelExit[{{ panelID }}] = function(panel) {
    return true;
}

function resultSetSelect() {
  var idList = ['resultSetOverview','resultSetMonthly','resultSetSingle','resultSetSpouse','resultSetOther'];
  idList.forEach(function(idx) {
     if ($('#'+idx).prop('checked')) { $('#section-'+idx).removeClass('hide'); } else { $('#section-'+idx).addClass('hide'); }
   });
}
-->
</script>
