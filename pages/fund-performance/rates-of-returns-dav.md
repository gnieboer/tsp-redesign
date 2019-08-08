---
title: Rates of returns
layout: page
permalink: /fund-performance/rates-of-returns-dav/
styles:
sidenav: fund-options
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/jquery.numeric.js
  - /assets/js/highcharts/highcharts.js
  - /assets/js/highcharts/data.js
  - /assets/js/calculator/calculator.js
  - /assets/js/ajaxFetch.js
bottom-scripts:
document-ready:
  - getAnnualReturnsAll();
---
# Rates of returns

<div id="data-table" class="usa-grid-full usa-layout-docs-main_content">
<div class="usa-width-one-whole" markdown="1">
  <section class="rates-of-returns">
  <div class="table-view">
  <button class="usa-button-secondary" onClick="alert('This button should toggleClass .usa-grid-full from div#data-table. Toggle button text to read Collapse table and change icon to <i class=far fa-compress-wide></i>');">
    Expand table <i class="fal fa-expand-wide"></i></button></div>
    <!-- This button should toggleClass .usa-grid-full from div#data-table -->
  <div id="dynamic-share-price-table" class="table-side-scroll">
  </div>
  </section>

</div> <!-- END div.usa-width-one-whole -->
</div> <!-- END div.usa-grid-full -->

<div class="usa-grid-full usa-layout-docs-main_content">
  <div class="usa-width-one-whole">
    <div id="annualReturnsAll" class="hc-annual-returns-all"></div>
    <div id="annualReturnsAllTable" class="table-side-scroll"></div>
  </div>
</div>
