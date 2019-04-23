---
layout: page
title: Ajax TableSummaryOfReturns
permalink: /ajax-test/
scripts:
  - /assets/js/jquery.min.js
  - /pages/ajax-test/index.js
---

# Ajax Test

<div class="usa-grid-full usa-layout-docs-main_content">
<div class="usa-width-one-fourth" markdown="1">
  <button class="usa-button"
    onClick="fetchValue('getCurrentLoanInterestRate.html', 'Loan'); return false;">Loan Rate</button>
</div>

<div class="usa-width-one-fourth" markdown="1">
  <button class="usa-button"
    onClick="fetchValue('getCurrentAnnuityRate.html', 'Annuity'); return false;">Annuity Rate</button>
</div>

<div class="usa-width-one-fourth" markdown="1">
  <button class="usa-button"
    onClick="fetchValue('getCurrentTimeString.html', 'Time'); return false;">Time String</button>
</div>

<div class="usa-width-one-fourth" markdown="1">
  <button class="usa-button"
    onClick="fetchValue('getCurrentBogusRate.html', 'Bogus'); return false;">Bogus Rate</button>
</div>
</div>

<br><br>

<div class="usa-grid-full usa-layout-docs-main_content">
<div class="usa-width-one-half" markdown="1">

Testing using Ajax

</div>

<div id="ajax-block" class="usa-width-one-half" markdown="1">

Nothing so far

</div>
</div>

<!-- CONTENT END -->
