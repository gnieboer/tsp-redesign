{% comment %}
Name middle panels (2) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}"  markdown="1">


{% include calculator/button-block.html panelID=panelID prev=1 next=3 %}

{% include calculator/button-block.html panelID=panelID prev=1 showResults=3 %}

</section>
