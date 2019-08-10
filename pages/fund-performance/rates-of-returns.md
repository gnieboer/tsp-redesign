---
title: Rates of returns
layout: page
permalink: /fund-performance/rates-of-returns/
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


<fieldset class="usa-fieldset-inputs usa-sans comparison">
  <legend>Legend</legend>
  {% include components/get_sorted_fund_list funds='lifecycle' %}
  <ul id="fund-comparison" class="usa-unstyled-list flex space-evenly">
    <li>
      <input type="checkbox" name="rorCB" id="Lfunds" checked
            onClick="toggleFund('{{chartName}}', 'Lfunds');">
            <label for="Lfunds"></label>
    </li>
    {% for fund in sorted %}
    <li>
      <input type="checkbox" name="rorCB" id="{{ fund.Fund_name | replace: " ", "___"}}" checked
            onClick="toggleFund('{{chartName}}', '{{ fund.Fund_name | replace: " ", "___"}}');">
      <label for="{{ fund.Fund_name | replace: " ", "___"}}">{{ fund.Fund_name }}</label>
    </li>
    {% endfor %}
  </ul>
  {% include components/get_sorted_fund_list funds='index' %}
  <ul id="fund-comparison" class="usa-unstyled-list flex space-evenly">
    <li>
      <input type="checkbox" name="rorCB" id="InvFunds" checked
            onClick="toggleFund('{{chartName}}', 'InvFunds');">
      <label for="InvFunds"></label>
    </li>
    {% for fund in sorted %}
    <li>
      <input type="checkbox" name="rorCB" id="{{ fund.Fund_name | replace: " ", "___"}}" checked
            onClick="toggleFund('{{chartName}}', '{{ fund.Fund_name | replace: " ", "___"}}');">
      <label for="{{ fund.Fund_name | replace: " ", "___"}}">{{ fund.Fund_name }}</label>
    </li>
    {% endfor %}
  </ul>
</fieldset>

<div id="{{chartName}}-div" class="usa-grid-full usa-layout-docs-main_content">
<div class="usa-width-one-whole" markdown="1">
  <section class="rates-of-returns">
    <div id="{{ chartName }}" class="highcharts-container hc-annual-returns-all"></div>
    <div class="table-view">
      <button id="{{chartName}}-button" class="usa-button-secondary"
        onClick="toggleTable('{{chartName}}');">
        Expand table <i class="fal fa-expand-wide"></i></button>
    </div>
    <div id="{{chartName}}-table" class="table-side-scroll"></div>
  </section>

</div> <!-- END div.usa-width-one-whole -->
</div> <!-- END div.usa-grid-full -->
