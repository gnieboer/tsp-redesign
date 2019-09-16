{% comment %}
Elective Deferral Limits panel (3) for How Much Can I Contribute?.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign hide = 'display: block;' %}
{% assign gridClass2 = include.gridClass2 | default: 'results' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<div id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

**A summary of your computations based on the data you entered is shown below.**

{% include calculator/infoBox.html icon='info'
    title="Maximizing Agency or Service Contributions"
    textBlock="To receive the maximum Agency or Service Matching Contributions, you must contribute 5% of your basic pay each pay period."
%}

{% include calculator/infoBox.html icon='info'
    title="Warning: Accuracy of Results"
    textBlock="This calculator can provide you with a reasonable estimate. However, calculations may vary from actual contribution amounts because of a variety of factors influencing your pay (including pay increases) and the accuracy of the input."
%}


<div class="results-grid-frame">
{% include calculator/resultsRow.html left="Contribution year"
                                      rightID="contribution-year" right="<span class='year-choosen'>YYYY</span>" %}
{% include calculator/resultsRow.html rightID="deferral-limit" right=""
  left="IRS Elective Deferral Limit for <span class='year-choosen'>YYYY</span>" %}
{% include calculator/resultsRow.html rightID="total-contributed" right=""
  left="How much you will have contributed before your new amount is effective" %}
{% include calculator/resultsRow.html rightID="amount-available" right=""
  left="Amount you can still contribute this year" %}
{% include calculator/resultsRow.html rightID="payments-remaining" right=""
  left="Number of salary payments remaining in <span class='year-choosen'>YYYY</span>" %}

{% capture newAmountTextBlock %}

<strong>Here’s the new amount you can contribute each remaining pay period if you
want to maximize your contributions for <span class='year-choosen'>YYYY</span></strong>
(rounded down to the nearest dollar).

<p>To change how much you contribute, log into your payroll system and select the Thrift Savings Plan option. Common payroll systems include <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx= 6"
  title="myPay website opens in a new window.">myPay</a>, EBIS,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=44"
  title="Employee Personal Page website opens in a new window.">Employee Personal Page</a>,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=45"
  title="Employee Express website opens in a new window.">Employee Express</a>,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=46"
  title="LiteBlue website opens in a new window.">LiteBlue</a>,
and <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=47"
  title="Direct Access website opens in a new window.">Direct Access</a>.</p>

{% endcapture %}
{% include calculator/resultsRow.html rightID="new-contribution" right="" left=newAmountTextBlock %}

  </div>

{% include calculator/button-block.html panelID=panelID revise=2 %}

</div>
