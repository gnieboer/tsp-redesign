---
layout: page
title: Individual funds
styles:
sidenav: fund-options
scripts:
permalink: /funds-individual/
---

{% if include.lifecycle %}
  {% assign sorted = site.funds | where: "Fund_letter", "L" | sort: 'Fund_order' %}
{% else %}
  {% assign sorted = site.funds | where_exp:"fund", "fund.Fund_letter != 'L'" | sort: 'Fund_order' %}
{% endif %}

# Individual funds

We have a selection of individual funds that offer broad market diversification. You can choose to have your retirement dollars invested in everything from a short-term U.S. Treasury security to index funds made of domestic and
international stocks.

<fieldset class="usa-fieldset-inputs usa-sans comparison">
  <legend>Compare up to three funds</legend>
  <ul id="fund-comparison" class="usa-unstyled-list flex space-evenly">
    {% for fund in sorted %}
    <li>
      <input type="checkbox" id="compare-show-{{ fund.Fund_letter | downcase }}-fund" checked>
      <label for="compare-show-{{ fund.Fund_letter | downcase }}-fund">{{ fund.Fund_letter }} fund</label>
    </li>
    {% endfor %}
    <li>
      <input id="truth" type="checkbox" name="historical-figures-1" value="truth" checked>
      <label for="truth">G fund</label>
    </li>
    <li>
      <input id="truth" type="checkbox" name="historical-figures-1" value="truth" checked>
      <label for="truth">C fund</label>
    </li>
  </ul>
</fieldset>

{% include components/fund-comparison.html %}
