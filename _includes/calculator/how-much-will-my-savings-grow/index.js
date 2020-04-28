{% assign maxPanels = include.maxPanels | 1 %}
<script type="text/javascript">
<!--

$(document).ready(function() {
  setMaxPanels({{ maxPanels }});
  showPanel(1);

  if (1) {
    console.log('selecting options to show maximum contribution exceeded');
    $('#CSRS').click();
    processPanel(1,0,2,0);
    $('#futureOnly').click();
    $('#yearsToContribute').val(10);
    $('#annualPay').val(100000);
    $('#annualPayPercent').val(47);
    $('#annualPayPercent').blur();

    $(document).scrollTop($('#annualPay-div').position().top);
  }
});

-->
</script>
