{% assign maxPanels = include.maxPanels | 1 %}
<script type="text/javascript">
<!--

$(".precision").numeric({ negative : false, decimalPlaces: 2 });
$(".positiveinteger").numeric({ negative : false, decimalPlaces: 0 });
$(".positivefloat").numeric({ negative : false, decimalPlaces: 2 });

$(document).ready(function() {
  console.log('calculator dummy document ready');
  setMaxPanels({{ maxPanels }});
  showPanel(1);
});
-->
</script>
