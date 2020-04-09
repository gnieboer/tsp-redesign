---
layout: page
title: Lifecycle funds
styles:
sidenav: fund-options
scripts:
permalink: /funds-lifecycle/
scripts:
    - /assets/js/jquery.min.js
    - /assets/js/fund-comparison.js
bottom-scripts: /assets/js/ajaxFetch.js
document-ready:
  - clickFund(1);
  - clickFund(2);
  - clickFund(3);
  - groupFundAnnualReturns('Lfunds');
redirect_from:
  - /InvestmentFunds/FundOptions/
  - /InvestmentFunds/FundsOverview/comparisonMatrix/
---

# Lifecycle funds

The L Funds, or Lifecycle Funds, offer a simple, low maintenance way of investing money in your TSP account by using an appropriate mix of the G, F, C, S, and I Funds that most closely matches your time horizon, or target retirement date.

The L Funds’ investment objective is to strike an optimal balance between the expected risk and return associated with each fund. Any other use of the L Funds may result in a greater amount of risk in your portfolio than is necessary in order to achieve the same expected rate of return.

As your retirement date approaches, the investment mix of each L Fund becomes more conservative (less risky), and it is automatically adjusted for you. The L Funds make the investing process easy for you because you do not have to figure out how to diversify your account or how and when to rebalance - it’s done for you.

#### Risks

When you invest in the L Funds, you are subject to the investment risks associated with the G, F, C, S, and I funds. This means that the L Funds can have periods of gain and loss, just as the individual TSP funds do.

{% include components/fund-comparison.html funds='lifecycle' %}
