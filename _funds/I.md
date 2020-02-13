---
permalink: /funds-individual/i-fund/
layout: fund-details
title: I fund
sidenav: fund-options
Fund_type: Index
Fund_name: I Fund
Fund_order: 5
Fund_subtitle: International Stock Index Investment Fund
Fund_objective: The I Fund's investment objective is to match the performance of the MSCI EAFE (Europe, Australasia, Far East) Index.
Fund_objective_short: Match the performance of the MSCI EAFE (Europe, Australasia, Far East) Index.
questions:
  - question: Why should I invest in the I Fund?
    answer: Investment in the I Fund offers the opportunity to experience gains from equity ownership of non-U.S. companies. Because it represents the stocks of companies in many developed countries (excluding the U.S.), it is an excellent way to diversify the stock portion of your TSP allocation.
  - question: Am I ok with market and inflation risk?
    answer: I Fund returns move up and down with the returns in the MSCI EAFE (market risk). The EAFE Index (and the I Fund returns) will rise or fall as the value of the U.S. dollar decreases or increases relative to the value of the currencies of the countries represented in the EAFE index (currency risk) or if I Fund investments do not grow enough to offset the reduction in purchasing power (inflation risk).
  - question: How can I use the I Fund in my TSP?
    answer: The I Fund can be useful in a portfolio that also contains stock funds that track other indexes such as the C Fund and the S Fund. By investing in all segments of the stock market (as opposed to just one), you reduce your exposure to market risk. The I Fund can also be useful in a portfolio that contains bonds. A retirement portfolio that contains a bond fund like the F Fund, along with other stock funds, like the C and S Funds, will tend to be less volatile than one that contains stock funds alone.
avg_annual_returns:
    ytd: "-"
    one_yr: "-"
    three_yr: "-"
    five_yr: "-"
    ten_yr: "-"
    lifetime: "-"
summary_update: 12/31/2018
summary_details:
    assets: $40.7 billion
    as_of_year: 2019
    gross_expense:  .052
    net_expense:    .042
    other_expense:  .007
    benchmark_index: Dow Jones U.S. Completion TSM Index | www.djindexes.com
    asset_manager: BlackRock Institutional Trust Company, N.A
composition_update: December 31, 2018
country_composition:
    - [Austria, 0.2, 6]
    - [Belgium, 1.0, 10]
    - [Denmark, 1.8, 17]
    - [Finland, 1.0, 12]
    - [France, 11.1, 79]
    - [Germany, 8.8, 64]
    - [Ireland, 0.5, 8]
    - [Italy, 2.3, 23]
    - [Netherlands, 3.4, 19]
    - [Norway, 0.7, 10]
    - [Portugal, 0.2, 3]
    - [Spain, 3.1, 22]
    - [Sweden, 2.7, 32]
    - [Switzerland, 8.7, 38]
    - [United Kingdom, 16.9, 96]
    - [Australia, 6.9, 69]
    - [Hong Kong, 3.9, 47]
    - [Israel, 0.5, 11]
    - [Japan, 24.6, 322]
    - [New Zealand, 0.2, 7]
    - [Singapore, 1.4, 25]
top_ten_update: 12/31/2018
top_ten_holdings:
  - name: Nestl&eacute; S.A.
    abbr: NSRGF
  - name: Toyota Motor Corporation
    abbr: TOYOF
  - name: Novartis AG
    abbr: NVSEF
  - name: Total S.A.
    abbr: TTFNF
  - name: Roche Holding
    abbr: RHHBF
  - name: BP PLC
    abbr: BPAQF
  - name: HSBC Holdings PLC
    abbr: HBCYF
  - name: Royal Dutch Shell PLC Class B
    abbr: RYDBF
  - name: Royal Dutch Shell PLC
    abbr: RYDAF
  - name: Air Group Ltd.
    abbr: AAR
additional_info: |
  By law, the I Fund must be invested in a portfolio designed to track the performance of an index of common stocks representing international stock markets outside of the United States. The Federal Retirement Thrift Investment Board has chosen as its benchmark the MSCI EAFE (Europe, Australasia, Far East) Index, which tracks the overall performance of the major companies and industries in the European, Australian, and Asian stock markets.

  The EAFE Index, published by MSCI, is an index of the equity markets of the developed world outside of the United States and Canada. It is the most widely used international stock index. As of December 31, 2017, the index covered the equity markets of 21 countries, as shown in the table.

  The I Fund is invested in a separate account that is managed by BlackRock Institutional Trust Company, N.A. The I Fund holds common stocks of all the companies represented in the EAFE Index in virtually the same weights that they have in the index. The performance of the I Fund is evaluated on the basis of how closely its returns match those of the EAFE Index.
risks: |
  Your investment in the C Fund is subject to [market risk](#) because the prices of the stocks in the S&P 500 Index rise and fall.

  By investing in the C Fund, you are also exposed to [inflation risk](#), meaning your C Fund investment may not grow enough to offset inflation.
risk_level: high
rewards: |
  While investment in the C Fund carries risk, it also offers the opportunity to experience gains from equity ownership of large and mid-sized U.S. company stocks.
scripts:
bottom-scripts: /assets/js/ajaxFetch.js
document-ready:
  - singleFundData('I');
  - getFundIndexAverageAnnualReturns('I');
  - getGrowthLifetime('I');
  - doCompositionPies();
  - $('.sortableColumn').click(function(e) { toggleSort(this); });
---
