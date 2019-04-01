{% assign maxPanels = include.maxPanels | 1 %}
<script type="text/javascript">
<!--

$(".precision").numeric({ negative : false, decimalPlaces: 2 });
$(".positiveinteger").numeric({ negative : false, decimalPlaces: 0 });
$(".positivefloat").numeric({ negative : false, decimalPlaces: 2 });

$(document).ready(function() {
  // alert('document ready');
  setMaxPanels({{ maxPanels }});
  showPanel(1);
  /*
  var showP = 1;
  //if (!panelGood[1](1)) { showP = 1; }
  //if (!panelGood[2](1)) { showP = 2; }
  //if (!panelGood[3](1)) { showP = 3; }
  showPanel(showP);
  */
});
-->
</script>
