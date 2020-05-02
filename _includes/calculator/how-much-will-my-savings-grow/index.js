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
    $('#yearsToContribute').val(5);
    $('#annualPay').val(100000);
    $('#annualPayPercent').val(47);
    $('#annualPayPercent').blur();

    $(document).scrollTop($('#annualPay-div').position().top);

    // set all the fields
    $('#USBRS').click();
    processPanel(1,0,2,0);
    $('#bothGrowth').click();
    $('#yearsServed').val(12);
    $('#DIEMSdate').val('July 17, 2001');
    $('#paySchedule').val('Monthly');
    $('#amountToUse').val(320000);
    $('#annualPayIncreasePercent').val(2);
    $('#catchupAmount').val(375);
    $('#yearsToGo').val(10);
    $('#rateOfReturn').val(2.75);
    processPanel(2,0,3,0);
    $('#resultSelectorCombined').click();
    processPanel(1,0,2,0);
  }
});

-->
</script>
