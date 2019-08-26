---
title: Rates of returns
layout: page
permalink: /fund-performance/rates-of-returns-xxx/
styles:
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/jquery.numeric.js
  - /assets/js/highcharts/highcharts.js
  - /assets/js/highcharts/data.js
  - /assets/js/calculator/calculator.js
  - /assets/js/ajaxFetch.js
bottom-scripts:
document-ready:
  - getAnnualReturnsAll('annualReturnsAll');
  - chartResize('annualReturnsAll');
---
{% assign chartName = 'annualReturnsAll' %}
# Rates of returns

<section class="fund-selection">
  <!-- LIFECYCLE FUNDS fieldset -->
  <fieldset class="usa-fieldset-inputs usa-sans lifecycle-funds">
    <legend>Lifecycle funds</legend>
    {% include components/get_sorted_fund_list funds='lifecycle' %}
    <ul class="usa-unstyled-list">
      {% for fund in sorted %}  
      <li>
        <input id="{{ fund.Fund_name | replace: " ", "___"}}" type="checkbox" name="rorCB"  checked
              onClick="toggleFund('{{chartName}}', '{{ fund.Fund_name | replace: " ", "___"}}');">
        <label for="{{ fund.Fund_name | replace: " ", "___"}}">{{ fund.Fund_name }}</label>
      </li>
      {% endfor %}
      <li>
        <input type="checkbox" name="rorCB" id="Lfunds" checked
              onClick="toggleFund('{{chartName}}', 'Lfunds');">
              <label for="Lfunds">Select all</label>
      </li>
    </ul>
  </fieldset>

  <!-- INDIVIDUAL FUNDS fieldset -->
  <fieldset class="usa-fieldset-inputs usa-sans individual-funds">
    <legend>Individual funds</legend>

    {% include components/get_sorted_fund_list funds='Individual' %}
    <ul class="usa-unstyled-list">
    <!-- <ul class="usa-unstyled-list flex space-evenly"> -->
      {% for fund in sorted %}    
      <li>
        <input id="{{ fund.Fund_name | replace: " ", "___"}}" type="checkbox" name="rorCB" onClick="toggleFund('{{chartName}}', '{{ fund.Fund_name | replace: " ", "___"}}');">
        <label for="{{ fund.Fund_name | replace: " ", "___"}}">{{ fund.Fund_name }}</label>
      </li>
      {% endfor %}
      <li>
        <input id="InvFunds" type="checkbox" name="rorCB"
              onClick="toggleFund('{{chartName}}', 'InvFunds');">
        <label for="InvFunds">Select all</label>
      </li>
      <li class="break">
        <input id="show-index-funds" type="checkbox" name="index-funds" value="">
        <label for="show-index-funds">Show <span data-term="Index Fund" class="js-glossary-toggle term term-end">index funds</span></label>
      </li>
    </ul>
  </fieldset>
</section>

<div id="{{chartName}}-div" class="usa-grid-full usa-layout-docs-main_content">
<div class="usa-width-one-whole" markdown="1">
  <section id="{{chartName}}-section" class="rates-of-returns">

    <label id="{{ chartName }}-label" for="{{ chartName }}-cb" class="accordion-label">Annual Returns</label>
    <input type="checkbox" id="{{ chartName }}-cb" onClick="toggleChart('{{ chartName }}');">
    <div id="{{ chartName }}" class="hc-annual-returns-all"></div>

    <label id="{{ chartName }}-monthly-label" for="{{ chartName }}-monthly-cb">Monthly Returns</label>
    <input type="checkbox" id="{{ chartName }}-monthly-cb" onClick="toggleChart('{{ chartName }}-monthly');">
    <div id="{{ chartName }}-monthly" class="hc-annual-returns-all">Monthly Returns</div>

    <div class="table-view">
      <button id="{{chartName}}-button" class="usa-button-secondary"
        onClick="toggleTableWidth('{{chartName}}');">
        Expand table <i class="fal fa-expand-wide"></i></button>
    </div>
    <div id="{{chartName}}-table" class="table-side-scroll"></div>
  </section>

</div> <!-- END div.usa-width-one-whole -->
</div> <!-- END div.usa-grid-full -->
