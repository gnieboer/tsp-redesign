{% assign maxPanels = include.maxPanels | 1 %}
<script type="text/javascript">
<!--

function initValues(def) {
  var doSetValues = getQueryString('doSetValues');
  if (typeof doSetValues === 'undefined') { doSetValues = def; }
  if (doSetValues) {
    setValues(doSetValues);
  }
}

function setValues(flag) {
  if (flag == 1) {
    console.log('selecting options to show maximum contribution exceeded');
    $('#CSRS').click();
    processPanel(1,0,2,0);
  }
  if (flag == 2) {
    setValues(1);
    processPanel(2,0,3,0);
  }
}

$(document).ready(function() {
  $('#resultSelectorCombined').click();
  setMaxPanels({{ maxPanels }});
  showPanel(1);

  initValues(0);
});

-->
</script>
