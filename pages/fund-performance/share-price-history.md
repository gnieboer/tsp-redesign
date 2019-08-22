---
title: Share price history
layout: page
permalink: /fund-performance/share-price-history/
#sidenav: fund-options
scripts:
  - /assets/js/flatpickr/flatpickr.js
  - /assets/js/flatpickr/date-range.js
  - /assets/js/jquery.min.js
  - /assets/js/ajaxFetch.js
  - /assets/js/share-price-history.js
document-ready:
  - getSharePrices();
---

# Share price history

To understand how the TSP calculates rates of return for any given period of time and determines compound annual returns, read the Fact Sheet [_Calculating Periodic Returns and Compound Annual Returns_](/publications/oc05-16w.pdf).

<!-- PROGRAMMED fieldset -->
<section class="fund-selection">
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

<fieldset class="usa-fieldset-inputs usa-sans individual-funds">
  <legend>Individual funds</legend>

  {% include components/get_sorted_fund_list funds='Individual' %}
  <ul class="usa-unstyled-list">
    {% for fund in sorted %}    
    <li>
      <input id="{{ fund.Fund_name | replace: " ", "___"}}" type="checkbox" name="rorCB"
            onClick="toggleFund('{{chartName}}', '{{ fund.Fund_name | replace: " ", "___"}}');">
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

<section class="date-range">
<form class="share-price-date-range" action="javascript:void(0);">
<fieldset>
<label>
  <div>Show share price history between the following dates</div>
  <input id="fundDates" placeholder="Start and end dates..." class="date-range" />
</label>
<button class="usa-button" onClick='getSharePrices();'>Retrieve share prices</button>
<button class="usa-button-secondary" onClick='downloadSharePrices();'>
  Download share prices <i class="fal fa-arrow-alt-to-bottom"></i></button>
</fieldset>
</form>
</section>

{% assign chartName = 'dynamic-share-price' %}
<div id="{{chartName}}-div" class="usa-grid-full usa-layout-docs-main_content">
<div class="usa-width-one-whole" markdown="1">
  <section id="{{chartName}}-section" class="share-price-table">
    <div class="table-view">
      <button id="{{chartName}}-button" class="usa-button-secondary"
        onClick="toggleTableWidth('{{chartName}}');">
        Expand table <i class="fal fa-expand-wide"></i></button>
    </div>
    <div id="{{chartName}}-table" class="table-side-scroll"></div>
  </section>

</div> <!-- END div.usa-width-one-whole -->
</div> <!-- END div.usa-grid-full -->
