---
permalink: /funds-individual/s-fund/
layout: fund-details
title: S fund
sidenav: fund-options
Fund_type: Index
Fund_name: S Fund
Fund_order: 4
Fund_subtitle: Small cap stock Index investment fund
Fund_objective: The S Fund's investment objective is to match the performance of the Dow Jones U.S. Completion Total Stock Market Index, a broad market index made up of stocks of small-to-medium U.S. companies not included in the S&P 500 Index.
Fund_objective_short: To match the performance of the Dow Jones U.S. Completion Total Stock Market Index.
questions:
  - question: Why should I invest in the S Fund?
    answer: While investment in the S Fund carries risk, it also offers the opportunity to experience gains from equity ownership of small-to-mid-sized U.S. companies. It provides and excellent means of further diversifying your domestic equity holdings.
  - question: Am I ok with market and inflation risk?
    answer: There is a risk of loss if the Dow Jones U.S. Completion TSM Index declines in response to changes in overall economic conditions (market risk) or if the S Fund does not grow enough to offset the reduction in purchasing power (inflation risk).
  - question: How can I use the S Fund in my TSP?
    answer: The S Fund can be useful in a portfolio that also contains stock funds that track other indexes. The C, S, and I Funds, for example, track different segments of the overall stock market without overlapping. By investing in all segments of the stock market (as opposed to just one), you reduce your exposure to market risk.
avg_annual_returns:
    ytd: "-"
    one_yr: "-"
    three_yr: "-"
    five_yr: "-"
    ten_yr: "-"
    inception: "-"
summary_details:
    assets: $67.6 billion
    as_of_year: 2018
    gross_expense:  .052
    net_expense:    .040
    other_expense:  .021
    benchmark_index: Dow Jones U.S. Completion TSM Index | www.djindexes.com
    asset_manager: BlackRock Institutional Trust Company, N.A
composition-update: December 31, 2018
composition:
  - [Communications Services, 5.0]
  - [Consumer Discretionary, 12.0]
  - [Consumer Staples, 2.8]
  - [Energy, 3.4]
  - [Financials, 16.8]
  - [Health Care, 12.4]
  - [Industrials, 13.5]
  - [Information Technology, 17.9]
  - [Materials, 4.4]
  - [Real Estate, 8.7]
  - [Utilities, 3.2]
top_ten_holdings:
  - name: Tesla Motors Inc.
    abbr: TSLA
  - name: Las Vegas Sands Corp.
    abbr: LVS
additional_info: |
  The S Fund is invested in a separate account
  that is managed by BlackRock Institutional
  Trust Company, N.A. The Fund is invested in
  the Dow Jones U.S. Completion TSM Index,
  which contains a large number of stocks,
  including illiquid stocks with low trading
  volume and stocks with prices lower than
  $1.00 per share.

  Therefore, it is not efficient for the Fund to
  invest in every stock in the index. The S Fund
  holds the stocks of most of the companies in
  the index with market values greater than $1
  billion. However, a mathematical sampling
  technique is used to select among the smaller
  stocks.

  The performance of the S Fund is evaluated
  on the basis of how closely its returns match
  those of the Dow Jones U.S. Completion TSM
  Index. A portion of S Fund assets is reserved
  to meet the needs of daily client activity.
  This liquidity reserve is invested in futures
  contracts of the S&P 400 and Russell 2000
  (other broad equity indexes).
risks: |
  Your investment in the C Fund is subject to [market risk](#) because the prices of the stocks in the S&P 500 Index rise and fall.

  By investing in the C Fund, you are also exposed to [inflation risk](#), meaning your C Fund investment may not grow enough to offset inflation.
risk_level: medium-high
rewards: |
  While investment in the C Fund carries risk, it also offers the opportunity to experience gains from equity ownership of large and mid-sized U.S. company stocks.
scripts:
bottom-scripts: /assets/js/ajaxFetch.js
document-ready:
  - singleFundData('S');
  - getFundIndexAverageAnnualReturns('S');
  - getGrowthInception('S');
  - doCompositionPies();
  - $('.sortableColumn').click(function(e) { toggleSort(this); });
---
