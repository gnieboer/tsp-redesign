---
layout: page
title: Maximize your savings



styles:
  - /assets/css/Lifecycle.css
  - /assets/css/cssBtn.css

scripts:
  - /assets/js/highcharts.src.js
  - /assets/js/visualizaion-sliders.js
  - /assets/js/visualization-charts.js

permalink: /getStarted/
---
<aside class="usa-width-one-fourth usa-layout-docs-sidenav">
  <ul class="usa-sidenav-list">
    <li>
      <a href="account-basics.html">Account basics</a>
    </li>
    <li>
      <a class="usa-current" href="javascript:void(0);">Maximize your savings</a>
    </li>
    <li>
      <a href="javascript:void(0);">Manage life changes</a>
    </li>
    <li>
      <a href="beneficiary-basics.html">Beneficiary basics</a>
    </li>
    <li>
      <a href="javascript:void(0);">Account troubleshooting</a>
    </li>
  </ul>
</aside>
<main class="usa-grid usa-section usa-content usa-layout-docs" id="main-content">


    <div class="usa-width-three-fourths usa-layout-docs-main_content">
      <h2>How much should I contribute?</h2>
      <p>When contributing to your retirement, make sure you’re not leaving money on the table. By  contributing at least 5% of your pay, you’re taking full advantage of thousands of dollars in matching funds from your agency or service over time.</p>

      <h2 id="section-heading-1">Here’s how it works</h2>
      <p>On top of your salary or basic pay, your agency or service<a href="#fn1"><sup>1</sup></a> will also contribute up to 5% of your pay to your TSP account each paycheck. You only get the full amount if you contribute at least 5%.</p>

      <h2 id="section-heading-2">Here’s an example:</h2>
      <p>For someone making $50,000 annually, 5% is about $95 a paycheck. With your contributions and the full matching from your agency or service, you could accumulate more than $190,000<a href="#fn2"><sup>2</sup></a> in savings over 20 years. In 30 years, you could earn over $400,000<a href="#fn3"><sup>3</sup></a>. Estimates assume 5% in Agency/Service Matching Contributions and a rate of return of 6% compounded monthly over time.</p>
      <p>Take a look at how your savings grow when you maximize your contributions. Find out how much more you can save by taking advantage of your agency's 5% matching funds below.</p>

      <h2>What's the difference between saving<br /> 3% vs 5%?</h2>
<section id="widget">

      <div class="usa-width-one-half">
      <div>

        <input type="radio" name="rs" id="civilian" value="civilian" onChange="reDraw();" checked>

        <label for="civilian">Civilian</label>

        <input type="radio" name="rs" id="usbrs" value="usbrs" onChange="reDraw();">

        <label for="usbrs">US BRS</label>

        <input type="radio" name="rs" id="nonbrs" value="nonbrs" onChange="reDraw();">

        <label for="nonbrs">US Non-BRS</label>

      </div>
      <table cellspacing="0" cellpadding="0" box-sizing="border-box;">
              <tr><td colspan="2" style="padding-top: 1em;">What is your age?</td></tr>
              <tr>
                  <td><div id="sliderAge" style="width: 160px;"></div></td>
                  <td><input id="age" name="age" value="50" onChange="return false;"></td>
              </tr>
              <tr>
                  <td colspan="2">What age do you intend to retire? </td>
              </tr>
              <tr>
                  <td>
                      <div id="sliderRetire" style="width: 160px;"></div>
                  </td>
                  <td>
                      <input id="retire" name="retire" value="50" onChange="return false;"> </td>
              </tr>
              <tr>
                  <td colspan="2">What is your annual salary? </td>
              </tr>
              <tr>
                  <td>
                      <div id="sliderSalary" style="width: 160px;"></div>
                  </td>
                  <td>
                      <input id="salary" name="salary" value="50" onChange="return false;"> </td>
              </tr>
          </table>
      <button onClick='reDraw(); return false;'>Calculate 3% vs 5%</button></div>
      <div class="usa-width-one-half">
      <div id="message" name="message" style="text-align: center">$100,000* earned with as little as $10 per paycheck.<br />Don't leave $20,000 on the table.</div>
      <div id="bar" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
      <!-- <div id="chart" style="min-width: 310px; height: 400px; margin: 0 auto"></div> -->
      <p style="text-align: center;">*Based on a 6% annual rate of return.</p></div>

</section>

<p>&nbsp;</p>
<p>Want to change your TSP contribution amount? You must use your electronic payroll system (e.g. myPay, EBIS, NFC EPP, LiteBlue, Employee Express) or <a href="#">Form TSP-1</a> or <a href="#">Form TSP-U-1</a></p>
<p>&nbsp;</p>
<span style="font-size: 75%; margin-top: 2em;"><sup id="fn1">1</sup>Applies to service members who have opted into the Blended Retirement System.<br />
<sup id="fn2">2</sup>Includes matching contributions and assumes a 6% rate of return compounded monthly.<br />
<sup id="fn3">3</sup>Includes matching contributions and assumes a 6% rate of return compounded monthly.
</span>




  </div>
  </main>
<!-- CONTENT END -->
