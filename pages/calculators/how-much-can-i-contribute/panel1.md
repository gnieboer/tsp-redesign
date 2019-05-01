{% comment %}
Introduction panel (1) for How Much Can I Contribute?.
{% endcomment %}
{% assign panelID = include.panelID | default: 1 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<div id="panel{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

Each year the IRS determines the maximum amount you can contribute to tax-deferred savings plans like the TSP. This is known as the [IRS elective deferral limit](javascript:void(0)). Participants should use this calculator to determine the specific dollar amount to be deducted each pay period in order to maximize your contributions and to ensure that you do not miss out on Agency or Service Matching Contributions if you are entitled to them.

<div class="dotted-line"></div>

**What information do you need to use this calculator?**

-   Your most recent Leave and Earnings statement or payslip.
-   The number of salary payments you have left for the year.

<div class="deco-box start" markdown="1">

<div class="usa-grid">
<div class="usa-width-one-whole" markdown="1">
Choose the year you would like to review, then press Start.
</div>
</div>

<div class="usa-grid">
  <div class="usa-width-one-whole center">
    <ul class="deco-box-inner flex-row flex-justify-center">
      <li>
        <select class="" id="planYear" name="planYear">
           <option value="2018" selected="">2018</option>
           <option value="2019">2019</option>
        </select>
      </li>
      <li>
        {% capture click %}processPanel({{ panelID }}, 0, {{ panelID | plus: 1}}, 0); return false;{% endcapture %}
        {% include calculator/button.html text='Start' onClick=click xtraClass2='primary' %}
      </li>
    </ul>
  </div>
</div>
</div> <!-- end deco-box -->

{% capture myNote %}
This calculator is especially important for FERS employees and members of the
uniformed services covered by the Blended Retirement System (BRS). If you reach the
<a href="javascript:openWindow('/PlanningTools/RetirementPlanningPhases/maximumAmount.html', 650, 650);">IRS elective deferral limit</a>
before the end of the year, your contributions and Agency or Service Matching Contributions
must stop for the remainder of the year. As a result, you will lose some of your Agency or
Service Matching Contributions.
For more detailed information, read the Fact Sheet
<a class="pdfLink" title="File size: 278 KB (opens in a new window)" href="/PDF/formspubs/tspfs07.pdf">Annual Limit on Elective Deferrals</a>.
<br><br>
The dollar amount determined by using this calculator distributes your employee/member
contributions over the entire year (or remainder of the year), and thus allows you to
receive the maximum Agency or Service Matching Contributions.
{% endcapture %}
{% include calculator/infoBox.html icon='info' title="Special Note for FERS and BRS Participants" textBlock=myNote %}
</div> <!-- end div#panel -->