---
layout: page
title: What contributions do I start with?



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
      <a href="javascript:void(0);">Overview</a>
    </li>
    <li>
      <a href="javascript:void(0);">Account basics</a>
    </li>
    <li>
      <a class="usa-current" href="javascript:void(0);">Starting contributions</a>
    </li>
    <li>
      <a href="javascript:void(0);">Revisiting your TSP</a>
    </li>
    <li>
      <a href="javascript:void(0);">Beneficiary basics</a>
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
      <p>On top of your salary or basic pay, your agency or service will also contribute up to 5% of your pay to your TSP account each paycheck. You only get the full amount if you contribute at least 5%.</p>

      <h2 id="section-heading-2">Here’s an example:</h2>
      <p>For someone making $50,000 annually, 5% is about $95 a paycheck. With your contributions and the full matching from your agency or service, you could accumulate more than $190,000 in savings over 20 years. In 30 years, you could earn over $400,000.</p>
      <p>Take a look at how your savings grow when you maximize your contributions.</p>
      <h1>What's the difference between saving 3% vs 5%?</h1>
      <span style="color: #706e6e">Find out how much more you can save by taking advantage of your agency's 5% matching funds.</span>

      <table cellspacing="0" cellpadding="0" box-sizing="border-box;">
              <tr>
                  <td colspan="2">What is your age? </td>
              </tr>
              <tr>
                  <td>
                      <div id="sliderAge" style="width: 300px;"></div>
                  </td>
                  <td>
                      <input id="age" name="age" value="50" onChange="return false;"> </td>
              </tr>
              <tr>
                  <td colspan="2">What age do you intend to retire? </td>
              </tr>
              <tr>
                  <td>
                      <div id="sliderRetire" style="width: 300px;"></div>
                  </td>
                  <td>
                      <input id="retire" name="retire" value="50" onChange="return false;"> </td>
              </tr>
              <tr>
                  <td colspan="2">What is your annual salary? </td>
              </tr>
              <tr>
                  <td>
                      <div id="sliderSalary" style="width: 300px;"></div>
                  </td>
                  <td>
                      <input id="salary" name="salary" value="50" onChange="return false;"> </td>
              </tr>
          </table>
      <button onClick='reDraw(); return false;'>Calculate 3% vs 5%</button>
      <hr>
      <BR>
      <BR>

      <div id="message" name="message">
          <h2>$100,000* earned with as little as $10 per paycheck.</h2> Don't leave $20,000 on the table. </div>
      <br>
      <div id="bar" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
      <!-- <div id="chart" style="min-width: 310px; height: 400px; margin: 0 auto"></div> -->
  <p style="text-align: center">Based on a 6% annual rate of return.</p>
  </div>
  </main>
<!-- CONTENT END -->
