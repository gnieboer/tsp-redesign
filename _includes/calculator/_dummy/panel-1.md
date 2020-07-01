{% comment %}
Inputs panel (1) for Estimate Load Payments.
{% endcomment %}
{% assign panelID = include.panelID | default: 1 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

{% include calculator/button-block.html panelID=panelID next=2 %}

</section> <!-- end div#panel -->
