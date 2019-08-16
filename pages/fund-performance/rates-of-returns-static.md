---
title: Rates of returns
layout: page
permalink: /fund-performance/rates-of-returns-static/
styles:
scripts:
bottom-scripts:
  - /assets/js/jquery.min.js
  - /assets/js/data-toggle.js
document-ready:
---

# Rates of returns

<!-- DEMO & PROGRAMMING PURPOSES ONLY -->

<!-- <section class="fund-selection">
  <fieldset class="usa-fieldset-inputs usa-sans lifecycle-funds">
    <legend>Lifecycle funds</legend>
    <ul class="usa-unstyled-list">
      <li>
        <input id="lincome" type="checkbox" name="lifecycle-funds" value="lincome" checked>
        <label for="lincome">L Income</label>
      </li>
      <li>
        <input id="l2020" type="checkbox" name="lifecycle-funds" value="l2020">
        <label for="l2020">L 2020</label>
      </li>
      <li>
        <input id="l2030" type="checkbox" name="lifecycle-funds" value="l2030">
        <label for="l2030">L 2030</label>
      </li>
      <li>
        <input id="l2040" type="checkbox" name="lifecycle-funds" value="l2040">
        <label for="l2040">L 2040</label>
      </li>
      <li>
        <input id="l2050" type="checkbox" name="lifecycle-funds" value="l2050">
        <label for="l2050">L 2050</label>
      </li>
      <li>
        <input id="select-all-lifecycle" type="checkbox" name="lifecycle-funds" value="select-all-lifecycle">
        <label for="select-all-lifecycle">Select all</label>
      </li>
    </ul>
  </fieldset>

  <fieldset class="usa-fieldset-inputs usa-sans individual-funds">
    <legend>Individual funds</legend>
    <ul class="usa-unstyled-list">
      <li>
        <input id="gfund" type="checkbox" name="individual-funds" value="gfund">
        <label for="gfund">G Fund</label>
      </li>
      <li>
        <input id="cfund" type="checkbox" name="individual-funds" value="cfund">
        <label for="cfund">C Fund</label>
      </li>
      <li>
        <input id="ffund" type="checkbox" name="individual-funds" value="ffund">
        <label for="ffund">F Fund</label>
      </li>
      <li>
        <input id="sfund" type="checkbox" name="individual-funds" value="sfund">
        <label for="sfund">S Fund</label>
      </li>
      <li>
        <input id="ifund" type="checkbox" name="individual-funds" value="ifund">
        <label for="ifund">I Fund</label>
      </li>
      <li>
      <input id="select-all-individual" type="checkbox" name="individual-funds" value="select-all-individual">
      <label for="select-all-individual">Select all</label>
      </li>
    </ul>
  </fieldset>
</section> -->

<!-- PROGRAMMED fieldset -->
<section class="fund-selection">
  <fieldset class="usa-fieldset-inputs usa-sans lifecycle-funds">
    <legend>Lifecycle funds</legend>
    {% include components/get_sorted_fund_list funds='lifecycle' %}
    <ul class="usa-unstyled-list">
      {% for fund in sorted %}  
      <li>
        <input id="{{ fund.Fund_name | replace: " ", "\___"}}" type="checkbox" name="rorCB"  checked
              onClick="toggleFund('{{chartName}}', '{{ fund.Fund_name | replace: " ", "\___"}}');">
        <label for="{{ fund.Fund_name | replace: " ", "\___"}}">{{ fund.Fund_name }}</label>
      </li>
      {% endfor %}
      <li>
        <input type="checkbox" name="rorCB" id="Lfunds" checked
              onClick="toggleFund('{{chartName}}', 'Lfunds');">
              <label for="Lfunds">Select all</label>
      </li>
    </ul>
  </fieldset>

<fieldset class="usa-fieldset-inputs usa-sans individual-funds">
  <legend>Individual funds</legend>

  {% include components/get_sorted_fund_list funds='index' %}
  <ul class="usa-unstyled-list">
  <!-- <ul class="usa-unstyled-list flex space-evenly"> -->
    {% for fund in sorted %}    
    <li>
      <input id="{{ fund.Fund_name | replace: " ", "\___"}}" type="checkbox" name="rorCB" checked
            onClick="toggleFund('{{chartName}}', '{{ fund.Fund_name | replace: " ", "\___"}}');">
      <label for="{{ fund.Fund_name | replace: " ", "\___"}}">{{ fund.Fund_name }}</label>
    </li>
    {% endfor %}
    <li>
      <input id="InvFunds" type="checkbox" name="rorCB" checked
            onClick="toggleFund('{{chartName}}', 'InvFunds');">
      <label for="InvFunds">Select all</label>
    </li>
  </ul>
  <ul class="usa-unstyled-list index-funds">
  <li>
    <input id="show-index-funds" type="checkbox" name="index-funds" value="">
    <label for="show-index-funds">Show <span data-term="Index Fund" class="js-glossary-toggle term term-end">index funds</span></label>
  </li>
  </ul>
</fieldset>
</section>

<!-- TABLE -->
<div class="usa-grid-full usa-layout-docs-main_content">
<div class="usa-width-one-whole">
<section class="share-price-table">
<div class="table-side-scroll">
<table>
<colgroup>
<col class="column-width">
</colgroup>
<thead>
<tr>
	<th scope="col">Year</th>
	<th scope="col" class="border-l-fund">L Income</th>
  <th scope="col" class="border-l-fund">L 2020</th>
  <th scope="col" class="border-l-fund">L 2030</th>
  <th scope="col" class="border-l-fund">L 2040</th>
  <th scope="col" class="border-l-fund">L 2050</th>
  <th scope="col" class="border-g-fund">G Fund</th>
  <th scope="col" class="border-f-fund">F Fund</th>
  <th scope="col" class="border-index-f">U.S. Agg Bond Index</th>
  <th scope="col" class="border-c-fund">C Fund</th>
  <th scope="col" class="border-index-c">S&P 500 Index</th>
  <th scope="col" class="border-s-fund">S Fund</th>
  <th scope="col" class="border-index-s">DJ U.S. Completion TSM Index</th>
  <th scope="col" class="border-i-fund">I Fund</th>
  <th scope="col" class="border-index-i">EAFE Index</th>
</tr>
</thead>
<tbody>
  <tbody class="annual-returns">
  	<tr>
  		<th scope="row">
  			<label for="year_2019">2019 (YTD)</label>
  			<input type="checkbox" name="year_2019" id="year_2019" data-toggle="toggle">
  		</th>
      <td>4.70%</td>
      <td>6.08%</td>
      <td>11.03%</td>
      <td>12.96%</td>
      <td>4.70%</td>
      <td>6.08%</td>
      <td>11.03%</td>
      <td>12.96%</td>
      <td>4.70%</td>
      <td>6.08%</td>
      <td>11.03%</td>
      <td>12.96%</td>
      <td>4.70%</td>
      <td>6.08%</td>
  	</tr>
  </tbody>
  <tbody class="monthly-returns hide">
  	<tr>
  		<th scope="row">July</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  	<tr>
  		<th scope="row">June</th>
      <td>2.04%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  	</tr>
  </tbody>
  <tbody class="annual-returns">
  	<tr>
  		<th scope="row">
  			<label for="year_2018">2018</label>
  			<input type="checkbox" name="year_2018" id="year_2018" data-toggle="toggle">
  		</th>
      <td>12.96%</td>
      <td>6.08%</td>
      <td>4.70%</td>
      <td>11.03%</td>
      <td>4.70%</td>
      <td>6.08%</td>
      <td>11.03%</td>
      <td>12.96%</td>
      <td>4.70%</td>
      <td>6.08%</td>
      <td>11.03%</td>
      <td>12.96%</td>
      <td>4.70%</td>
      <td>6.08%</td>
  	</tr>
  </tbody>
  <tbody class="monthly-returns hide">
  	<tr>
  		<th scope="row">December</th>
      <td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  	<tr>
  		<th scope="row">November</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
    <tr>
  		<th scope="row">October</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  	<tr>
  		<th scope="row">September</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  	<tr>
  		<th scope="row">August</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
    <tr>
  		<th scope="row">July</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  	<tr>
  		<th scope="row">June</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
    <tr>
  		<th scope="row">May</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  	<tr>
  		<th scope="row">April</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  	<tr>
  		<th scope="row">March</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
    </tr>
    <tr>
  		<th scope="row">February</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  	<tr>
  		<th scope="row">January</th>
  		<td>1.57%</td>
  		<td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
  		<td>1.57%</td>
  		<td>2.04%</td>
      <td>2.04%</td>
  		<td>4.11%</td>
  		<td>4.87%</td>
      <td>4.87%</td>
      <td>4.11%</td>
      <td>2.04%</td>
  	</tr>
  </tbody>
</tbody>
</table>
</div>
</section>
</div> <!-- END div.usa-width-one-whole -->
</div> <!-- END div.usa-grid-full -->
