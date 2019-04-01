{% comment %}
This is the javascript specific to panel 1.
{% endcomment %}
{% assign panelID = include.panelID | default: 1 %}
{% assign panelName = include.panelName | default: 'panel' | append: panelID %}
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
    return true;
}

function getContributionLimit(year) {
console.log("Dav: update getContributionLimit before going live");
  if (year == 2019) {
    return 19000;
  }
  return 18500;
/*
19000
100
18500
100
*/

}

$(document ).ready(function() {
if (panelEnter[1]) { panelEnter[1](1); }
if (panelExit[1]) { panelExit[1](1); }
});
-->
</script>
