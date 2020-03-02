---
layout: calculator
title: Paycheck estimator
styles:
sidenav: calculators
scripts: /assets/js/calculator/javascriptTaxTable.js
permalink: /calculators/paycheck-estimator/
calculator-name:
progress-steps: [Retirement system,Paycheck information,Contribution election,Results]
panel-names:
---

Static code version.
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
<div class="panel-form-field">
  <h2>Salary information</h2>

  <!-- 2.1 GROSS PAY PER PAYCHECK -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="repayTime" aria-details="panel-2.1">Gross pay per paycheck:</label>
  <span class="usa-input-error-message" id="grossPay-message" role="alert">Your gross pay per paycheck is required.</span>
  <span data-format="$" class="input-symbol-left">
  <input id="grossPay" class="" type="text" maxlength="6" onchange="grossPayGood();" onblur="grossPayGood();" name="grossPay" aria-describedby="grossPay-message">.00
  </span>
  </div><!-- end div.usa-input-error -->

  <!-- Explain this -->
  <ul class="usa-accordion explain-this">
    <li>
    <button class="usa-accordion-button"
    aria-expanded="false"
    aria-controls="panel-2.1">
    Explain this
    </button>
    <div id="panel-2.1" class="usa-accordion-content">
    Enter your gross pay per paycheck (the amount you make <b>before</b> taxes are deducted) and how often you are paid. Use whole numbers only.
    </div>
    </li>
  </ul>

  <!-- 2.2 SELECT YOUR PAY SCHEDULE -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="paySchedule">Pay Schedule:</label>
  <span class="usa-input-error-message" id="paySchedule-message" role="alert">Pay schedule is required.</span>
  <select id="paySchedule" name="paySchedule" class="" onchange="payScheduleGood();" onblur="payScheduleGood();" aria-describedby="paySchedule-message;">
     <option value="Select">Select Your Pay Schedule</option>
     <option value="Biweekly">Biweekly (every 2 weeks, 26 times a year)</option>
     <option value="Weekly">Weekly (52 times a year)</option>
     <option value="Semimonthly">Semimonthly (twice a month, 24 times a year)</option>
     <option value="Monthly">Monthly (12 times a year).</option>
  </select>                      
  </div>
</div><!-- END div.panel-form-field -->

<div class="panel-form-field" >
  <h2>Tax Withholding</h2>
  <!-- 2.3 TAX FILING STATUS -->
  <fieldset>
    <div class="usa-input-error">
    <legend class="sr-only">Tax filing status</legend>
    <label class="usa-input-error-label" for="taxStatus" aria-details="panel-2.3">Tax filing status</label>
    <span class="usa-input-error-message" id="taxStatus-error-message" role="alert">Tax filing status is required.</span>

    <ul class="usa-unstyled-list">
      <li>  
      <input
        type="radio"
        id="taxStatusSingle"
        name="taxStatus"
        value="S"
        onblur="taxStatusGood();"
        onchange="taxStatusGood();">
        <label for="taxStatusSingle">Single</label>
      </li>  
      <li>
      <input
        type="radio"
        id="taxStatusMarried"
        name="taxStatus"
        value="M"
        onblur="taxStatusGood();"
        onchange="taxStatusGood();">
        <label for="taxStatusMarried">Married</label>
      </li>
      <input type="radio" id="bothGrowth" name="growthSelector" value="bothGrowth" onclick="deemphasize(2);">
      <li>                      
      <input
        type="radio"
        id="taxStatusSingleRate"
        name="taxStatus"
        value="MS"
        onblur="taxStatusGood();"
        onchange="taxStatusGood();">
        <label for="taxStatusSingleRate">Married, withhold at Single Rate</label>
      </li>
      <!-- DAV, do you need this hidden input? I copied it from legacy source code. -->
      <input type="hidden" name="taxStatusString" id="taxStatusString" value="">
    </ul>
    </div> <!-- end div.usa-input-error -->
  </fieldset>

  <!-- 2.4 NUMBER OF FEDERAL ALLOWANCES -->
  <label for="fedAllowances">Enter the number of your federal allowances:</label>
  <input
    class=""
    type="text"
    id="fedAllowances"
    maxlength="2"
    name="fedAllowances"
    onblur="fedAllowancesGood();" value="">

  <!-- Explain this -->
  <ul class="usa-accordion explain-this">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.4">
  Explain this
  </button>
  <div id="panel-2.4" class="usa-accordion-content" markdown="1">
  You can use the <span class="nobr">[Tax Withholding Estimator](/exit/?idx=161){:rel="nofollow"}{:target="\_blank"}</span> on the IRS website for help in determining how many allowances to claim.
  </div>
  </li>
  </ul>

  <!-- 2.5 ADDITIONAL TAX WITHHOLDING -->
  <label for="additionalWithholding">Additional Tax Withholding:</label>
  <span data-format="$" class="input-symbol-left">
  <input
    id="additionalWithholding"
    class=""
    type="text"
    name="additionalWithholding"
    value=""
    maxlength="6"
    onblur="additionalWithholdingGood();">
    </span>

</div><!-- END div.panel-form-field -->


<div class="panel-form-field" >
  <h2 aria-details="panel-2.6">Deductions</h2>

<p>Your Federal income tax amount will automatically be calculated using the current IRS withholding table, so do not include that amount in your payroll deductions.</p>

  <!-- 2.6 PRE-TAX DEDUCTIONS -->
  <label for="additionalWithholding">Pre-tax deductions:</label>
  <span data-format="$" class="input-symbol-left">
  <input
    id="beforeDeduction"
    class=""
    type="text"
    name="beforeDeduction"
    value=""
    maxlength="6"
    onblur="beforeDeductionGood();">
    </span> .00

  <!-- Explain this -->
  <ul class="usa-accordion explain-this">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.6">
  Explain this
  </button>
  <div id="panel-2.6" class="usa-accordion-content" markdown="1">
  Examples of pre-tax deductions are health insurance and Flexible Spending Accounts. **Do not include current TSP contributions**.
  </div>
  </li>
  </ul>

  <!-- 2.7 OTHER PAYROLL DEDUCTIONS  -->
  <label for="additionalWithholding">Other payroll deductions:</label>
  <span data-format="$" class="input-symbol-left">
  <input
    id="afterDeduction"
    class=""
    type="text"
    name="afterDeduction"
    value=""
    maxlength="6"
    onblur="afterDeductionGood();">
    </span> .00

  <ul class="usa-accordion explain-this">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.7">
  Explain this
  </button>
  <div id="panel-2.7" class="usa-accordion-content" markdown="1">
  Examples of other payroll deductions are savings allotments and charitable contributions. **Do not include current TSP contributions**.
  </div>
  </li>
  </ul>
</div><!-- END div.panel-form-field -->

<ul class="navigation-buttons">
  <li>
  <button class="usa-button " href="javascript:void(0);" onclick="showPanel(1); return false;">Previous</button>
  </li>
  <li>
  <button id="showResults2" class="usa-button" href="javascript:void(0);" onclick="processPanel(2,0,3,0); return false;">Continue</button>
  </li>
</ul>
</section>

<!-- PANEL 3 -->
<code> panel-3 </code>
<section id="panel-3" class="calculator-panel">
<h2>TSP Contributions Per Paycheck</h2>
  <div class="usa-grid">
      <!-- Scenario 1 -->
      <div class="usa-width-one-half">
        <!-- 3.1 Traditional contributions -->
        <div class="panel-form-field">
        Scenario 1 (required)
        <fieldset>
        <div class="usa-input-error">
        <legend class="sr-only">Traditional contributions</legend>
        <label class="usa-input-error-label" for="growthSelector" aria-details="panel-3.1"><span data-term="Traditional Contribution" class="js-glossary-toggle term term-end">Traditional contributions</span></label>
        <span class="usa-input-error-message" id="growthSelector-error-message" role="alert">Enter either a whole percentage or a fixed dollar amount for your traditional contribution.</span>
        <ul class="usa-unstyled-list">
          <li>  
            <input
              type="radio"
              id="balanceOnly"
              name="growthSelector"
              value="balanceOnly"
              onclick="deemphasize(0);">
              <label for="balanceOnly">Percentage of paycheck</label>
          </li>  
          <li>
            <input
              type="radio"
              id="futureOnly"
              name="growthSelector"
              value="futureOnly"
              onclick="deemphasize(1);">
              <label for="futureOnly">Fixed amount</label>
          </li>
        </ul>
        </div> <!-- end div.usa-input-error -->
        </fieldset>
        <!-- Explain this -->
        <ul class="usa-accordion explain-this">
        <li>
        <button class="usa-accordion-button"
        aria-expanded="false"
        aria-controls="panel-3.1">
        Explain this
        </button>
<div id="panel-3.1" class="usa-accordion-content" markdown="1">
Traditional contributions come out of your pay **before** taxes are calculated; you pay taxes on these contributions and their earnings when you withdraw them.
</div>
        </li>
        </ul>
        </div><!-- END div.panel-form-field -->
        <!-- 3.2 Roth contributions -->
        <div class="panel-form-field">
        <fieldset>
        <div class="usa-input-error">
        <legend class="sr-only">Roth contributions</legend>
        <label class="usa-input-error-label" for="growthSelector" aria-details="panel-3.1">Roth contributions</label>
        <span class="usa-input-error-message" id="growthSelector-error-message" role="alert">Enter either a whole percentage or a fixed dollar amount for your Roth contribution.</span>
        <ul class="usa-unstyled-list">
          <li>  
            <input
              type="radio"
              id="balanceOnly"
              name="growthSelector"
              value="balanceOnly"
              onclick="deemphasize(0);">
              <label for="balanceOnly">Percentage of paycheck</label>
          </li>  
          <li>
            <input
              type="radio"
              id="futureOnly"
              name="growthSelector"
              value="futureOnly"
              onclick="deemphasize(1);">
              <label for="futureOnly">Fixed amount</label>
          </li>
        </ul>
        </div> <!-- end div.usa-input-error -->
        </fieldset>
        </div><!-- END div.panel-form-field -->
        <!-- 3.3 Catch-up contributions -->
        <div class="panel-form-field">
        <fieldset>
        <div class="usa-input-error">
        <legend class="sr-only">Catch-up contributions</legend>
        <label class="usa-input-error-label" for="growthSelector" aria-details="panel-3.1"><span data-term="Catch-Up Contributions" class="js-glossary-toggle term term-end">Catch-up contributions</span></label>
        <span class="usa-input-error-message" id="growthSelector-error-message" role="alert">Enter either a whole percentage or a fixed dollar amount for your catch-up contribution.</span>
        <ul class="usa-unstyled-list">
          <li>  
            <input
              type="radio"
              id="balanceOnly"
              name="growthSelector"
              value="balanceOnly"
              onclick="deemphasize(0);">
              <label for="balanceOnly">Percentage of paycheck</label>
          </li>  
          <li>
            <input
              type="radio"
              id="futureOnly"
              name="growthSelector"
              value="futureOnly"
              onclick="deemphasize(1);">
              <label for="futureOnly">Fixed amount</label>
          </li>
        </ul>
        </div> <!-- end div.usa-input-error -->
        </fieldset>
        </div><!-- END div.panel-form-field -->
      </div><!-- END div.usa-grid-one-half -->
      <!-- Scenario 2 -->
      <div class="usa-width-one-half">
        <div class="panel-form-field">
        Scenario 2
        </div>
      </div><!-- END div.usa-grid-one-half -->
  </div><!-- END div.usa-grid -->

  <ul class="navigation-buttons">
  <li>
  <button class="usa-button " href="javascript:void(0);" onclick="showPanel(2); return false;">Previous</button>
  </li>
  <li>
  <button class="usa-button print" href="javascript:void(0);" onclick="doReport(); return false;">Print report</button>
  </li>
  </ul>
</section>

<!-- PANEL 4 -->
<code> panel-4 </code>
<section id="panel-4" class="calculator-panel">
<div class="panel-form-field">
<h2>TSP Contributions Per Paycheck</h2>

</div><!-- END div.panel-form-field -->
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

DISCLAIMER: This calculator is provided for informational purposes only. It is not intended to be used as an investment advisory tool or as a guarantee of a final account balance. Please note that the results shown at the end of this calculator assume that elected contributions are made for the entire year. Results do not take into account the following Internal Revenue Code (IRC) limits: <span data-term="Elective Deferral Limit" class="js-glossary-toggle term term-end">elective deferral</span>, <span data-term="Section 415(c) Limit" class="js-glossary-toggle term term-end">section 415(c)</span>, and <span data-term="Catch-Up Contribution Limit" class="js-glossary-toggle term term-end">catch-up contribution</span>. These limits, which may change every year, determine the maximum annual amount that you and/or your employing agency can contribute to the TSP on your behalf. You can view the current year's limits on the TSP website under [News and resources]({{ site.baseurl }}/news-and-resources/).
{:.disclaimer}
