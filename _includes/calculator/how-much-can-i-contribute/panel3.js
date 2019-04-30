{% comment %}
This is the javascript specific to panel 3.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign panelName = include.panelName | default: 'panel' | append: panelID %}
<script type="text/javascript">
<!--
panelNames['{{ panelName}}'] = {{ panelID }};
panelGood[{{ panelID }}] = function(submit) {
  return true;
};

panelEnter[{{ panelID }}] = function(panel) {
    // contribution year
    var contributionYear = $('#planYear').val();
    var contributionLimit = getContributionLimit(+contributionYear);
    $('#deferralLimit').html(CurrencyFormatted(contributionLimit, 'no_cent'));
    var totalMade = getPosInteger('totalMade', 0);
    var additionalAmount = getPosInteger('additionalAmount', 0);
    var amountSoFar = +totalMade + +additionalAmount;
    $('#totalContributed').html(CurrencyFormatted(amountSoFar, 'no_cent'));
    var amountAvailable = contributionLimit - amountSoFar;
    $('#amountAvailable').html(CurrencyFormatted(amountAvailable, 'no_cent'));
    var numberPayment = $('#numberPayment').val();
    $('#paymentsRemaining').html(numberPayment);
    var amountPerPayment = amountAvailable / numberPayment;
    $('#newContribution').html(CurrencyFormatted(Math.trunc(amountPerPayment), 'no_cent'));
    return true;
}
panelExit[{{ panelID }}] = function(panel) {
    return true;
}
-->
</script>
