---
layout: page
title: Maximize your savings
styles:
sidenav: manage-your-plan
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/calculator/calculator.js
  - /assets/js/calculator/maximize-your-savings.js
permalink: /making-contributions/maximize-your-savings/
---
# Maximize your savings

When it comes to reaching your retirement goals, it’s important that you
maximize your savings. You can start by making sure you’re not leaving free
money on the table. Are you contributing enough to get at least the full match from your agency or service?



<!-- HOW CALCULATED -->
<section id="maximize">
<div class="usa-grid-full">
  <div class="usa-width-one-whole silver"><h2>Here's how we calculate the 5% match.</h2></div>
</div>
<div class="usa-grid-full calculate">
  <div class="usa-width-one-third gradient-1">
    <i class="material-icons md-120">attach_money</i>
    <h3>3%</h3>
    <p>3% of your basic pay is deposited into the traditional balance of your TSP account each pay period.</p></div>
  <div class="usa-width-one-third gradient-2">
    <i class="material-icons md-120">account_balance</i><h3>3%</h3>
    <p>Next, your agency/service matches your 3% contribution dollar-for-dollar.</p></div>
  <div class="usa-width-one-third gradient-3">
    <i class="material-icons md-120">attach_money</i><h3>2%</h3>
    <p>The next 2% will be matched at 50&#162; on the dollar.</p></div>
</div>

<div class="usa-grid-full">
  <div class="usa-width-one-whole ">
  <div class="match silver">Combined with the Agency/Service Automatic (1%) Contributions, Matching Contributions can add as much as 5% free money to your TSP account.</div></div>
</div>
</section> <!-- // end #maximize -->

<!-- CUSTOMIZE YOUR SAVINGS -->
<section id="customize">
<div class="usa-grid-full customize">
  <div class="usa-width-one-whole blue-medium"><h2>Customize your savings</h2></div>
</div>
<div class="usa-grid-full">
  <div class="usa-width-one-third">
  <i class="material-icons md-144">person</i>
  <p><label for="your-age">Age</label>
  <input id="your-age" name="retire-age" type="number"></p></div>
  <div class="usa-width-one-third">
  <i class="material-icons md-144">attach_money</i>
  <p><label for="your-salary">Salary</label>
  <input id="your-salary" name="salary" type="text"></p></div>
  <div class="usa-width-one-third">
  <i class="material-icons md-144">date_range</i>
  <p>
  <label for="pay-frequency">Pay frequency</label>
    <select id="pay-frequency" name="frequency" type="text">
       <option value="Select">Select Your Pay Schedule</option>
       <option value="Biweekly">Biweekly (every 2 weeks, 26 times a year)</option>
       <option value="Weekly">Weekly (52 times a year)</option>
       <option value="Semi-monthly">Semi-monthly (twice a month, 24 times a year)</option>
       <option value="Monthly">Monthly (12 times a year).</option>
    </select></p></div>
</div>
<div class="usa-grid-full">
  <div class="usa-width-one-whole"><button class="usa-button" onClick="calculate(1);">Customize</button></div>
</div>
</section> <!-- // end #customize -->

<!-- HERE'S HOW MUCH YOU SAVED -->
<section id="how-much-you-saved">
<div class="usa-grid-full">
  <div class="usa-width-one-whole blue-medium"><h2>Here's how much you saved</h2></div>
</div>
<!-- CONTRIBUTION AMOUNTS % -->
<div class="usa-grid-full">
 <div class="usa-width-one-third silver"><h3>Your 5% contribution</h3></div>
 <div class="usa-width-one-third silver"><h3>Your 8% contribution</h3></div>
 <div class="usa-width-one-third silver"><h3>Your 10% contribution</h3></div>
</div>
<div class="usa-grid-full value">
 <div class="usa-width-one-third " id="contrib1">$0.00</div>
 <div class="usa-width-one-third " id="contrib2">$0.00</div>
 <div class="usa-width-one-third " id="contrib3">$0.00</div>
</div>

<!-- 1% AGENCY/SERVICE CONTRIBUTION -->
<div class="usa-grid-full">
  <div class="usa-width-one-whole silver"><h3>1% Agency/Service Contribution</h3></div>
</div>
<div class="usa-grid-full value">
  <div class="usa-width-one-whole " id="agencyContrib">$0.00</div>
</div>

<!-- 4% AGENCY/SERVICE CONTRIBUTION -->
<div class="usa-grid-full">
  <div class="usa-width-one-whole silver"><h3>4% Agency/Service Match</h3></div>
</div>
<div class="usa-grid-full value">
  <div class="usa-width-one-whole " id="agencyMatch">$0.00</div>
</div>

<!-- BALANCE blocks for AGEs -->
{% assign ages = "62, 67, 72" | split: ", " %}
{% for age in ages %}
  <!-- BALANCE AGE {{ age }} -->
  <div class="usa-grid-full">
    <div class="usa-width-one-whole silver"><h3>Balance at {{ age }}</h3></div>
  </div>
  <div class="usa-grid-full value">
   <div class="usa-width-one-third" id="balance-1-{{ age }}">$0.00</div>
   <div class="usa-width-one-third" id="balance-2-{{ age }}">$0.00</div>
   <div class="usa-width-one-third" id="balance-3-{{ age }}">$0.00</div>
  </div>
{% endfor %}

<!-- RECALCULATE -->
<div class="usa-grid-full">
  <div class="usa-width-one-whole recalculate">
  <p>Assumes a 3% rate of return, but you can make your own assumptions.</p>
  <label for="your-rate-of-return">Rate of return</label>
    <span>
      <input id="your-rate-of-return" name="return-rate" type="number" value="3.0">
      <span class="percent">%</span>
      <button class="usa-button" onClick="calculate(1);">Recalculate</button>
    </span>
  </div>
</div>

</section> <!-- // end #how-much-you-saved -->

<!-- DON'T LEAVE FREE MONEY ON THE TABLE -->
<section id="free-money-honey">
<div class="usa-grid-full">
  <div class="usa-width-one-whole "><i class="material-icons md-48">attach_money</i></div>
  <div class="usa-width-one-whole ">Don't leave free money on the table!</div>
</div>
</section> <!-- // end #free-money-honey -->

<!-- ![How to maximize your 5% matching contributions](/assets/img/infographs/maximize-your-savings.png) -->

## Am I eligible for matching?
Only employees covered by the <span data-term="Federal Employees' Retirement System (FERS)" class="js-glossary-toggle term term-end">Federal Employees Retirement System</span> (for civilians) and the <span data-term="Blended Retirement System (BRS)" class="js-glossary-toggle term term-end">Blended Retirement System </span> (for uniformed services) are eligible for matching. If you are brand new to federal or uniformed service, you are covered by one of these systems.
