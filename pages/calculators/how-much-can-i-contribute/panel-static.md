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

  <!-- PANEL 1 -->

<div id="panel1" class="calculator-panel" style="display: block;" markdown="1">

Each year the IRS determines the maximum amount you can contribute to tax-deferred savings plans like the TSP. This is known as the <a href="javascript:void(0)">IRS elective deferral limit</a>. Participants should use this calculator to determine the specific dollar amount to be deducted each pay period in order to maximize your contributions and to ensure that you do not miss out on Agency or Service Matching Contributions if you are entitled to them.

**What information do you need to use this calculator?**

- Your most recent Leave and Earnings statement or payslip.
- The number of salary payments you have left for the year.

<div class="dotted-line"></div>

Choose the year you would like to review, then press Start.

<form class="usa-form flex">
<label for="options" class="sr-only">Calendar year</label>
<select name="options" id="options">
<option value>- Select -</option>
<option value="2018">2018</option>
<option value="2019" selected="">2019</option>
</select>
<button class="usa-button primary start">Start</button>
</form>

<div class="usa-alert usa-alert-info ">
<div class="usa-alert-body">
    <h3 class="usa-alert-heading">Special Note for FERS and BRS Participants</h3>
    <p class="usa-alert-text">
This calculator is especially important for FERS employees and members of the
uniformed services covered by the Blended Retirement System (BRS). If you reach the
<a href="javascript:openWindow('/PlanningTools/RetirementPlanningPhases/maximumAmount.html', 650, 650);">IRS elective deferral limit</a>
before the end of the year, your contributions and Agency or Service Matching Contributions
must stop for the remainder of the year. As a result, you will lose some of your Agency or
Service Matching Contributions.
For more detailed information, read the Fact Sheet
<a class="pdfLink" title="File size: 278 KB (opens in a new window)" href="/PDF/formspubs/tspfs07.pdf">Annual Limit on Elective Deferrals</a>.
<br /><br />
The dollar amount determined by using this calculator distributes your employee/member
contributions over the entire year (or remainder of the year), and thus allows you to
receive the maximum Agency or Service Matching Contributions.
</p>
</div>
</div>
</div><!-- end div#panel1 -->

<!-- PANEL 2 -->

<div id="panel2" class="calculator-panel" style="display: block;">
<!-- A -->
<div class="usa-grid calculator ">
  <div class="usa-width-three-fourths ">
    <h4>What is the total dollar amount you've already contributed to the TSP in <span id="yearA">YYYY</span>?</h4>

    <ul class="usa-accordion">

  <li>
    <button class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="a1.1">
      Explain this
    </button>
    <div id="a1.1" class="usa-accordion-content">
      Your most recent Leave and Earnings statement or payslip will show how much you’ve contributed to the TSP this year, usually labeled “YTD.” If you’ve made traditional and Roth contributions, add them up and enter the total. If you have a civilian and a uniformed services TSP account, use the total amount you’ve contributed to both accounts so far this year. Do not include Agency or Service Automatic (1%) or Matching Contributions. If you use this calculator before your <span id="yearB">YYYY</span> contributions begin, enter 0.
    </div>
      </li>
    </ul>

  </div>
  <div class="usa-width-one-fourth float-right">

    <input id="totalMade" name="ytd_cont" class="positivefloat regInput" value="0" type="text" size="8" maxlength="8" onblur="totalContributionGood(true, false);" onchange="totalContributionGood(true, false);" />

  </div>
</div>

<div class="tspError pe-error" id="tspErrortotalMade" style="display: block; text-align: right;"></div>

<div class="dotted-line"></div>

<!-- B -->

<div class="usa-grid calculator ">
  <div class="usa-width-three-fourths "><h4>How much more will you contribute to the TSP before any changes take effect?</h4>

    <ul class="usa-accordion">

  <li>
    <button class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="a1.2">
      Explain this
    </button>
    <div id="a1.2" class="usa-accordion-content">
      <p>People often use this calculator to figure out a new dollar amount they should contribute to reach the IRS limit without going over. But when you change how much you’re contributing, it can take 1-2 pay periods for your agency or service to process the new amount. During that time, the TSP will still receive the amount you’re contributing now.</p>
    <p>Enter an estimate of how much you’ll contribute before any changes take effect. If you are uncertain, check with your personnel or finance office.</p>
    </div>
      </li>
    </ul>
    </div>
  <div class="usa-width-one-fourth float-right">

    <input id="additionalAmount" name="est_cont" class="positivefloat regInput" value="0" type="text" size="8" maxlength="8" onblur="totalContributionGood(false, true);" onchange="totalContributionGood(false, true);" />

  </div>
</div>

<div class="tspError pe-error" id="tspErroradditionalAmount" style="display: block; text-align: right;"></div>

<div class="dotted-line"></div>

<!-- C -->

<div class="usa-grid calculator ">
  <div class="usa-width-three-fourths "><h4>Select the remaining number of salary payments you will receive in <span id="yearD">YYYY</span> after your new amount takes effect:</h4>

     <ul class="usa-accordion">

  <li>
    <button class="usa-accordion-button"
      aria-expanded="false"
      aria-controls="a1.3">
      Explain this
    </button>
    <div id="a1.3" class="usa-accordion-content">
      This will depend on <a onclick="window.open('https://www.tsp.gov/PlanningTools/Calculators/numberOfSalaryPayments.html', '\_blank', 'location=yes,height=450,width=650,scrollbars=yes,status=yes');">how often you are paid</a>
     (biweekly or monthly, for example). If you are uncertain, check with your personnel or finance office.
    </div>
      </li>
    </ul>
  </div>
  <div class="usa-width-one-fourth float-right">
  <select class="greySelect2" id="numberPayment" name="rmn_pmts">
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
  </div>
</div>

<div class="tspError pe-error" id="tspErrornumberPayment" style="display: block; text-align: right;"></div>

  <ul id="button-bar" class="buttonNav flexRow flexEnd">
  <button class="usa-button " href="javascript:void(0);" title="" onclick="showPanel(1); return false;">Previous</button>
  <span id="showResults2">
  <button class="usa-button " href="javascript:void(0);" title="" onclick="processPanel(2, 0, 3, 0); return false;">Show Results</button>
  </span>
  </ul>
</div>

  <!-- PANEL 3 -->

<div id="panel3" class="calculator-panel" style="display: block;">
  <p><strong>A summary of your computations based on the data you entered is shown below.</strong></p>
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
 <div class="results-frame">
<div class="usa-grid calculator results">
  <div class="usa-width-three-fourths ">Contribution year</div>
  <div class="usa-width-one-fourth float-right">
  <span id="contributionYear">2000</span>
  </div>
</div>
<div class="usa-grid calculator results">
  <div class="usa-width-three-fourths ">IRS Elective Deferral Limit for <span id="yearE">YYYY</span></div>
  <div class="usa-width-one-fourth float-right">
  <span id="deferralLimit">2000</span>
  </div>
</div>
<div class="usa-grid calculator results">
  <div class="usa-width-three-fourths ">How much you will have contributed before your new amount is effective</div>
  <div class="usa-width-one-fourth float-right">
  <span id="totalContributed">2000</span>
  </div>
</div>
<div class="usa-grid calculator results">
  <div class="usa-width-three-fourths ">Amount you can still contribute this year</div>
  <div class="usa-width-one-fourth float-right">
  <span id="amountAvailable">2000</span>
  </div>
</div>
<div class="usa-grid calculator results">
  <div class="usa-width-three-fourths ">Number of salary payments remaining in <span id="yearF">YYYY</span></div>
  <div class="usa-width-one-fourth float-right">
  <span id="paymentsRemaining">2000</span>
  </div>
</div>
<div class="usa-grid calculator results">
  <div class="usa-width-three-fourths ">

<strong>Here’s the new amount you can contribute each remaining pay period if you
want to maximize your contributions for <span id="yearG">YYYY</span></strong> (rounded down to the nearest dollar).

<p>To change how much you contribute, log into your payroll system and select the Thrift Savings Plan option. Common payroll systems include <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx= 6" title="myPay website opens in a new window.">myPay</a>, EBIS,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=44" title="Employee Personal Page website opens in a new window.">Employee Personal Page</a>,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=45" title="Employee Express website opens in a new window.">Employee Express</a>,
<a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=46" title="LiteBlue website opens in a new window.">LiteBlue</a>,
and <a class="externalLink" href="/other/exit/exit_tsp_website.html?urlIdx=47" title="Direct Access website opens in a new window.">Direct Access</a>.</p>
</div>
  <div class="usa-width-one-fourth float-right">
  <span id="newContribution">2000</span>
  </div>
</div>
  </div> <!-- end div.deco-box -->
  <ul id="button-bar" class="buttonNav flexRow flexEnd">
<button class="usa-button " href="javascript:void(0);" title="" onclick="showPanel(2); return false;">Revise</button>
  </ul>

</div>
