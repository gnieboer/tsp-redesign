{% comment %}
Elective Deferral Limits panel (3) for How Much Can I Contribute?.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<div id="panel{{ panelID }}" class="calculatorPanel" style="{{ hide }}" markdown="1">

**A summary of your computations based on the data you entered is shown below.**

{% include calculator/infoBox.html icon='info'
    title="Maximizing Agency or Service Contributions"
    textBlock="To receive the maximum Agency or Service Matching Contributions, you must contribute 5% of your basic pay each pay period."
%}

{% include calculator/infoBox.html icon='info'
    title="Warning: Accuracy of Results"
    textBlock="This calculator can provide you with a reasonable estimate. However, calculations may vary from actual contribution amounts because of a variety of factors influencing your pay (including pay increases) and the accuracy of the input."
%}


<div class="calculatorInnerBox" markdown="1">

{% include calculator/inputRow.html inputType="value" id="contributionYear" right="2000"
  left="Contribution year" %}
{% include calculator/inputRow.html inputType="value" id="deferralLimit" right="2000"
  left="IRS Elective Deferral Limit for <span id='yearE'>YYYY</span>" %}
{% include calculator/inputRow.html inputType="value" id="totalContributed" right="2000"
  left="How much you will have contributed before your new amount is effective" %}
{% include calculator/inputRow.html inputType="value" id="amountAvailable" right="2000"
  left="Amount you can still contribute this year" %}
{% include calculator/inputRow.html inputType="value" id="paymentsRemaining" right="2000"
  left="Number of salary payments remaining in <span id='yearF'>YYYY</span>" %}

{% capture newAmountTextBlock %}
<div style="width: 80%"><strong>Here’s the new amount you can contribute each remaining pay period if you
want to maximize your contributions for <span id='yearG'>YYYY</span></strong> (rounded down to the nearest dollar).
<br><br>
To change how much you contribute, log into your payroll system and select the Thrift Savings Plan option. Common payroll systems include
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx= 6"
  title="myPay website opens in a new window.">myPay</a>,
EBIS,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=44"
  title="Employee Personal Page website opens in a new window.">Employee Personal Page</a>,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=45"
  title="Employee Express website opens in a new window.">Employee Express</a>,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=46"
  title="LiteBlue website opens in a new window.">LiteBlue</a>,
and <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=47"
  title="Direct Access website opens in a new window.">Direct Access</a>.
</div>
{% endcapture %}
{% include calculator/inputRow.html inputType="value" id="newContribution" right="2000"
  left=newAmountTextBlock %}

</div>

{% include calculator/buttonBlock.html panelID=panelID revise=2 %}

</div>
