{% comment %}
Results NAME panel (3) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign hide = 'display: block;' %}
{% assign gridClass2 = include.gridClass2 | default: 'results' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

{% include calculator/infoBox.html icon='info'
    title="Maximizing Agency or Service Contributions"
    textBlock="To receive the maximum Agency or Service Matching Contributions, you must contribute 5% of your basic pay each pay period."
%}


<div class="results-grid-frame" markdown="1">
{% include calculator/resultsRow.html rightID="deferral-limit" right=""
  left="IRS Elective Deferral Limit for <span class='year-choosen'>YYYY</span>" %}
{% include calculator/resultsRow.html rightID="total-contributed" right=""
  left="How much you will have contributed before your new amount is effective" %}

{% capture newAmountTextBlock %}

**Here’s the new amount you can contribute each remaining pay period if you
want to maximize your contributions for <span class='year-choosen'>YYYY</span>**
(rounded down to the nearest dollar).

To change how much you contribute, log into your payroll system and select the Thrift Savings Plan option. Common payroll systems include

[Direct Access]({{ site.baseurl }}/exit/?idx=47){:rel="nofollow"}, [Employee Express]({{ site.baseurl }}/exit/?idx=7){:rel="nofollow"}, EBIS, [LiteBlue]({{ site.baseurl }}/exit/?idx=8){:rel="nofollow"}, [myPay]({{ site.baseurl }}/exit/?idx=6){:rel="nofollow"}, and [NFC EPP]({{ site.baseurl }}/exit/?idx=9){:rel="nofollow"}.

{% endcapture %}
{% assign newAmountTextBlock = newAmountTextBlock | markdownify %}
{% include calculator/resultsRow.html rightID="new-contribution" right="" left=newAmountTextBlock %}

  </div>

{% include calculator/button-block.html panelID=panelID revise=2 %}

</section>
