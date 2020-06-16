{% comment %}
Inputs panel (1) for Estimate Load Payments.
{% endcomment %}
{% assign panelID = include.panelID | default: 1 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

__If you are currently receiving installment payments__ and want to choose a different amount,
use this calculator to estimate how many payments you will receive and how long they will last.

__To project payments from life annuity options__, use the
[TSP Payment and Annuity Calculator]({{ site.baseurl }}/calculators/tsp-payment-and-annuity-calculator/).

{% include calculator/button-block.html panelID=panelID getStarted=2 %}

</section> <!-- end div#panel -->
