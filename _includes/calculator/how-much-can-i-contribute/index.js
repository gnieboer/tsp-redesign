{% assign maxPanels = include.maxPanels | 1 %}
<script type="text/javascript">
<!--

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
