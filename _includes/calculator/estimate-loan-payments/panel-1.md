{% comment %}
Name middle panels (2) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<!-- PANEL 1 -->
<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}"  markdown="1">

The Loan Calculator estimates loan payments based on the amount you want to borrow from your TSP account, the [current loan interest rate]({{ site.baseurl }}/news-and-resources/), and other factors. To borrow from your TSP account, you must be a Federal employee in pay status. If you qualify for a TSP loan, the maximum amount you may be eligible to borrow is $50,000; the minimum amount is $1,000. To find out the amount you have available to borrow, visit [TSP Loans]({{ site.loans }}) in the My Account section.

**Estimate loan payments and costs**

<div class="panel-form-field" >
<fieldset>
<legend aria-details="panel-1.1">Select your employment category:</legend>
<ul class="usa-unstyled-list">
<li>
<input id="civilian" type="radio" name="employment-category" value="civilian">
<label for="civilian">Civilian</label>
</li>
<li>
<input id="uniformed-services" type="radio" name="employment-category" value="uniformed-services">
<label for="uniformed-services">Uniformed Services</label>
</li>
</ul>
</fieldset>
<!-- Explain this -->
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-1.1">
Explain this
</button>
<div id="panel-1.1" class="usa-accordion-content" markdown="1">

People often use this calculator to figure out a new dollar amount they should contribute to reach the IRS limit without going over. But when you change how much you’re contributing, it can take 1-2 pay periods for your agency or service to process the new amount. During that time, the TSP will still receive the amount you’re contributing now.

Enter an estimate of how much you’ll contribute before any changes take effect. If you are uncertain, check with your personnel or finance office.

</div>
</li>
</ul>
</div> <!---->

<div class="panel-form-field" >
<label for="loanAmt" aria-details="panel-1.2" >Loan amount you wish to borrow:</label>
<span data-format="$" class="input-symbol-left">
<input class="positiveinteger" type="text" id="loanAmt" name="loanAmt" maxlength="5" value="1000" onchange="loanAmtGood(false);">
</span>
<!-- Explain this -->
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-1.2">
Explain this
</button>
<div id="panel-1.2" class="usa-accordion-content" markdown="1">

Enter a whole dollar amount between $1,000 and $50,000.

</div>
</li>
</ul>
</div> <!---->

<div class="panel-form-field" >
<fieldset>
<legend aria-details="panel-1.3">Select the type of loan you wish to apply for:</legend>
<ul class="usa-unstyled-list">
<li>
<input type="radio" id="General" name="loanType" value="General" onclick="loanTypeGood(false);">
<label for="General">General purpose</label>
</li>
<li>
<input type="radio" id="Residential" name="loanType" value="Residential" onclick="loanTypeGood(false);">
<label for="Residential">Residential</label>
</li>
</ul>
</fieldset>
<!-- Explain this -->
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-1.3">
Explain this
</button>
<div id="panel-1.3" class="usa-accordion-content" markdown="1">

There are two types of loans.

- **General purpose loan** with a repayment period of 1 to 5 years. No documentation is required.
- **Residential loan** with a repayment period of 1 to 15 years. Documentation is required.

A residential loan can be used only for the purchase or construction of a primary residence. The residence can be a house, condominium, shares in a cooperative housing corporation, a townhouse, boat, mobile home, or recreational vehicle, but it must be used as your **primary residence.** The residence must be purchased (in whole or in part) by you or your spouse. You can obtain a residential loan for constructing a new residence or purchasing an existing residence. You **cannot** use a residential loan for refinancing or prepaying an existing mortgage, for renovations or repairs, for buying out another person’s share in your current residence, or for the purchase of land only.

You may have **only one general purpose loan and one residential loan** outstanding at any one time. This is a per-account limit. If you have both a civilian account and a uniformed services account, you may have one of each type of loan for each account.

</div>
</li>
</ul>
</div> <!---->

<div class="panel-form-field" >
<fieldset>
<legend aria-details="panel-1.4">Repayment terms:<br />(select <strong>ONE</strong>)</legend>
<ul class="usa-unstyled-list inline-input">
<!-- Radio 1 -->
<li>
<input type="radio" id="repayTime" name="repayment-terms" value="repayTime">
<label for="repayTime">Repay the loan over</label>
  <input id="ptYears" class="" type="text" name="repayTime" value="" size="2" maxlength="2" onchange="ptYearsMonthsGood(false);"><label for="ptYears" class="sr-only">Number of years</label>
  year(s) and
  <input id="ptMonths" class="" type="text" name="repayTime" value="0" size="2" maxlength="2" onchange="ptYearsMonthsGood(false);" title="Months"><label for="ptMonths" class="sr-only">Number of months</label> month(s)
</li>
<!-- Radio 2 -->
<li>
<input type="radio" id="repayPayday" name="repayment-terms" value="repayPayday" onclick="payTypeGood(false);">
<label for="repayPayday">Repay the loan by paying</label>
  <span data-format="$" class="input-symbol-left">
  <input id="additionalAmount" name="repayPayday" class="positivefloat" value="0" size="8" type="number" onblur="totalContributionGood(false, true);" onchange="totalContributionGood(false, true);" /></span><label for="additionalAmount" class="sr-only">Payment amount</label> each pay period
</li>
<!-- Radio 3 -->
<li>
<input type="radio" id="repayPayments" name="repayment-terms" value="repayPayments" onclick="payTypeGood(false);">
<label for="repayPayments">Repay by making</label>
  <input id="ptNumpay" class="positiveinteger" type="text" name="repayPayments" value="" size="3" maxlength="3" onchange="ptNumpayGood(false);"><label for="ptNumpay" class="sr-only">Number of payments</label> payments
</li>
</ul>
</fieldset>
<!-- Explain this -->
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-1.4">
Explain this
</button>
<div id="panel-1.4" class="usa-accordion-content" markdown="1">

People often use this calculator to figure out a new dollar amount they should contribute to reach the IRS limit without going over. But when you change how much you’re contributing, it can take 1-2 pay periods for your agency or service to process the new amount. During that time, the TSP will still receive the amount you’re contributing now.

Enter an estimate of how much you’ll contribute before any changes take effect. If you are uncertain, check with your personnel or finance office.

</div>
</li>
</ul>
</div> <!---->

<div class="panel-form-field" >
<label for="paySchedule" aria-details="panel-1.5" >Your pay schedule:</label>
<select id="paySchedule" name="paySchedule" onchange="payScheduleGood(false);">
<option value="select">Select Your Pay Schedule</option>
<option value="biweekly">Biweekly  (every 2 weeks, 26 times a year)</option>
<option value="weekly">Weekly (52  times a year)</option>
<option value="semi-monthly">Semi-monthly (twice a month, 24 times a year)</option>
<option value="monthly">Monthly (12  times a year)</option>
</select>
<!-- Explain this -->
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-1.5">
Explain this
</button>
<div id="panel-1.5" class="usa-accordion-content" markdown="1">

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

</div>
</li>
</ul>
</div> <!---->

{% include calculator/button-block.html panelID=panelID showResults=2 %}

</section> <!-- end section#panel-1 -->
