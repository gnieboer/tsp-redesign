---
title: Administrative costs
layout: page
permalink: /account-basics/administrative-costs/
sidenav: manage-your-plan
styles:
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/responsive-comparison-table.js
bottom-scripts: /assets/js/ajaxFetch.js
document-ready:
  - groupFundAnnualReturns('Lfunds');
  - groupFundAnnualReturns('Index');
---

# Administrative costs

Our expenses are the costs of administering your TSP. The **gross** expenses include

* the costs of operating and maintaining the our recordkeeping system,
* the cost of providing participant services, and
* the printing and mailing of notices, statements, and publications.

These expenses are paid by the forfeitures of Agency/Service Automatic (1%) Contributions of FERS and BRS participants who leave federal service before they are vested, other forfeitures, and loan fees. Because these amounts are not sufficient to cover all of the TSP's expenses, you share in the remainder of the costs.

**Net** expenses represent the amount that your investment returns were reduced by TSP administrative expenses.

__For 2018, the average net expense for participants was $.040* for every $1,000 invested.__

Expense ratios may also be expressed in basis points. One basis point is 1/100th of one percent, or .01%. Therefore, the 2018 net expense ratio* of .040% is 4 basis points. Expressed either way, this means that expenses charged to your account in 2018 were approximately 40 cents per $1,000 of investment.

\*_Other expenses are fees paid to the investment manager._

<!-- DIRTY Responsive pricing table HTML -->


<section class="comparison" markdown="1">

## Lifecycle funds
{% assign sorted = site.funds | where: "Fund_type", "L" | sort: 'Fund_order' | reverse %}
{% assign rowString = "YTD|Year-to-date, 1YR|1-year, 3YR|3-year, 5YR|5-year, 10YR|10-year, Life|Life" %}
{% assign rows = rowString | split: ', ' %}

<ul class="funds">
{% for fund in sorted %}
  <li>
    <button{% if forloop.index == 3 %} class="active"{% endif %}>{{ fund.Fund_name }}</button>
  </li>
{% endfor %}
</ul>

<table>
  <thead>
    <tr>
      <th class="hide"></th>
      {% for fund in sorted %}
        <th class="bg-blue{% if forloop.index == 3 %} default{% endif %}">{{ fund.Fund_name }}</th>
      {% endfor %}
    </tr>
  </thead>
  <tbody>

    <tr>
      <td colspan="6" class="sep">Rates of Return <span id="l-fund-as-of">as of M/D/YYYY</span></td>
    </tr>
{% for r in rows %}
{% assign c = r | split: '|' %}
    <tr>
      <td>{{ c[1] }}</td>
      {% for fund in sorted %}
        <td{% if forloop.index == 3 %} class="default"{% endif %} id='ret-{{c[0]}}-{{ fund.Fund_name | downcase | replace: " ", "-" }}'>-</td>
      {% endfor %}
    </tr>
{% endfor %}
    <tr>
      <td colspan="6" class="sep">YYYY Administrative Expenses</td>
    </tr>
    <tr>
      <td>Gross</td>
      <td>{{ site.data.funds.L_2050_gross}}</td>
      <td>{{ site.data.funds.L_2040_gross}}</td>
      <td class="default">{{ site.data.funds.L_2030_gross}}</td>
      <td>{{ site.data.funds.L_2020_gross}}</td>
      <td>{{ site.data.funds.L_Income_gross}}</td>
    </tr>
    <tr>
      <td>Net<sup>1</sup></td>
      <td>{{ site.data.funds.L_2050_net}}</td>
      <td>{{ site.data.funds.L_2040_net}}</td>
      <td class="default">{{ site.data.funds.L_2030_net}}</td>
      <td>{{ site.data.funds.L_2020_net}}</td>
      <td>{{ site.data.funds.L_Income_net}}</td>
    </tr>
    <tr>
      <td colspan="6" class="sep">YYYY Other Expenses<sup>2</sup></td>
    </tr>
    <tr>
      <td></td>
      <td>{{ site.data.funds.L_2050_other}}</td>
      <td>{{ site.data.funds.L_2040_other}}</td>
      <td class="default">{{ site.data.funds.L_2030_other}}</td>
      <td>{{ site.data.funds.L_2020_other}}</td>
      <td>{{ site.data.funds.L_Income_other}}</td>
    </tr>

  </tbody>
</table>

## Individual funds
{% assign sorted = site.funds | where_exp:"fund", "fund.Fund_type != 'L'" | sort: 'Fund_order' %}

<ul class="funds">
{% for fund in sorted %}
  <li>
    <button{% if forloop.index == 3 %} class="active"{% endif %}>{{ fund.Fund_name }}</button>
  </li>
{% endfor %}
</ul>

<table>
  <thead>
    <tr>
      <th class="hide"></th>
      {% for fund in sorted %}
        <th class="bg-blue{% if forloop.index == 3 %} default{% endif %}">{{ fund.Fund_name }}</th>
      {% endfor %}
    </tr>
  </thead>
  <tbody>

    <tr>
      <td colspan="6" class="sep">Rates of Return <span id="index-as-of">as of M/D/YYYY</span></td>
    </tr>
    {% for r in rows %}
    {% assign c = r | split: '|' %}
        <tr>
          <td>{{ c[1] }}</td>
          {% for fund in sorted %}
            <td{% if forloop.index == 3 %} class="default"{% endif %} id='ret-{{c[0]}}-{{ fund.Fund_name | downcase | replace: " ", "-" }}'>-</td>
          {% endfor %}
        </tr>
    {% endfor %}
    <tr>
      <td colspan="6" class="sep">YYYY Administrative Expenses</td>
    </tr>
    <tr>
      <td>Gross</td>
      <td>{{ site.data.funds.G_Fund.gross}}</td>
      <td>{{ site.data.funds.F_Fund.gross}}</td>
      <td class="default">{{ site.data.funds.C_Fund.gross}}</td>
      <td>{{ site.data.funds.S_Fund.gross}}</td>
      <td>{{ site.data.funds.I_Fund.gross}}</td>
    </tr>
    <tr>
      <td>Net<sup>1</sup></td>
      <td>{{ site.data.funds.G_Fund.net}}</td>
      <td>{{ site.data.funds.F_Fund.net}}</td>
      <td class="default">{{ site.data.funds.C_Fund.net}}</td>
      <td>{{ site.data.funds.S_Fund.net}}</td>
      <td>{{ site.data.funds.I_Fund.net}}</td>
    </tr>
    <tr>
      <td colspan="6" class="sep">YYYY Other Expenses<sup>2</sup></td>
    </tr>
    <tr>
      <td></td>
      <td>{{ site.data.funds.G_Fund.other}}</td>
      <td>{{ site.data.funds.F_Fund.other}}</td>
      <td class="default">{{ site.data.funds.C_Fund.other}}</td>
      <td>{{ site.data.funds.S_Fund.other}}</td>
      <td>{{ site.data.funds.I_Fund.other}}</td>
    </tr>
  </tbody>
</table>

The returns for the TSP funds represent net earnings after the deduction of administrative expenses and, in the cases of the F, C, S, I, and L Funds, after deduction of trading costs and investment management fees as of January 31, 2019. Additional information about the TSP funds; their related indexes; and their respective monthly, annual, and 10-year returns can be found in the TSP Fund Information sheets or by visiting [Fund Performance](/fund-performance/).

**Additional information about the TSP core funds:** The Government Securities Investment (G) Fund contains government securities; the Fixed Income Index
Investment (F) Fund contains government, corporate, and asset-backed bonds; the Common Stock Index Investment (C) Fund contains stocks of large and mediumsized U.S. companies; the Small Capitalization Stock Index Investment (S) Fund contains stocks of small to medium-sized U.S. companies; and the International Stock Index Investment (I) Fund contains stocks from more than 20 developed countries.

<sup>1</sup>Net administrative expenses are the expenses charged to TSP participants per dollar invested in the respective funds after offsetting gross administrative expenses
with account forfeitures and loan fees.

<sup>2</sup>Fees paid to investment manager
</section>
