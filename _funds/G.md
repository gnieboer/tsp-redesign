---
permalink: /funds-individual/g-fund/
layout: fund-details
title: G fund
sidenav: fund-options
Fund_type: Index
Fund_name: G Fund
Fund_order: 1
Fund_subtitle: Government Securities Investment Fund
Fund_objective: The G Fund's investment objective is to produce a rate of return that is higher than inflation while avoiding exposure to credit (default) risk and market price fluctuations.
questions:
  - question: Why should I invest in the G Fund?
    answer: The payment of G Fund principal and interest is guaranteed by the U.S. Government. This means that the U.S. Government will always make the required payments.
  - question: Am I ok with market and inflation risk?
    answer: The G Fund is subject to the possibility that your investment will not grow enough to offset the reduction in purchasing power that results from inflation (inflation risk).
  - question: How can I use the G Fund in my TSP?
    answer: Consider investing in the G Fund if you would like to have all or a portion of your TSP account completely protected from loss. If you choose to invest in the G Fund, you are placing a higher priority on the stability and preservation of your money than on the opportunity to potentially achieve greater long-term growth in your account through investment in the other TSP funds.
avg_annual_returns:
    ytd: "-"
    one_yr: "-"
    three_yr: "-"
    five_yr: "-"
    ten_yr: "-"
    inception: "-"
summary_details:
    assets: $67.6 billion
    admin_expense: $0.032/$1,000 account balance. 0.032% (3.2 basis points)
    gross_expense:  .051
    net_expense:    .040
    other_expense:  .000
    benchmark_index: Dow Jones U.S. Completion TSM Index | www.djindexes.com
    asset_manager: BlackRock Institutional Trust Company, N.A
top_ten_holdings:
  - name: Tesla Motors Inc.
    abbr: TSLA
  - name: Las Vegas Sands Corp.
    abbr: LVS
additional_info: |
  The G Fund is invested in short-term U.S. Treasury securities specially issued to the TSP. Payment of principal and interest is guaranteed by the U.S. government. Thus, there is no “credit risk.”

  Although the securities in the G Fund earn a long-term interest rate, the Board’s investment in the G Fund is redeemable on any business day with no risk to principal. The value of  G Fund securities does not fluctuate; only the interest rate changes.

  The G Fund Yield Advantage—The G Fund rate calculation results in a long-term rate being earned on short-term securities. Because long-term interest rates are generally higher than short-term rates, G Fund securities usually earn a higher rate of return than do short-term marketable Treasury securities.
risks: |
  Your investment in the C Fund is subject to [market risk](#) because the prices of the stocks in the S&P 500 Index rise and fall.

  By investing in the C Fund, you are also exposed to [inflation risk](#), meaning your C Fund investment may not grow enough to offset inflation.
rewards: |
  While investment in the C Fund carries risk, it also offers the opportunity to experience gains from equity ownership of large and mid-sized U.S. company stocks.
scripts:
    - /assets/js/jquery.min.js
    - /assets/js/highcharts/highcharts.js
    - /assets/js/highcharts/data.js
bottom-scripts: /assets/js/ajaxFetch.js
document-ready:
  - singleFundData('G');
  - getFundIndexAverageAnnualReturns('G');
  - getGrowthInception('G');
---
