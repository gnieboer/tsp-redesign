{% comment %}
Results NAME panel (3) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign hide = 'display: block;' %}
{% assign gridClass2 = include.gridClass2 | default: 'results' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<!-- PANEL 2 -->
<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

{% capture beforeApplyTextBlock %}
Read the TSP booklet [Loans]({{ site.baseurl }}/publications/tspbk04.pdf){:.publication} for information about the TSP loan process (including the cost of a TSP loan) and about your obligations to repay the loan. To initiate a Loan Request, visit [TSP Loans](https://www.tsp.gov/tsp/loan.do?subaction=menu&amp;_name=loan){:.external-link} in My Account.
{% endcapture %}
{% include calculator/infoBox.html icon='info'
    title="Before you apply for a loan"
    textBlock=beforeApplyTextBlock
%}

**Estimated loan terms (actual terms may vary)**

<div class="results-grid-frame" markdown="1">

{% include calculator/resultsRow.html rightID="employment-category" right="" left="Employment Category" %}
{% include calculator/resultsRow.html rightID="loan-amount" right="" left="Loan Amount" %}
{% include calculator/resultsRow.html rightID="type" right="" left="Type" %}
{% include calculator/resultsRow.html rightID="repayment-terms" right="" left="Repayment Terms" %}
{% include calculator/resultsRow.html rightID="repayment-frequency" right="" left="Repayment frequency" %}
{% include calculator/resultsRow.html rightID="interest-rate" right="" left="Interest rate" %}
{% include calculator/resultsRow.html rightID="payment-amount" right="" left="Payment amount" %}
{% include calculator/resultsRow.html rightID="number-payments" right="" left="Number of payments" %}
{% include calculator/resultsRow.html rightID="total-interest" right=""
  left="Total interest (finance charge)" %}
{% include calculator/resultsRow.html rightID="total-cost" right=""
  left="Total loan cost (total payment)" %}

</div> <!-- end div.results-grid-frame -->

{% include calculator/button-block.html panelID=panelID revise=1 %}
</section>  <!-- end section#panel-2 -->


{% comment %}
Put disclaimer at bottom of last panel outside the section and it will never be hidden.
{% endcomment %}
DISCLAIMER: This calculator is provided for informational purposes only. It is not intended to be used as an investment advisory tool or as a guarantee of a final account balance. Please note that the results shown at the end of this calculator assume that elected contributions are made for the entire year. Results do not take into account the following Internal Revenue Code (IRC) limits: <span data-term="Elective Deferral Limit" class="js-glossary-toggle term term-end">elective deferral</span>, <span data-term="Section 415(c) Limit" class="js-glossary-toggle term term-end">section 415(c)</span>, and <span data-term="Catch-Up Contribution Limit" class="js-glossary-toggle term term-end">catch-up contribution</span>. These limits, which may change every year, determine the maximum annual amount that you and/or your employing agency can contribute to the TSP on your behalf. You can view the current year's limits on the TSP website under [News and resources]({{ site.baseurl }}/news-and-resources/).
{:.disclaimer}
