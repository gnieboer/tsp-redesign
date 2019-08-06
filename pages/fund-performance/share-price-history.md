---
title: Share price history
layout: page
permalink: /fund-performance/share-price-history/
sidenav: fund-options
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
<section class="share-price-table">
<div id="dynamic-share-price-table" class="table-side-scroll">
</div>
</section>
