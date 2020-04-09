{% comment %}
Name middle panels (2) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}"  markdown="1">

{% include calculator/div-panel-form-field.html
  fieldID="panel-2.1" id="growthSelector"
  inputType="radio" radioIDs="balanceOnly, futureOnly, bothGrowth"
  radioLabels="Existing account balance, Future contributions, Both"
  inputClass="usa-unstyled-list"
  onBlur="selectedGrowth(this.id);"
  prompt="Growth model"
  explanation="
  This calculator will show you the growth of your current account balance, growth of future contributions from your paycheck, or both. You must select a growth model.
  "
%}

{% capture explanation2_2 %}
Log in to [My Account]({{ site.myaccount }}){:target="\_blank"} to see your current account balance.
{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.2" id="amountToUse"
  inputClass=""  dataFormat="$" H2="Existing account balance"
  min="0" value="" max="5000000" maxLength=7 step="1"
  placeholder="" onBlur="amountToUseGood(true);"
  prompt="Enter the amount you already have in your TSP account:"
  explanation=explanation2_2
%}

{% comment %}Start of multi-input block Future Contrib.  We must close <div> at end{% endcomment %}
{% capture explanation2_3 %}
You may begin contributing to the TSP (through payroll contributions) as soon as you are hired. You also receive <span data-term="Agency Automatic (1%) Contributions" class="js-glossary-toggle term term-end">Agency Automatic (1%) Contributions</span> and are eligible to receive <span data-term="Agency Matching Contributions" class="js-glossary-toggle term term-end">Agency Matching Contributions</span>. Note: Newly hired or rehired FERS employees are automatically enrolled to contribute 3% of basic pay unless they elect otherwise. For more information on agency contributions, see [Contribution types]({{ site.baseurl }}/making-contributions/contribution-types/).
{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.3" inputType="none" H2="Future contributions"
  explanation=explanation2_3  dontCloseOuterDiv=true
%}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.4" id="yearsToContribute"
  min="0" value="" max="99" maxLength=2 step="1"
  placeholder="" onBlur="yearsToContributeGood();"
  prompt="Enter the number of years you plan to contribute:"
  explanation=''  dontOpenOuterDiv=true
%}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.5" id="annualPay"
  inputClass=""  dataFormat="$"
  min="1" value="" max="1000000" maxLength=7 step="1"
  placeholder="" onBlur="annualPayGood();"
  prompt="Annual pay:"
  explanation="
  Enter the gross amount of basic pay you receive each year. **Note:** Uniformed services members can contribute from incentive, special, and bonus pay &#8212; civilians cannot.
  "
  dontOpenOuterDiv=true
%}
{% capture pay_schedule_explanation %}

This will depend on how often you are paid (biweekly or monthly, for example). If you are uncertain, check with your personnel or finance office.

<table class="pay-schedule-table">
<thead>
<tr><th scope="col">Payment Frequency</th><th scope="col">Number of Salary Payments</th></tr>
</thead>
<tbody>
<tr><td>Biweekly</td><td>26*</td></tr>
<tr><td>Monthly</td><td>12</td></tr>
<tr><td>Weekly</td><td>52</td></tr>
<tr><td>Semimonthly</td><td>24</td></tr>
</tbody></table>

\*A biweekly frequency occasionally results in 27 salary payments for a year.  Contact your personnel or payroll office if you do not know the number of salary payments you will receive for the remainder of the year.

{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.6" id="paySchedule"
  inputType="selectList"
  radioIDs="Select,Biweekly,Weekly,Semi-monthly,Monthly"
  radioLabels="Select your pay schedule,Biweekly (every 2 weeks&comma; 26 times a year),Weekly (52  times a year),Semi-monthly (twice a month&comma; 24 times a year),Monthly (12  times a year)"
  inputClass="" outerDivID="paySchedule-hide"
  onBlur="payScheduleGood(this);" prompt="Pay schedule:"
  explanation=pay_schedule_explanation dontOpenOuterDiv=true
%}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.7" id="annualPayPercent"
  inputClass=""  dataFormat="%"
  min="0" value="" max="99" maxLength=5 step="0.01"
  placeholder="" onBlur="annualPayPercentGood();"
  prompt="Enter the whole percentage of annual pay that you would like to save:"
  explanation=""   dontOpenOuterDiv=true
%}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.8" id="annualPayIncreasePercent"
  inputClass=""  dataFormat="%"
  min="0" value="" max="15" maxLength=5 step="0.01"
  placeholder="" onBlur="annualPayIncreasePercentGood();"
  prompt="Enter the percentage of your expected annual pay increase:"
  explanation=""   dontOpenOuterDiv=true
%}
{% capture prompt2_9 %}
Enter the dollar amount that you plan to contribute each year in <span data-term="Catch-Up Contributions" class="js-glossary-toggle term term-end">catch-up contributions</span>:
{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.9" id="catchupAmount"
  inputClass=""  dataFormat="$"
  min="1" value="" max="9999" maxLength=4 step="1"
  placeholder="" onBlur="catchupAmountGood();"
  prompt=prompt2_9
  explanation="
  Catch-up contributions (up to $6,000 in 2019) are traditional and/or Roth contributions that are made by a participant age 50 or older. You must first exceed the elective deferral limit ($19,000.00 in 2019) to make catch-up contributions.
  "
  dontOpenOuterDiv=true
%}
</div>{% comment %}End of multi-input block Future contrib{% endcomment %}


{% comment %}Start of multi-input block Account contribs.  We must close <div> at end{% endcomment %}
{% capture explanation2_3 %}none{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.10" inputType="none" H2="Account contributions"
  explanation=''  dontCloseOuterDiv=true
%}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.11" id="yearsToGo"
  inputClass=""
  min="0" value="" max="99" maxLength=2 step="1"
  placeholder="" onBlur="yearsToGoGood();"
  prompt="Enter the number of years left until you begin withdrawing from your TSP account:"
  explanation="
  Subtract the current year from the year you expect to start drawing down from your account.
  "
  dontOpenOuterDiv=true
%}
{% capture explanation2_12 %}
Enter the annual rate of return you expect to earn on your contributions. View the [Rates of return]({{ site.baseurl }}/fund-performance/){:target="\_blank"} for context, but keep in mind that past performance is not a guarantee or a predictor of future returns.
{% endcapture %}
{% include calculator/div-panel-form-field.html
  fieldID="panel-2.12" id="rateOfReturn"
  inputClass=""  dataFormat="%"
  min="0" value="" max="99" maxLength=7 step="0.01"
  placeholder="" onBlur="rateOfReturnGood();"
  prompt="Expected annual rate of return:"
  explanation=explanation2_12   dontOpenOuterDiv=true
%}
</div>{% comment %}End of multi-input block Account contribs{% endcomment %}

{% include calculator/button-block.html panelID=panelID prev=1 showResults=3 %}

</section>
