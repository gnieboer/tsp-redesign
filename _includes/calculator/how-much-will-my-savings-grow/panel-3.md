{% comment %}
Results NAME panel (3) for CALC.
{% endcomment %}
{% assign panelID = include.panelID | default: 3 %}
{% assign hide = 'display: block;' %}
{% assign gridClass2 = include.gridClass2 | default: 'results' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<section id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

{% include calculator/infoBox.html icon='info'
    title="Maximizing Agency or Service Contributions"
    textBlock="To receive the maximum Agency or Service Matching Contributions, you must contribute 5% of your basic pay each pay period."
%}


<div class="results-grid-frame" markdown="1">
{% include calculator/resultsRow.html rightID="deferral-limit" right=""
  left="IRS Elective Deferral Limit for <span class='year-choosen'>YYYY</span>" %}
{% include calculator/resultsRow.html rightID="total-contributed" right=""
  left="How much you will have contributed before your new amount is effective" %}

{% capture newAmountTextBlock %}

**Here’s the new amount you can contribute each remaining pay period if you
want to maximize your contributions for <span class='year-choosen'>YYYY</span>**
(rounded down to the nearest dollar).

To change how much you contribute, log into your payroll system and select the Thrift Savings Plan option. Common payroll systems include

[Direct Access]({{ site.baseurl }}/exit/?idx=47){:rel="nofollow"}, [Employee Express]({{ site.baseurl }}/exit/?idx=7){:rel="nofollow"}, EBIS, [LiteBlue]({{ site.baseurl }}/exit/?idx=8){:rel="nofollow"}, [myPay]({{ site.baseurl }}/exit/?idx=6){:rel="nofollow"}, and [NFC EPP]({{ site.baseurl }}/exit/?idx=9){:rel="nofollow"}.

{% endcapture %}
{% assign newAmountTextBlock = newAmountTextBlock | markdownify %}
{% include calculator/resultsRow.html rightID="new-contribution" right="" left=newAmountTextBlock %}

  </div>

  <ul class="usa-accordion icons">
  <!-- PROJECTED BALANCE -->
    <li>
      <button
        class="usa-accordion-button"
        aria-expanded="false"
        aria-controls="projected-balance">
        Projected Account Balance <i class="fal fa-search-dollar" aria-hidden="true"></i>
      </button>
      <div id="projected-balance" class="usa-accordion-content">

      <div class="results-grid-frame">
        <div class="usa-grid results">
          <div class="usa-width-two-thirds">Your existing account balance</div>
          <div class="usa-width-one-third">$
          <span id="accountExisting">350,000.00</span>
          </div>
        </div>
        <div class="usa-grid results">
          <div class="usa-width-two-thirds ">Growth of your existing account balance</div>
          <div class="usa-width-one-third ">$
          <span id="growthExisting">354,268.78</span>
          </div>
        </div>
        <div class="usa-grid results">
          <div class="usa-width-two-thirds ">Your future contributions</div>
          <div class="usa-width-one-third ">$
          <span id="contribFuture">380,745.34</span>
          </div>
        </div>
        <div class="usa-grid results">
          <div class="usa-width-two-thirds ">Growth of your future contributions</div>
          <div class="usa-width-one-third ">$
          <span id="contribFutureGrowth">380,745.34</span>
          </div>
        </div>
        <div class="usa-grid results">
          <div class="usa-width-two-thirds bold">
          Total estimated TSP account balance
          </div>
          <div class="usa-width-one-third bold">$<span id="totalBalance">1,249,854.26</span></div>
        </div>

      </div> <!-- end div.results-grid-frame -->

      </div>
    </li>
    <!-- PROJECTED GROWTH -->
    <li>
      <button
        class="usa-accordion-button"
        aria-expanded="false"
        aria-controls="projected-growth">
        Projected Growth of Your Account <i class="far fa-chart-line" aria-hidden="true"></i>
      </button>
      <div id="projected-growth" class="usa-accordion-content">
        <p>The results below show how much your account will grow over time based on an expected annual rate of return of 6.00%.</p>
      <fieldset class="usa-fieldset-inputs projected-growth">
      <legend class="">Show growth as:</legend>
      <ul class="usa-unstyled-list">
        <li>
        <input type="radio" id="resultSelectorChart" name="resultSelector" value="graph" onclick="showData(0);" checked="">
        <label for="resultSelectorChart"><strong>Graph</strong></label>
        </li>

        <li>
        <input type="radio" id="resultSelectorTable" name="resultSelector" value="table" onclick="showData(1);">
        <label for="resultSelectorTable"><strong>Table</strong></label>
        </li>

        <li>
        <input type="radio" id="resultSelectorCombined" name="resultSelector" value="combined" onclick="showData(2);">
        <label for="resultSelectorCombined"><strong>Combined</strong></label>
        </li>
      </ul>
      </fieldset>
      </div>
    </li>
    <!-- ADJUST YOUR RESULTS -->
    <li>
      <button
        class="usa-accordion-button"
        aria-expanded="true"
        aria-controls="adjust-results">
        Adjust your results <i class="fal fa-sliders-v"></i>
      </button>
      <div id="adjust-results" class="usa-accordion-content">


      <table class="usa-table-borderless">
      <caption class="">Retirement system <a href="javascript:void(0)">Change</a></caption>
      <colgroup><col><col></colgroup>
      <tbody>
      <tr>
        <th scope="row">Retirement system:</th>
        <td>FERS</td>
      </tr>
      </tbody>
      </table>

      <table class="usa-table-borderless">
      <caption>Type(s) of Growth <a href="javascript:void(0)">Change</a></caption>
      <colgroup><col><col></colgroup>
      <tbody>
      <tr>
        <th scope="row">Growth model:</th>
        <td>Both</td>
      </tr>
      </tbody>
      </table>

      <table class="usa-table-borderless">
      <caption>Existing account balance <a href="javascript:void(0)">Change</a></caption>
      <colgroup><col><col></colgroup>
      <tbody>
      <tr>
        <th scope="row">Current account balance:</th>
        <td>$350,000.00</td>
      </tr>
      </tbody>
      </table>

      <table class="usa-table-borderless">
      <caption>Future contributions <a href="javascript:void(0)">Change</a></caption>
      <colgroup><col><col></colgroup>
      <tbody>
      <tr>
        <th scope="row">Years to make contributions:</th>
        <td>12</td>
      </tr>
      <tr>
        <th scope="row">Annual pay:</th>
        <td>$100,000.00</td>
      </tr>
      <tr>
        <th scope="row">Pay schedule:</th>
        <td>Biweekly</td>
      </tr>
      <tr>
        <th scope="row">Percent salary to save:</th>
        <td>19%</td>
      </tr>
      <tr>
        <th scope="row">Expected Percent Salary Increase:</th>
        <td>1.60%</td>
      </tr>
      <tr>
        <th scope="row">Annual catch-up contributions:</th>
        <td>$5,500</td>
      </tr>
      </tbody>
      </table>

      <table class="usa-table-borderless">
      <caption>Account growth <a href="javascript:void(0)">Change</a></caption>
      <colgroup><col><col></colgroup>
      <tbody>
      <tr>
        <th scope="row">Number of years until you start withdrawing:</th>
        <td>12</td>
      </tr>
      <tr>
        <th scope="row">Expected annual return:</th>
        <td>6.00%</td>
      </tr>
      </tbody>
      </table>
      </div>
    </li>
  </ul>

{% include calculator/button-block.html panelID=panelID revise=2 %}

</section>


DISCLAIMER: This calculator is provided for informational purposes only. It is not intended to be used as an investment advisory tool or as a guarantee of a final account balance. Please note that the results shown at the end of this calculator assume that elected contributions are made for the entire year. Results do not take into account the following Internal Revenue Code (IRC) limits: <span data-term="Elective Deferral Limit" class="js-glossary-toggle term term-end">elective deferral</span>, <span data-term="Section 415(c) Limit" class="js-glossary-toggle term term-end">section 415(c)</span>, and <span data-term="Catch-Up Contribution Limit" class="js-glossary-toggle term term-end">catch-up contribution</span>. These limits, which may change every year, determine the maximum annual amount that you and/or your employing agency can contribute to the TSP on your behalf. You can view the current year's limits on the TSP website under [News and resources]({{ site.baseurl }}/news-and-resources/).
{:.disclaimer}
