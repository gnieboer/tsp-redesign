---
layout: page
title: Individual funds
styles:
sidenav: fund-options
scripts:
permalink: /funds-individual/
scripts:
    - /assets/js/jquery.min.js
    - /assets/js/fund-comparison.js
bottom-scripts: /assets/js/ajaxFetch.js
document-ready:
  - clickFund(1);
  - clickFund(3);
  - clickFund(5);
  - groupFundAnnualReturns('Index');
---

# Individual funds

We have a selection of individual funds that offer broad market diversification. You can choose to have your retirement dollars invested in everything from a short-term U.S. Treasury security to index funds made of domestic and
international stocks.

{% include components/fund-comparison.html  funds='Individual' %}
