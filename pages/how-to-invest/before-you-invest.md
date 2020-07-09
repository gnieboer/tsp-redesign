---
layout: page
title:  Before you invest
styles:
sidenav: fund-options
Fund_type: L
scripts:
  - /assets/js/jquery.min.js
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
  {% assign year = 'now' | date: "%Y" %}
  {% assign minyear = year | minus: 120 %}
  {% assign maxyear = year | minus: 15 %}
  <div id="year-born-div" class="">
      <label id="year-born-label" class="" for="year-born">What year were you born?</label>
      <span id="year-born-error-message" class="usa-input-error-message" role="alert"></span>
      <input id="year-born" name="year-born" type="number" class="border-bottom"
        min="{{minyear}}" max="{{maxyear}}" step="1"
        onChange="checkYearBorn(0);" onBlur="checkYearBorn(0);"
        aria-labeledby="year-born-label" aria-describedby="">
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
      one="The short-term investor"
      two="Were born 1958 or earlier or are using your TSP savings or expect to in the near future"
      three="Aims to preserve your assets while providing some growth"
    %}
    {% include components/before-you-invest-fund-block.html fund="2025"
      one="The short-term investor"
      two="Were born 1958&ndash;1964 or plan to need your TSP savings between next year and 2027"
      three="Aims to provide moderate growth with a moderate emphasis on preserving your assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2030"
      one="The medium-term investor"
      two="Were born 1965&ndash;1969 or plan to need your TSP savings between 2028 and 2032"
      three="Aims to provide moderate-to-high growth over time with a low emphasis on preserving your assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2035"
      one="The medium-term investor"
      two="Were born 1970&ndash;1974 or plan to need your TSP savings between 2033 and 2037"
      three="Aims to provide moderate-to-high growth over time with a low emphasis on preserving your assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2040"
      one="The long-term investor"
      two="Were born 1975&ndash;1979 or plan to need your TSP savings between 2038 and 2042"
      three="Focuses more on the potential for high growth over time than on the preservation of assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2045"
      one="The long-term investor"
      two="Were born 1980&ndash;1984 or plan to need your TSP savings between 2043 and 2047"
      three="Focuses more on the potential for high growth over time than on the preservation of assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2050"
      one="The long-term investor"
      two="Were born 1985&ndash;1989 or plan to need your TSP savings between 2048 and 2052"
      three="Focuses more on the potential for high growth over time than on the preservation of assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2055"
      one="The long-term investor"
      two="Were born 1990&ndash;1994 or plan to need your TSP savings between 2053 and 2057"
      three="Focuses more on the potential for high growth over time than on the preservation of assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2060"
      one="The long-term investor"
      two="Were born 1995&ndash;1999 or plan to need your TSP savings between 2058 and 2062"
      three="Focuses more on the potential for high growth over time than on the preservation of assets"
    %}
    {% include components/before-you-invest-fund-block.html fund="2065"
      one="The long-term investor"
      two="Were born after 1999 or plan to need your TSP savings after 2062"
      three="Focuses more on the potential for high growth over time than on the preservation of assets"
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
