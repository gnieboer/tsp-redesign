{% comment %}
Inputs panel (1) for Estimate Load Payments.
{% endcomment %}
{% assign panelID = include.panelID | default: 1 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

{% capture FERS %}<span data-term="Federal Employees' Retirement System (FERS)" class="js-glossary-toggle term term-end">FERS</span>,{% endcapture %}
{% capture CSRS %}<span data-term="Civil Service Retirement System (CSRS)" class="js-glossary-toggle term term-end">CSRS</span>,{% endcapture %}
{% capture USBRS %}<span data-term="Uniformed Services" class="js-glossary-toggle term term-end">Uniformed Services: BRS</span>,{% endcapture %}
{% capture US %}<span data-term="Non-BRS Uniformed Services" class="js-glossary-toggle term term-end">Uniformed Services: non-BRS</span>,{% endcapture %}
{% capture BP %}<span data-term="Beneficiary Participant" class="js-glossary-toggle term term-end">Beneficiary Participant</span>{% endcapture %}
{% assign radioLabelList = FERS | append: CSRS | append: USBRS | append: US | append: BP %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-1.1" id="rs" anchor="system"
  inputType="radio" radioIDs="FERS, CSRS, USBRS, US, BP"
  radioLabels=radioLabelList
  inputClass="usa-unstyled-list"
  onBlur="rsGood();"
  prompt="Retirement system"
  explanation=""
%}

{% include calculator/button-block.html panelID=panelID next=2 %}

</section> <!-- end div#panel -->
