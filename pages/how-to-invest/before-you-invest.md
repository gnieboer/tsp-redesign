---
layout: page
title:  Before you invest
styles:
sidenav: fund-options
Fund_type: L
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/jquery.numeric.js
  - /assets/js/highcharts/highcharts.js
  - /assets/js/highcharts/data.js
  - /assets/js/calculator/calculator.js
  - /assets/js/ajaxFetch.js
  - /assets/js/calculator/lifecycle.js
  - /assets/js/calculator/before-you-invest.js
permalink: /how-to-invest/before-you-invest/
---

# Before you invest

Consider the following when you plan your retirement strategy.
{: .usa-font-lead }

<!-- STEP 1 -->
<div class="before-you-invest-tool step1" id="enter-birthdate">
  <h3 class="step-title"><span>1.</span> First, let's see how many years you have to invest. Time impacts your ability to save for retirement.</h3>
  <section class="step-1">
  <div id="year-born-input-error" class="">
      <label id="year-born-label" class="" for="year-born">What year were you born?</label>
      <span id="year-born-error-message" class="" role="alert"></span>
      <input id="year-born" name="year-born" type="text" class="positiveinteger border-bottom"
        onChange="checkYearBorn(0);" onBlur="checkYearBorn(0);" aria-labeledby="year-born-label" aria-describedby="">
  </div>
  </section>
</div>
<p><button onclick="checkYearBorn(1);" class="usa-btn-primary">Find my funds</button></p>

<!-- STEP 2 -->

<div class="before-you-invest-tool">
  <div class="step2" id="review-funds">
    <h3 class="step-title"><span>2.</span> Great! Now review the Lifecycle (L) Funds ideally suited for your time horizon.</h3>
    <div class="usa-grid-full">
      <div id="column-one-outer" class="usa-width-one-third">
        <div id="column-one-inner" class="usa-alert">
        </div>
      </div>
      <div id="column-two-outer" class="usa-width-one-third">
        <div id="column-two-inner" class="usa-alert">
        </div>
      </div>
      <div id="column-three-outer" class="usa-width-one-third">
        <div id="column-three-inner" class="usa-alert">
        </div>
      </div>
    </div>

    <div id="holding-area" class="hide">
    {% include components/before-you-invest-fund-block.html fund="Income"
      one=""
      two="Were born 1955 or earlier or are using your TSP savings or expect to in the near future"
      three="Aims to preserve your assets while providing some growth"
    %}
    {% include components/before-you-invest-fund-block.html fund="2020"
      one=""
      two="Were born 1956&ndash;1961 or plan to need your TSP savings between 2020 and 2024"
      three="Aims to provide moderate growth with a moderate emphasis on preserving your assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2030"
      one=""
      two="Were born 1962&ndash;1971 or plan to need your TSP savings between 2025 and 2034"
      three="Aims to provide moderate-to-high growth over time with a low emphasis on preserving your assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2040"
      one=""
      two="Were born 1972&ndash;1981 or plan to need your TSP savings between 2035 and 2044"
      three="Focused more on the potential for high growth over time than on the preservation of assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2050"
      one=""
      two="Were born 1982 or later or plan to need your TSP savings in 2045 or later"
      three="Focused more on the potential for high growth over time than on the preservation of assets"
    %}
    </div>

    <!-- Best L Fund explained -->
    <!-- Edit "Fund_recommendation" in front matter of /_funds/ -->
    <section class="results-summary">
    <div class="usa-grid">
     <div class="usa-width-one-whole">
      {% include components/get_sorted_fund_list funds=include.funds %}
      {% for fund in sorted %}
        <p id="best-choice-{{ fund.Fund_name | downcase | replace: " ", "-" }}" class="usa-alert-text usa-font-lead best-choice ">
          {{ fund.Fund_recommendation }}
        </p>
      {% endfor %}
     </div>
    </div>
    </section>

  </div>
</div>
