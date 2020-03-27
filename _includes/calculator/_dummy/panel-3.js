{% comment %}
This is the javascript specific to panel 3.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(submit) {
  return true;
};

panelEnter[{{ panelID }}] = function(panel) {
    // calculate and set values here
    var contributionLimit = getContributionLimit(+reviewYear);
    $('#deferral-limit').html(CurrencyFormatted(contributionLimit, 'no_cent'));
    return true;
}
panelExit[{{ panelID }}] = function(panel) {
    return true;
}
-->
</script>
