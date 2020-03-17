---
layout: calculator
title: Contribution comparison calculator
styles:
sidenav: calculators
scripts: /assets/js/calculator/javascriptTaxTable.js
permalink: /calculators/contribution-comparison-calculator/
calculator-name:
progress-steps: [Introduction,Retirement profile,Results]
panel-names:
---

The Contribution comparison calculator helps you assess how the tax treatment choice you make for your employee contributions affects your paycheck. With Roth TSP contributions, you make contributions with after-tax income by paying taxes up front. During retirement, you receive <span data-term="Qualified Earnings" class="js-glossary-toggle term term-end">qualified Roth distributions</span> tax-free. The traditional TSP lets you make contributions before taxes are taken out of your income and then pay taxes on withdrawals.

This calculator provides a side-by-side comparison of traditional and Roth contributions to help you assess whether Roth TSP might be right for you. Keep in mind you may choose to contribute all, some, or none of your contributions to the Roth TSP. If contributing to both Roth and traditional balances within your TSP account, your combined contributions cannot exceed the <span data-term="elective deferral limit" class="js-glossary-toggle term term-end">elective deferral limit</span>.

Note that the calculator results are based on the limited information captured. You should consult a qualified tax or financial advisor to further assess your individual situation.

<ul class="navigation-buttons">
<button id="EC46AE22-Tab1Continue" class="usa-button start" href="javascript:void(0);">Get started</button>
</ul>

<form>

<!-- PANEL 1 -->
<code> panel-1 </code>
<section id="panel-1" class="calculator-panel">
  <div class="panel-form-field" >

  <!-- 1. How many years until you retire? -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="cccYearsUntilRetirement">How many years until you retire?</label>
  <span class="usa-input-error-message" id="cccYearsUntilRetirement-message" role="alert">Years until you retire is required.</span>

  <input
    type="number"
    name="cccYearsUntilRetirement"
    id="cccYearsUntilRetirement"
    class="EC46AE22error">
  </div><!-- END div.usa-input-error -->

<!-- Explain this -->
  <ul class="usa-accordion explain-this">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.1">
  Explain this
  </button>
  <div id="panel-2.1" class="usa-accordion-content" markdown="1">
  If you plan to retire before age 59&frac12;, be aware that any Roth earnings included in a withdrawal will not be tax-free.  Also, you may be subject to a 10% early withdrawal penalty tax.  See the TSP tax notice [_Important Information About Payments From Your TSP Account_](/publications/tsp-536.pdf) for more information as well as exceptions to this rule.
  </div>
  </li>
  </ul>

  <!-- 2. How many years will you spend in retirement? -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="cccYearsInRetirement">How many years will you spend in retirement?</label>
  <span class="usa-input-error-message" id="cccYearsInRetirement-message" role="alert">Estimated years in retirement is required.</span>

  <input
    type="number"
    name="cccYearsInRetirement"
    id="cccYearsInRetirement"
    class="EC46AE22error">

  </div><!-- END div.usa-input-error -->

  <!-- Explain this -->
  <ul class="usa-accordion explain-this">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.2">
  Explain this
  </button>
  <div id="panel-2.2" class="usa-accordion-content" markdown="1">
  A recommended estimation is age 95 minus your retirement age to plan for your income needs and protect your longevity risk.
  </div>
  </li>
  </ul>

  <!-- 3. Current annual salary -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="cccSalary" aria-details="panel-2.3">Current annual salary:</label>
  <span class="usa-input-error-message" id="cccSalary-message" role="alert">Current annual salary is required.</span>

  <span data-format="$" class="input-symbol-left">
  <input
    type="number"
    name="cccSalary"
    id="cccSalary"
    class="EC46AE22error">
  </span>

  </div><!-- END div.usa-input-error -->

  <!-- 4. Expected rate of return -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="cccInterestRate" aria-details="panel-2.4">Expected rate of return:</label>
  <span class="usa-input-error-message" id="cccInterestRate-message" role="alert">Expected rate of return is required.</span>

    <span data-format="%" class="input-symbol-right">
      <input
        class="EC46AE22error"
        maxlength="2"
        type="number"
        id="cccInterestRate"
        name="cccInterestRate"
        onblur="annualPayPercentGood();">
    </span>
  </div><!-- END div.usa-input-error -->

  <!-- 5. Contributions per year, as a percentage of your salary -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="cccContributions" aria-details="panel-2.5">Contributions per year, as a percentage of your salary:</label>
  <span class="usa-input-error-message" id="cccContributions-message" role="alert">This question is required.</span>

    <span data-format="%" class="input-symbol-right">

      <input
        type="number"
        name="cccContributions"
        id="cccContributions"
        class="EC46AE22error">
    </span>
  </div><!-- END div.usa-input-error -->

  <!-- 6. Current household tax rate -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="cccTaxRateNow" aria-details="panel-2.6">Current household tax rate:</label>
  <span class="usa-input-error-message" id="cccTaxRateNow-message" role="alert">Current tax rate is required.</span>

    <span data-format="%" class="input-symbol-right">

      <input
        type="number"
        name="cccTaxRateNow"
        id="cccTaxRateNow"
        class="EC46AE22error">    
    </span>
  </div><!-- END div.usa-input-error -->

  <!-- 7. Estimated retirement household tax rate -->
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="cccTaxRateLater" aria-details="panel-2.7">Estimated retirement household tax rate:</label>
  <span class="usa-input-error-message" id="cccTaxRateLater-message" role="alert">Estimated retirement tax rate is required.</span>

    <span data-format="%" class="input-symbol-right">

      <input
        type="number"
        name="cccTaxRateLater"
        id="cccTaxRateLater"
        class="EC46AE22error">          
    </span>
  </div><!-- END div.usa-input-error -->

  <!-- 8. Pay frequency -->
  <label for="cccPaychecks">Pay frequency:</label>
  <select name="cccPaychecks" id="cccPaychecks" class="">
    <option value="26" selected="selected">Biweekly (every 2 weeks, 26 times a year)</option>
    <option value="52">Weekly (52 times a year)</option>
    <option value="24">Semi-monthly (twice a month, 24 times a year)</option>
    <option value="12">Monthly (12 times a year)</option>
  </select>

  <!-- 9. Show equal paycheck impact -->
  <fieldset class="usa-fieldset-inputs show-equal">
  <legend class="usa-sr-only">Show equal paycheck impact (amount deducted) for Roth and traditional contributions.</legend>

  <ul class="usa-unstyled-list">
    <li class="show-equal">
      <input
        id="truth"
        type="checkbox"
        name="historical-figures-1"
        value="truth" />
      <label for="truth">Show equal paycheck impact (amount deducted) for Roth and traditional contributions.</label>
    </li>
  </ul>
  </fieldset>

  <!-- <fieldset>
  <legend class="sr-only">Growth model</legend>
  <label for="paycheckImpact" aria-details="panel-2.9">Show equal paycheck impact (amount deducted) for Roth and traditional contributions.</label>

  <ul class="usa-unstyled-list">
    <li>  
      <input
        type="radio"
        id="showYes"
        name="paycheckImpact"
        value="showYes"
        onclick="">
        <label for="showYes">Yes</label>
    </li>  
    <li>
      <input
        type="radio"
        checked
        id="showNo"
        name="paycheckImpact"
        value="showNo"
        onclick="">
        <label for="showNo">No</label>
    </li>
  </ul>

  </fieldset> -->

  <!-- Explain this -->
  <ul class="usa-accordion explain-this">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.9">
  Explain this
  </button>
  <div id="panel-2.9" class="usa-accordion-content" markdown="1">
  Checking this box reduces the contribution percentage to the Roth balance, so that after paying taxes, your paycheck will be the same as it would be after a contribution to your traditional TSP balance. **If you do not check this box**, the same contribution percentage will be used for Roth and traditional contributions.
  </div>
  </li>
  </ul>






</div><!-- END div.panel-form-field -->

<ul class="navigation-buttons">
<span id="showResults2">
<button class="usa-button " href="javascript:void(0);">Previous</button>
<button id="EC46AE22-Tab2Continue" class="usa-button calculate" href="javascript:void(0);" onclick="processPanel(2, 0, 3, 0); return false;">Calculate</button>
</span>
</ul>

</section> <!-- end section#panel-1 -->

</form>
