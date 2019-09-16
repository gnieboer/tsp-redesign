---
layout: calculator
title: How much can I contribute?
styles:
sidenav: calculators
scripts: /assets/js/calculator/javascriptTaxTable.js
permalink: /calculators/how-much-can-i-contribute/panel-static
calculator-name:
progress-steps: "Introduction,Elective Contributions,Elective Deferral Limits"
panel-names:
---

**Choose the year you would like to review, then press Start.**

<!-- PANEL 1 -->
<form>
<code> panel-1 </code>
<section id="panel-1" class="calculator-panel">
  <div data-format="" >
    <label for="options">Calendar year</label>
    <select name="options" id="options">
    <option value="2018">2018</option>
    <option value="2019" selected="">2019</option>
    </select>


  </div>
  <ul class="navigation-buttons">
    <button class="usa-button primary" href="javascript:void(0);" onclick="processPanel(1,0,2,0); return false;">Start</button>
  </ul>
</section> <!-- end section#panel-1 -->

<!-- PANEL 2 -->
<code> panel-2 </code>
<section id="panel-2" class="calculator-panel">
  <fieldset>
  <div class="panel-form-field" >
  <div class="usa-input-error">
  <label class="usa-input-error-label" for="ytd-cont" aria-details="panel-2.1">What is the total dollar amount you've already contributed to the TSP in <span id="yearA"><< YEAR >></span>?</label>
  <span class="usa-input-error-message" id="ytd-cont-error-message" role="alert">Helpful error message</span>
  <span data-format="$" class="input-symbol-left">
  <input id="ytd-cont" name="ytd-cont" class="format-left" value="0" type="number" maxlength="8" onblur="totalContributionGood(true, false);" onchange="totalContributionGood(true, false);" /></span>
  </div>
  <ul class="usa-accordion">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.1">
  Explain this
  </button>
  <div id="panel-2.1" class="usa-accordion-content">
  Your most recent Leave and Earnings statement or payslip will show how much you’ve contributed to the TSP this year, usually labeled “YTD.” If you’ve made traditional and Roth contributions, add them up and enter the total. If you have a civilian and a uniformed services TSP account, use the total amount you’ve contributed to both accounts so far this year. Do not include Agency or Service Automatic (1%) or Matching Contributions. If you use this calculator before your <span id="yearB"><< YEAR >></span> contributions begin, enter 0.
  </div>
  </li>
  </ul>
  </div> <!---->

  <div class="panel-form-field" >
  <label for="est_cont" aria-details="panel-2.2" >How much more will you contribute to the TSP before any changes take effect?</label>
  <span data-format="$" class="input-symbol-left">
    <input id="additionalAmount" name="est_cont" class="positivefloat" value="0" type="number" onblur="totalContributionGood(false, true);" onchange="totalContributionGood(false, true);" /></span>
  <ul class="usa-accordion">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.2">
  Explain this
  </button>
  <div id="panel-2.2" class="usa-accordion-content" markdown="1">

  People often use this calculator to figure out a new dollar amount they should contribute to reach the IRS limit without going over. But when you change how much you’re contributing, it can take 1-2 pay periods for your agency or service to process the new amount. During that time, the TSP will still receive the amount you’re contributing now.

  Enter an estimate of how much you’ll contribute before any changes take effect. If you are uncertain, check with your personnel or finance office.

  </div>
  </li>
  </ul>
  </div> <!---->

  <div class="panel-form-field" >
  <label for="rmn_pmts" aria-details="panel-2.3" >Select the remaining number of salary payments you will receive in <span id="yearD"><< YEAR >></span> after your new amount takes effect:</label>
  <select class="" id="remaining-payments" name="remaining-payments">
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
  <option value="11">11</option>
  <option value="12">12</option>
  <option value="13">13</option>
  <option value="14">14</option>
  <option value="15">15</option>
  <option value="16">16</option>
  <option value="17">17</option>
  <option value="18">18</option>
  <option value="19">19</option>
  <option value="20">20</option>
  <option value="21">21</option>
  <option value="22">22</option>
  <option value="23">23</option>
  <option value="24">24</option>
  <option value="25">25</option>
  <option value="26" selected="">26</option>
  <option value="27">27</option>
  <option value="28">28</option>
  <option value="29">29</option>
  <option value="30">30</option>
  <option value="31">31</option>
  <option value="32">32</option>
  <option value="33">33</option>
  <option value="34">34</option>
  <option value="35">35</option>
  <option value="36">36</option>
  <option value="37">37</option>
  <option value="38">38</option>
  <option value="39">39</option>
  <option value="40">40</option>
  <option value="41">41</option>
  <option value="42">42</option>
  <option value="43">43</option>
  <option value="44">44</option>
  <option value="45">45</option>
  <option value="46">46</option>
  <option value="47">47</option>
  <option value="48">48</option>
  <option value="49">49</option>
  <option value="50">50</option>
  <option value="51">51</option>
  <option value="52">52</option>
  </select>
  <ul class="usa-accordion">
  <li>
  <button class="usa-accordion-button"
  aria-expanded="false"
  aria-controls="panel-2.3">
  Explain this
  </button>
  <div id="panel-2.3" class="usa-accordion-content">
  This will depend on <a onclick="window.open('https://www.tsp.gov/PlanningTools/Calculators/numberOfSalaryPayments.html', '\_blank', 'location=yes,height=450,width=650,scrollbars=yes,status=yes');">how often you are paid</a>
  (biweekly or monthly, for example). If you are uncertain, check with your personnel or finance office.
  </div>
  </li>
  </ul>
  </div> <!---->
</fieldset>
  <!-- navigation buttons -->
  <ul class="navigation-buttons">
  <button class="usa-button " href="javascript:void(0);" title="" onclick="showPanel(1); return false;">Previous</button>
  <span id="showResults2">
  <button class="usa-button " href="javascript:void(0);" title="" onclick="processPanel(2, 0, 3, 0); return false;">Show Results</button>
  </span>
  </ul>
  <div class="tspError pe-error" id="tspErrorytd-cont" style="display: block; text-align: right;"></div>

</section> <!-- end section#panel-2 -->

<!-- PANEL 3 -->
<code> panel-3 </code>
<section id="panel-3" class="calculator-panel" markdown="1">

  **A summary of your computations based on the data you entered is shown below.**

  <div class="usa-alert  usa-alert-info ">
    <div class="usa-alert-body">
        <h3 class="usa-alert-heading">Maximizing Agency or Service Contributions</h3>
        <p class="usa-alert-text">To receive the maximum Agency or Service Matching Contributions, you must contribute 5% of your basic pay each pay period.</p>
    </div>
  </div>

  <div class="usa-alert  usa-alert-info ">
    <div class="usa-alert-body">
        <h3 class="usa-alert-heading">Warning: Accuracy of Results</h3>
        <p class="usa-alert-text">This calculator can provide you with a reasonable estimate. However, calculations may vary from actual contribution amounts because of a variety of factors influencing your pay (including pay increases) and the accuracy of the input.</p>
    </div>
  </div>

  <div class="results-grid-frame">
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Contribution year</div>
    <div class="usa-width-one-third ">
    <span id="contributionYear">2019</span>
    </div>
  </div>
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">IRS Elective Deferral Limit for <span id="yearE"><< YEAR >></span></div>
    <div class="usa-width-one-third ">$
    <span id="deferralLimit">19,500</span>
    </div>
  </div>
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">How much you will have contributed before your new amount is effective</div>
    <div class="usa-width-one-third ">$
    <span id="totalContributed">0</span>
    </div>
  </div>
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Amount you can still contribute this year</div>
    <div class="usa-width-one-third ">$
    <span id="amountAvailable">19,500</span>
    </div>
  </div>
  <div class="usa-grid results">
    <div class="usa-width-two-thirds ">Number of salary payments remaining in <span id="yearF"><< YEAR >></span></div>
    <div class="usa-width-one-third ">
    <span id="paymentsRemaining">6</span>
    </div>
  </div>
  <div class="usa-grid results">
  <div class="usa-width-two-thirds" markdown="1">
  **Here’s the new amount you can contribute each remaining pay period if you want to maximize your contributions for <span id="yearG"><< YEAR >></span>** (rounded down to the nearest dollar).

  To change how much you contribute, log into your payroll system and select the Thrift Savings Plan option. Common payroll systems include [myPay](/other/exit/exit_tsp_website.html?urlIdx= 6 ){:target="\_blank" rel="nofollow"}{:.externalLink}, EBIS, <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=44" title="Employee Personal Page website opens in a new window.">Employee Personal Page</a>, <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=45" title="Employee Express website opens in a new window.">Employee Express</a>, <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=46" title="LiteBlue website opens in a new window.">LiteBlue</a>, and <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=47" title="Direct Access website opens in a new window.">Direct Access</a>.

  </div>
  <div class="usa-width-one-third ">$<span id="newContribution">19,500</span></div>
  </div>
  </div> <!-- end div.results-grid-frame -->

  <!-- navigation buttons -->
  <ul class="navigation-buttons">
  <li><button class="usa-button " href="javascript:void(0);" title="" onclick="showPanel(2); return false;">Revise</button></li>
  </ul>
</section>  <!-- end section#panel-3 -->
</form>
