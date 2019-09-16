{% comment %}
This is the javascript specific to panel 1.
{% endcomment %}
{% assign panelID = include.panelID | default: 1 %}
{% assign panelName = include.panelName | default: 'panel-' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(submit) {
  return true;
};

panelEnter[{{ panelID }}] = function(panel) {
    return true;
}
panelExit[{{ panelID }}] = function(panel) {
    var yearChoosen = $('#review-year').val();
    $('.year-choosen').html(yearChoosen);
    return true;
}

// getContributionLimit moved to javascriptTaxTable.js

$(document ).ready(function() {
if (panelEnter[1]) { panelEnter[1](1); }
if (panelExit[1]) { panelExit[1](1); }
});
-->
</script>
