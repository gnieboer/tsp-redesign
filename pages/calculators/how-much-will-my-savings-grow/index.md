---
layout: calculator
title: How much will my savings grow?
styles:
sidenav: calculators
scripts: /assets/js/calculator/javascriptTaxTable.js
permalink: /calculators/how-much-will-my-savings-grow/
calculator-name:
progress-steps: "Introduction,Savings growth information,Savings growth estimate"
panel-names:
---

<!-- PANEL 1 -->
<form>
<code> panel-1 </code>
<section id="panel-1" class="calculator-panel">
<div class="panel-form-field" >
<fieldset>
<div class="usa-input-error">
<legend class="sr-only">Retirement System</legend>
<label class="usa-input-error-label" for="rs">Retirement System</label>
<span class="usa-input-error-message" id="rs-error-message" role="alert">Retirement system is required.</span>
<ul class="usa-unstyled-list">
  <li>
    <input
      type="radio"
      id="FERS"
      name="rs"
      value="FERS"
      onclick="rsGood();">
      <label for="FERS"><span data-term="Federal Employees' Retirement System (FERS)" class="js-glossary-toggle term term-end">FERS</span></label>
  </li>
  <li>
    <input
      type="radio"
      id="CSRS"
      name="rs"
      value="CSRS"
      onclick="rsGood();">
      <label for="CSRS"><span data-term="Civil Service Retirement System (CSRS)" class="js-glossary-toggle term term-end">CSRS</span></label>
  </li>
  <li>
    <input
      type="radio"
      id="USBRS"
      name="rs"
      value="USBRS"
      onclick="rsGood();">
      <label for="USBRS"><span data-term="Uniformed Services" class="js-glossary-toggle term term-end">Uniformed Services: BRS</span></label>
  </li>
  <li>
    <input
      type="radio"
      id="US"
      name="rs"
      value="US"
      onclick="rsGood();">
      <label for="US"><span data-term="Non-BRS Uniformed Services" class="js-glossary-toggle term term-end">Uniformed Services: non-BRS</span></label>
  </li>
  <li>
    <input
      type="radio"
      id="BP"
      name="rs"
      value="BP"
      onclick="rsGood();">
      <label for="BP"><span data-term="Beneficiary Participant" class="js-glossary-toggle term term-end">Beneficiary Participant</span></label>
  </li>
</ul>
</div> <!-- end div.usa-input-error -->
</fieldset>
</div>
  <ul class="navigation-buttons">
  <span id="showResults2">
  <button class="usa-button " href="javascript:void(0);" onclick="processPanel(2, 0, 3, 0); return false;">Continue</button>
  </span>
  </ul>
</section> <!-- end section#panel-1 -->

<!-- PANEL 2 -->
<code> panel-2 </code>
<section id="panel-2" class="calculator-panel">
<div class="panel-form-field" >
<fieldset>

<div class="usa-input-error">
<legend class="sr-only">Growth model</legend>
<label class="usa-input-error-label" for="growthSelector" aria-details="panel-2.1">Growth model</label>
<span class="usa-input-error-message" id="rs-error-message" role="alert">Growth model is required.</span>
<ul class="usa-unstyled-list">
  <li>  
    <input
      type="radio"
      id="balanceOnly"
      name="growthSelector"
      value="balanceOnly"
      onclick="deemphasize(0);">
      <label for="balanceOnly">Existing account balance</label>
  </li>  
  <li>
    <input
      type="radio"
      id="futureOnly"
      name="growthSelector"
      value="futureOnly"
      onclick="deemphasize(1);">
      <label for="futureOnly">Future contributions</label>
  </li>
  <input type="radio" id="bothGrowth" name="growthSelector" value="bothGrowth" onclick="deemphasize(2);">
  <li>
    <input
      type="radio"
      id="bothGrowth"
      name="growthSelector"
      value="bothGrowth"
      onclick="deemphasize(2);">
      <label for="bothGrowth">Both</label>
  </li>
</ul>
</div> <!-- end div.usa-input-error -->
</fieldset>
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-2.1">
Explain this
</button>
<div id="panel-2.1" class="usa-accordion-content">
This calculator will show you the growth of your current account balance, growth of future contributions from your paycheck, or both. You must select a growth model.
</div>
</li>
</ul>
</div> <!---->

<div class="panel-form-field" >
<h2>Existing account balance</h2>

<div class="usa-input-error">
<label class="usa-input-error-label" for="repayTime" aria-details="panel-2.2">Enter the amount you already have in your TSP account:</label>
<span class="usa-input-error-message" id="ptYears-message" role="alert">Your actual or approximate TSP account balance is required.</span>
<span data-format="$" class="input-symbol-left">
<input id="ptYears" class="" type="text" name="repayTime" value="" size="2" maxlength="2" onchange="ptYearsMonthsGood(false);">
</span>
</div>


<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-2.2">
Explain this
</button>
<div id="panel-2.2" class="usa-accordion-content" markdown="1">
Log in to [My Account](https://www.tsp.gov/tsp/login.html){:target="\_blank"} to see your current account balance.
</div>
</li>
</ul>
</div><!---->

<div class="panel-form-field" >
<h2 aria-details="panel-2.3">Future contributions</h2>
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-2.3">
Explain this
</button>
<div id="panel-2.3" class="usa-accordion-content" markdown="1">
You may begin contributing to the TSP (through payroll contributions) as soon as you are hired. You also receive <span data-term="Agency Automatic (1%) Contributions" class="js-glossary-toggle term term-end">Agency Automatic (1%) Contributions</span> and are eligible to receive <span data-term="Agency Matching Contributions" class="js-glossary-toggle term term-end">Agency Matching Contributions</span>. Note: Newly hired or rehired FERS employees are automatically enrolled to contribute 3% of basic pay unless they elect otherwise. For more information on agency contributions, see [Contribution types](/making-contributions/contribution-types/).
</div>
</li>
</ul>
<!---->
<div class="usa-input-error">
<label class="usa-input-error-label" for="yearsToContribute">Enter the number of years you plan to contribute:</label>
<span class="usa-input-error-message" id="yearsToContribute-message" role="alert">Number of years you plan to contribute must be greater than 0.</span>
<input class="" type="text" id="yearsToContribute" size="2" maxlength="2" name="yearsToContribute" onblur="yearsToContributeGood();">    
</div>    
<!---->
<div class="usa-input-error">
<label class="usa-input-error-label" for="annualPay" aria-details="panel-2.4">Annual pay:</label>
<span class="usa-input-error-message" id="annualPay-message" role="alert">Annual pay is required.</span>
<span data-format="$" class="input-symbol-left"><input class="" maxlength="7" type="text" id="annualPay" name="annualPay" onblur="annualPayGood();"></span>.00
</div>
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-2.4">
Explain this
</button>
<div id="panel-2.4" class="usa-accordion-content" markdown="1">
Enter the gross amount of basic pay you receive each year. **Note:** Uniformed services members can contribute from incentive, special, and bonus pay &#8212; civilians cannot.
</div>
</li>
</ul>
<!---->
<div class="usa-input-error">
<label class="usa-input-error-label" for="paySchedule">Pay Schedule:</label>
<span class="usa-input-error-message" id="paySchedule-message" role="alert">Pay schedule is required.</span>
<select id="paySchedule" name="paySchedule" class="" onchange="payScheduleGood();" onblur="payScheduleGood();">
   <option value="Select">Select Your Pay Schedule</option>
   <option value="Biweekly">Biweekly (every 2 weeks, 26 times a year)</option>
   <option value="Weekly">Weekly (52 times a year)</option>
   <option value="Semimonthly">Semimonthly (twice a month, 24 times a year)</option>
   <option value="Monthly">Monthly (12 times a year).</option>
</select>
</div>
<!---->
<div class="usa-input-error">
<label class="usa-input-error-label" for="annualPayPercent">
<!-- DAV, DO YOU STILL NEED THESE SPANS WITHIN LABELS? -->
<span id="labelannualPayPercent">Enter the whole percentage of annual pay that you would like to save</span>:
</label>
<span class="usa-input-error-message" id="annualPayPercent-message" role="alert">Enter the percentage of your annual pay you would like to save.</span>
<span data-format="%" class="input-symbol-right"><input class="" maxlength="2" type="text" id="annualPayPercent" name="annualPayPercent" onblur="annualPayPercentGood();"></span>
</div>
<!---->
<label for="annualPayIncreasePercent">
  <span id="labelannualPayIncreasePercent">Enter the percentage of your expected annual pay increase</span>:
</label>
<span data-format="%" class="input-symbol-right"><input class="" type="text" id="annualPayIncreasePercent" name="annualPayIncreasePercent" value="" maxlength="7" onblur="annualPayIncreasePercentGood();"></span>
<!---->
<label for="catchupAmount" aria-details="panel-2.5">Enter the dollar amount that you plan to contribute each year in <span data-term="Catch-Up Contributions" class="js-glossary-toggle term term-end">catch-up contributions</span>:</label>
<span data-format="$" class="input-symbol-left">
<input class="" maxlength="4" type="text" id="catchupAmount" name="catchupAmount" onblur="catchupAmountGood();">
</span>.00

<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-2.5">
Explain this
</button>
<div id="panel-2.5" class="usa-accordion-content" markdown="1">
Catch-up contributions (up to $6,000 in 2019) are traditional and/or Roth contributions that are made by a participant age 50 or older. You must first exceed the elective deferral limit ($19,000.00 in 2019) to make catch-up contributions.
</div>
</li>
</ul>
</div><!---->
<div class="panel-form-field" >
<h2>Account contributions</h2>
<div class="usa-input-error">
<label class="usa-input-error-label" for="yearsToGo"  aria-details="panel-2.6">Enter the number of years left until you begin withdrawing from your TSP account:</label>
<span class="usa-input-error-message" id="yearsToGo-message" role="alert">Number of years left until you begin withdrawing from your TSP account must be greater than 0.</span>
<input class="" type="text" id="yearsToGo" maxlength="2" name="yearsToGo" onblur="yearsToGoGood();">
</div>
<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-2.6">
Explain this
</button>
<div id="panel-2.6" class="usa-accordion-content" markdown="1">
Subtract the current year from the year you expect to start drawing down from your account.
</div>
</li>
</ul>   
<!---->
<div class="usa-input-error">
<label class="usa-input-error-label" for="rateOfReturn" aria-details="panel-2.7">Expected annual rate of return:</label>
<span class="usa-input-error-message" id="rateOfReturn-message" role="alert">Expected annual rate of return is required.</span>
  <span data-format="%" class="input-symbol-right">
  <input class="" type="text" id="rateOfReturn" name="rateOfReturn" value="" maxlength="7" onblur="rateOfReturnGood();">
  </span>
</div>

<ul class="usa-accordion explain-this">
<li>
<button class="usa-accordion-button"
aria-expanded="false"
aria-controls="panel-2.7">
Explain this
</button>
<div id="panel-2.7" class="usa-accordion-content" markdown="1">
Enter the annual rate of return you expect to earn on your contributions. View the [Rates of return](/fund-performance/) for context, but keep in mind that past performance is not a guarantee or a predictor of future returns.
</div>
</li>
</ul>      
<!---->
</div>

<ul class="navigation-buttons">
  <li>
  <button class="usa-button " href="javascript:void(0);" onclick="showPanel(1); return false;">Previous</button>
  </li>
  <li>
  <button id="showResults2" class="usa-button" href="javascript:void(0);" onclick="processPanel(2, 0, 3, 0); return false;">Show Results</button>
  </li>
</ul>

</section>

<!-- PANEL 3 -->
<code> panel-3 </code>
<section id="panel-3" class="calculator-panel">

<ul class="usa-accordion icons">
<!-- PROJECTED BALANCE -->
  <li>
    <button
      class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="projected-balance">
      Projected Account Balance <i class="fal fa-search-dollar" aria-hidden="true"></i>
    </button>
    <div id="projected-balance" class="usa-accordion-content">

    <div class="results-grid-frame">
      <div class="usa-grid results">
        <div class="usa-width-two-thirds">Your existing account balance</div>
        <div class="usa-width-one-third">$
        <span id="accountExisting">350,000.00</span>
        </div>
      </div>
      <div class="usa-grid results">
        <div class="usa-width-two-thirds ">Growth of your existing account balance</div>
        <div class="usa-width-one-third ">$
        <span id="growthExisting">354,268.78</span>
        </div>
      </div>
      <div class="usa-grid results">
        <div class="usa-width-two-thirds ">Your future contributions</div>
        <div class="usa-width-one-third ">$
        <span id="contribFuture">380,745.34</span>
        </div>
      </div>
      <div class="usa-grid results">
        <div class="usa-width-two-thirds ">Growth of your future contributions</div>
        <div class="usa-width-one-third ">$
        <span id="contribFutureGrowth">380,745.34</span>
        </div>
      </div>
      <div class="usa-grid results">
        <div class="usa-width-two-thirds bold">
        Total estimated TSP account balance
        </div>
        <div class="usa-width-one-third bold">$<span id="totalBalance">1,249,854.26</span></div>
      </div>

    </div> <!-- end div.results-grid-frame -->

    </div>
  </li>
  <!-- PROJECTED GROWTH -->
  <li>
    <button
      class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="projected-growth">
      Projected Growth of Your Account <i class="far fa-chart-line" aria-hidden="true"></i>
    </button>
    <div id="projected-growth" class="usa-accordion-content">
      <p>The results below show how much your account will grow over time based on an expected annual rate of return of 6.00%.</p>
    <fieldset class="usa-fieldset-inputs projected-growth">
    <legend class="">Show growth as:</legend>
    <ul class="usa-unstyled-list">
      <li>
      <input type="radio" id="resultSelectorChart" name="resultSelector" value="graph" onclick="showData(0);" checked="">
      <label for="resultSelectorChart"><strong>Graph</strong></label>
      </li>

      <li>
      <input type="radio" id="resultSelectorTable" name="resultSelector" value="table" onclick="showData(1);">
      <label for="resultSelectorTable"><strong>Table</strong></label>
      </li>

      <li>
      <input type="radio" id="resultSelectorCombined" name="resultSelector" value="combined" onclick="showData(2);">
      <label for="resultSelectorCombined"><strong>Combined</strong></label>
      </li>
    </ul>
    </fieldset>
    </div>
  </li>
  <!-- ADJUST YOUR RESULTS -->
  <li>
    <button
      class="usa-accordion-button"
      aria-expanded="true"
      aria-controls="adjust-results">
      Adjust your results <i class="fal fa-sliders-v"></i>
    </button>
    <div id="adjust-results" class="usa-accordion-content">


    <table class="usa-table-borderless">
    <caption class="">Retirement system <a href="javascript:void(0)">Change</a></caption>
    <colgroup><col><col></colgroup>
    <tbody>
    <tr>
      <th scope="row">Retirement system:</th>
      <td>FERS</td>
    </tr>
    </tbody>
    </table>

    <table class="usa-table-borderless">
    <caption>Type(s) of Growth <a href="javascript:void(0)">Change</a></caption>
    <colgroup><col><col></colgroup>
    <tbody>
    <tr>
      <th scope="row">Growth model:</th>
      <td>Both</td>
    </tr>
    </tbody>
    </table>

    <table class="usa-table-borderless">
    <caption>Existing account balance <a href="javascript:void(0)">Change</a></caption>
    <colgroup><col><col></colgroup>
    <tbody>
    <tr>
      <th scope="row">Current account balance:</th>
      <td>$350,000.00</td>
    </tr>
    </tbody>
    </table>

    <table class="usa-table-borderless">
    <caption>Future contributions <a href="javascript:void(0)">Change</a></caption>
    <colgroup><col><col></colgroup>
    <tbody>
    <tr>
      <th scope="row">Years to make contributions:</th>
      <td>12</td>
    </tr>
    <tr>
      <th scope="row">Annual pay:</th>
      <td>$100,000.00</td>
    </tr>
    <tr>
      <th scope="row">Pay schedule:</th>
      <td>Biweekly</td>
    </tr>
    <tr>
      <th scope="row">Percent salary to save:</th>
      <td>19%</td>
    </tr>
    <tr>
      <th scope="row">Expected Percent Salary Increase:</th>
      <td>1.60%</td>
    </tr>
    <tr>
      <th scope="row">Annual catch-up contributions:</th>
      <td>$5,500</td>
    </tr>
    </tbody>
    </table>

    <table class="usa-table-borderless">
    <caption>Account growth <a href="javascript:void(0)">Change</a></caption>
    <colgroup><col><col></colgroup>
    <tbody>
    <tr>
      <th scope="row">Number of years until you start withdrawing:</th>
      <td>12</td>
    </tr>
    <tr>
      <th scope="row">Expected annual return:</th>
      <td>6.00%</td>
    </tr>
    </tbody>
    </table>
    </div>
  </li>
</ul>

<ul class="navigation-buttons">
  <li>
  <button class="usa-button " href="javascript:void(0);" onclick="showPanel(2); return false;">Previous</button>
  </li>
  <li>
  <button class="usa-button print" href="javascript:void(0);" onclick="doReport(); return false;">Print report</button>
  </li>
</ul>
</section>
</form>

DISCLAIMER: This calculator is provided for informational purposes only. It is not intended to be used as an investment advisory tool or as a guarantee of a final account balance. Please note that the results shown at the end of this calculator assume that elected contributions are made for the entire year. Results do not take into account the following Internal Revenue Code (IRC) limits: <span data-term="Elective Deferral Limit" class="js-glossary-toggle term term-end">elective deferral</span>, <span data-term="Section 415(c) Limit" class="js-glossary-toggle term term-end">section 415(c)</span>, and <span data-term="Catch-Up Contribution Limit" class="js-glossary-toggle term term-end">catch-up contribution</span>. These limits, which may change every year, determine the maximum annual amount that you and/or your employing agency can contribute to the TSP on your behalf. You can view the current year's limits on the TSP website under [News and resources](/news-and-resources/).
{:.disclaimer}
