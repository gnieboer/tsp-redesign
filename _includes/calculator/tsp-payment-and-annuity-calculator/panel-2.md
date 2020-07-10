{% comment %}
Name middle panels (2) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %} 
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}"  markdown="1">

Answer all of the questions in this calculator to help you decide which monthly income options and features meet your needs. At the end, you will be able to view and compare all your monthly income options.


{% capture explanation_2_1 %}
For example: If your TSP account balance at retirement is $500,000, and you take a <span data-term="Partial Withdrawal" class="js-glossary-toggle term term-end">partial withdrawal</span> of $100,000 to buy a home, you will have $400,000 available for monthly income.
{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.1" id="amountToUse"  anchor="panel2"
  inputClass=""  dataFormat="$"
  min="0" value="" max="99999999" maxLength=8 step="1"
  placeholder="" onBlur="amountToUseGood(false);"
  prompt="What amount from your TSP account do you want to use for monthly income?"
  explanation=explanation_2_1
%}

{% include calculator/button-block.html panelID=panelID prev=1 next=3 %}


{% capture textBlock_2_1 %}
Use the [How much will my savings grow?](/calculators/how-much-will-my-savings-grow/) calculator to estimate what your account balance will be when you are ready to retire.
{% endcapture %}
{% include calculator/infoBox.html icon='info' title="Don’t know what your balance will be at retirement?"  textBlock=textBlock_2_1 %}

{% capture textBlock_2_2 %}
Log into [My Account]({{ site.myaccount }}) to find your current account balance, or call the ThriftLine at <span class='nobr'>1-877-968-3778</span>.
{% endcapture %}
{% include calculator/infoBox.html icon='info' title="Ready to retire now?" textBlock=textBlock_2_2 %}

</section>
