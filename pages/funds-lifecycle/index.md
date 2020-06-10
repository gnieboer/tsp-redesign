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
  - /InvestmentFunds/FundsOverview/comparisonMatrix.html
---

# Lifecycle (L) Funds

Each of the ten L Funds is a diversified mix of the five core funds (G, F, C, S, and I). They were designed to let you
invest your entire portfolio in a single L Fund and get the best expected return for the amount of expected risk that is
appropriate for you.

Every quarter (three months), the target allocations of all the L Funds except L Income are automatically adjusted,
gradually shifting them from higher risk and reward to lower risk and reward as they get closer to their target dates.
When an L Fund reaches its target date, it goes out of existence and any money in it becomes part of the L Income
Fund, which generally keeps the same target allocation. For example, in 2025, the L 2025 Fund will be rolled into the L
Income Fund.

One of the important things about the L Funds is that they stick to their target allocations for a full quarter regardless of
what the markets do. Every trading day, some of the core funds in an L Fund will do better than others. At the end of the
day, the core funds that did better will make up a higher percentage of the L Fund than the ones that did less well. To
maintain each L Fund’s target allocation, we rebalance it at the end of every trading day. We do this by buying and
selling the core funds that make up the L Fund so that the percentages go back to what they were at the beginning of
the day. In effect we’re buying low and selling high at the end of every trading day.

{% include components/fund-comparison.html funds='lifecycle' %}
