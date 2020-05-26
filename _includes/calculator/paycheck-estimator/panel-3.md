{% comment %}
Name middle panels (2) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

{% capture trad_glossary %}<span data-term="Traditional Contribution" class="js-glossary-toggle term term-end">Traditional contributions</span>{% endcapture %}
{% capture roth_glossary %}<span data-term="Roth Contribution" class="js-glossary-toggle term term-end">Roth contributions</span>{% endcapture %}
{% capture catch_glossary %}<span data-term="Catch-up Contributions" class="js-glossary-toggle term term-end">Catch-up contributions</span>{% endcapture %}

{% capture trad_explain %}Traditional contributions come out of your pay **before** taxes are calculated; you pay taxes on these contributions and their earnings when you withdraw them.{% endcapture %}
{% capture roth_explain %}Roth contributions come out of your pay **after** taxes are calculated;  you pay no taxes on these contributions when you withdraw them. Roth earnings are also tax-free when withdrawn, as long as you meet the IRS requirements to qualify.{% endcapture %}
{% capture catch_explain %}Only for participants who are age 50 or older. You must first exceed the elective deferral limit ($19,500.00 in 2020) to make catch-up contributions.{% endcapture %}

<section id="panel-{{ panelID }}" class="calculator-panel contribution-election" style="{{ hide }}"  markdown="1">
<h2>TSP Contributions Per Paycheck</h2>
  <div class="usa-grid">

<!-- Scenario 1 -->
<div class="usa-width-one-half scenario">
  <h3>Scenario 1 (required)</h3><!-- Scenario 1, Traditional contributions -->
{% include calculator/paycheck-estimator/panel-3-percent-fixed-block.html side="L" type='trad' option=1 idx=1 divExplain=trad_explain prompt=trad_glossary %}
{% include calculator/paycheck-estimator/panel-3-percent-fixed-block.html side="L" type='roth' option=1 idx=5 divExplain=roth_explain prompt=roth_glossary %}
{% include calculator/paycheck-estimator/panel-3-catch-up-block.html side="L" type='catch' option=1 idx=9 divExplain=catch_explain prompt=catch_glossary %}
</div><!-- end Scenario 1 -->

<!-- Scenario 2 -->
<div class="usa-width-one-half scenario">
  <h3>Scenario 2 (optional)</h3>
  <!-- Scenario 2, Traditional contributions -->
{% include calculator/paycheck-estimator/panel-3-percent-fixed-block.html side="R" type='trad' option=2 idx=1 divExplain=trad_explain prompt=trad_glossary %}
{% include calculator/paycheck-estimator/panel-3-percent-fixed-block.html side="R" type='roth' option=2 idx=5 divExplain=roth_explain prompt=roth_glossary %}
{% include calculator/paycheck-estimator/panel-3-catch-up-block.html side="R" type='catch' option=2 idx=9 divExplain=catch_explain prompt=catch_glossary %}
</div><!-- end Scenario 2 -->

</div><!-- end grid -->

{% capture explanation3_13 %}
Enter the annual rate of return you expect to earn on your contributions. View the [Rates of return]({{ site.baseurl }}/fund-performance/){:target="\_blank"} for context, but keep in mind that past performance is not a guarantee or a predictor of future returns.
{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-3.13" id="annualReturn" inputClass=""  dataFormat="%"
  min="0" value="" max="99" maxLength=7 step="0.01"
  placeholder="" onBlur="annualReturnGood(false);"
  prompt="Expected annual return:"
  explanation=explanation3_13  %}


<div class="usa-grid expected-annual-return">
  <div class="usa-width-one-whole">
    <div class="panel-form-field">
    <ul class="inline-input">
      <li>
      <label class="" for="annualReturn" aria-details="expected-annual-return">Expected annual return:</label>
      <span data-format="%" class="input-symbol-right">
      <input
        id="annualReturn"
        name="annualReturn"
        type="text"
        value=""
        maxlength="7"
        onblur="annualReturnGood();">
      </span>
      </li>
    </ul>
    <!-- Explain this -->
    <ul id="auto" class="usa-accordion explain-this">
    <li>
    <button class="usa-accordion-button"
    aria-expanded="false"
    aria-controls="expected-annual-return">
    Explain this
    </button>
<div id="expected-annual-return" class="usa-accordion-content" markdown="1">
View the [Rates of return]({{ site.baseurl }}/fund-performance/). Past performance is not a guarantee or a predictor of future returns.
</div>
    </li>
    </ul>
    </div><!-- END div.panel-form-field -->
  </div><!-- END div.usa-width-one-whole -->
</div><!-- END div.usa-grid -->

{% include calculator/button-block.html panelID=panelID prev=2 showResults=4 %}

</section>
