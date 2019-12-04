---
layout: calculator
title: Estimate loan payments
styles:
sidenav: calculators
scripts: /assets/js/calculator/javascriptTaxTable.js
permalink: /calculators/estimate-loan-payments/
calculator-name:
progress-steps: "Loan details,Results"
panel-names:
---

The Loan Calculator estimates loan payments based on the amount you want to borrow from your TSP account, the [current loan interest rate](/news-and-resources/), and other factors. To borrow from your TSP account, you must be a Federal employee in pay status. If you qualify for a TSP loan, the maximum amount you may be eligible to borrow is $50,000; the minimum amount is $1,000. To find out the amount you have available to borrow, visit [TSP Loans](javascript:void(0)) in the My Account section.

**Estimate loan payments and costs**

<form>
<!-- PANEL 1 -->
<code> panel-1 </code>
<section id="panel-1" class="calculator-panel">
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
<ul class="usa-accordion">
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
<ul class="usa-accordion">
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
<ul class="usa-accordion">
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
<ul class="usa-unstyled-list repayment-terms">
<!-- Radio 1 -->
<li>
<input type="radio" id="repayTime" name="repayment-terms" value="repayTime">
<label for="repayTime">Repay the loan over</label>
  <input id="ptYears" class="positiveinteger" type="text" name="repayTime" value="" size="2" maxlength="2" onchange="ptYearsMonthsGood(false);"><label for="ptYears" class="sr-only">Number of years</label>
  year(s) and
  <input id="ptMonths" class="positiveinteger" type="text" name="repayTime" value="0" size="2" maxlength="2" onchange="ptYearsMonthsGood(false);" title="Months"><label for="ptMonths" class="sr-only">Number of months</label> month(s)
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
<ul class="usa-accordion">
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
<ul class="usa-accordion">
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
<tr>
<th scope="col">Payment Frequency</th>
<th scope="col">Number of Salary Payments</th>
</tr>
</thead>
<tbody>
<tr>
<td>Biweekly</td>
<td>26*</td>
</tr>
<tr>
<td>Monthly</td>
<td>12</td>
</tr>
<tr>
<td>Weekly</td>
<td>52</td>
</tr>
<tr>
<td>Semimonthly</td>
<td>24</td>
</tr>
</tbody></table>

\*A biweekly frequency occasionally results in 27 salary payments for a year.  Contact your personnel or payroll office if you do not know the number of salary payments you will receive for the remainder of the year.

</div>
</li>
</ul>
</div> <!---->
<!-- navigation buttons -->
<ul class="navigation-buttons">
<span id="showResults2">
<button class="usa-button " href="javascript:void(0);" title="" onclick="processPanel(2, 0, 3, 0); return false;">Submit</button>
</span>
</ul>
<div class="tspError pe-error" id="tspErrorytd-cont" style="display: block; text-align: right;"></div>

</section> <!-- end section#panel-1 -->

<!-- PANEL 2 -->
<code> panel-2 </code>
<section id="panel-2" class="calculator-panel" markdown="1">

  <div class="usa-alert  usa-alert-info ">
    <div class="usa-alert-body">
        <h3 class="usa-alert-heading">Before you apply for a loan</h3>
        <p class="usa-alert-text" markdown="1">Read the TSP booklet [Loans](/publications/tspbk04.pdf){:.publication} for information about the TSP loan process (including the cost of a TSP loan) and about your obligations to repay the loan. To initiate a Loan Request, visit [TSP Loans](https://secure.tsp.gov/tsp/loan.do?subaction=menu&amp;_name=loan){:.external-link} in My Account.</p>
    </div>
  </div>

  **Estimated loan terms (actual terms may vary)**

  <div class="results-grid-frame">
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Employment Category</div>
    <div class="usa-width-one-third ">
    <span id="contributionYear">Civilian</span>
    </div>
  </div>
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Loan Amount</div>
    <div class="usa-width-one-third ">$
    <span id="deferralLimit">1,500</span>
    </div>
  </div>
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Type</div>
    <div class="usa-width-one-third "><span id="totalContributed">General</span>
    </div>
  </div>
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Repayment Terms</div>
    <div class="usa-width-one-third "><span id="amountAvailable">Repay the loan in 1 year and 0 months.</span>
    </div>
  </div>
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Repayment frequency</div>
    <div class="usa-width-one-third "><span id="paymentsRemaining">Biweekly</span>
    </div>
  </div>

  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Interest rate</div>
    <div class="usa-width-one-third "><span id="paymentsRemaining">1.750</span>%
    </div>
  </div>

  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Payment amount</div>
    <div class="usa-width-one-third ">$<span id="paymentsRemaining">39.00</span>
    </div>
  </div>

  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Number of payments</div>
    <div class="usa-width-one-third "><span id="paymentsRemaining">26</span>
    </div>
  </div>

  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Total interest (finance charge)</div>
    <div class="usa-width-one-third ">$<span id="paymentsRemaining">14.00</span>
    </div>
  </div>

  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Total loan cost (total payment)</div>
    <div class="usa-width-one-third ">$<span id="paymentsRemaining">1,014.00</span>
    </div>
  </div>

  </div> <!-- end div.results-grid-frame -->

  <!-- navigation buttons -->
  <ul class="navigation-buttons">
  <li><button class="usa-button " href="javascript:void(0);" title="" onclick="showPanel(2); return false;">Revise</button></li>
  </ul>
</section>  <!-- end section#panel-2 -->

</form>

DISCLAIMER: This calculator is provided for informational purposes only. It is not intended to be used as an investment advisory tool or as a guarantee of a final account balance. Please note that the results shown at the end of this calculator assume that elected contributions are made for the entire year. Results do not take into account the following Internal Revenue Code (IRC) limits: <span data-term="Elective Deferral Limit" class="js-glossary-toggle term term-end">elective deferral</span>, <span data-term="Section 415(c) Limit" class="js-glossary-toggle term term-end">section 415(c)</span>, and <span data-term="Catch-Up Contribution Limit" class="js-glossary-toggle term term-end">catch-up contribution</span>. These limits, which may change every year, determine the maximum annual amount that you and/or your employing agency can contribute to the TSP on your behalf. You can view the current year's limits on the TSP website under [News and resources](/news-and-resources/).
{:.disclaimer}
