---
layout: page
title:  Before you invest
styles:
sidenav: fund-options
scripts:
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/jquery.numeric.js
  - /assets/js/calculator/calculator.js
  - /assets/js/calculator/before-you-invest.js
permalink: /how-to-invest/before-you-invest/
---

# Before you invest

Consider the following when you plan your retirement strategy.
{: .usa-font-lead }

<!-- STEP 1 -->
<div class="before-you-invest-tool step1" id="enter-birthdate">
  <h3 class="step-title"><span>1.</span> First, let's see how many years you have to invest. Time impacts your ability to save for retirement.</h3>
  <p><label for="your-age">What year were you born?</label>
  <input id="year-born" name="year-born" type="text" class="positiveinteger regInput"></p>
  <p><button onclick="checkYearBorn(1);" class="usa-btn-primary">Find my funds</button></p>
</div>

<!-- STEP 3 -->
<div class="before-you-invest-tool">
  <div class="step3" id="review-funds" style="display:block;">
    <h3 class="step-title"><span>2.</span> Great! Now review the funds ideally suited for your time horizon</h3>
    <div class="usa-grid-full">
{% include components/before-you-invest-fund-block.html fund="Income"
  one="You want to minimize the effect of the market DAV"
  two="You need stability in your account DAV"
  three="You are no longer concerned with long-term growth DAV"
%}
{% include components/before-you-invest-fund-block.html fund="2020"
  one="You're intolerant of dips in the market DAV"
  two="You can no longer tolerate risk DAV"
  three="You no longer prioritize long-term growth DAV"
%}
{% include components/before-you-invest-fund-block.html fund="2030"
  one="You get anxious with every dip in the market"
  two="You place higher priority on stability and less risk"
  three="You place less priority on significant long-term growth"
%}
{% include components/before-you-invest-fund-block.html fund="2040"
  one="You prefer a low maintenance way of investing money"
  two="You prefer a diversified mix of funds in your portfolio"
  three="You would like to set-it and forget-it"
%}
{% include components/before-you-invest-fund-block.html fund="2050"
  one="You're willing to tolerate ups and downs in your account"
  two="You have more time to let your money ride out the market waves"
  three="You place higher priority on achieving long-term growth"
%}
    </div>

    <!-- should this be a grid? -->
    <div class="usa-alert usa-alert-info" >
    <div class="usa-alert-body best">
      <p id="best-choice" class="usa-alert-text usa-font-lead">Based on the year you were born L XXXX is a good choice for you because you have time.</p>
    </div>
  </div>
</div>
