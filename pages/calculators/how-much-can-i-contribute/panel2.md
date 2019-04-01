{% comment %}
Elective Contributions panel (2) for How Much Can I Contribute?.
{% endcomment %}
{% assign panelID = include.panelID | default: 2 %}
{% assign hide = 'display: block;' %}
{% if include.hide == 1 %} {% assign hide = 'display: none;' %} {% endif %}

<div id="panel{{ panelID }}" class="calculatorPanel" style="{{ hide }}" markdown="1">


<div class="calculatorInnerBox" markdown="1">

A
{% include calculator/inputRow.html id="totalMade" name="ytd_cont" inputType="integer"
    defaultValue=0 size="8" max="8"
    left="**What is the total dollar amount you've already contributed to the TSP in <span id='yearA'>YYYY</span>?**"
    rightInputClass="positivefloat regInput" onBlur="totalContributionGood(true, false);" %}

Your most recent Leave and Earnings statement or payslip will show how much you’ve contributed to the TSP this year, usually labeled “YTD.” If you’ve made traditional and Roth contributions, add them up and enter the total. If you have a civilian and a uniformed services TSP account, use the total amount you’ve contributed to both accounts so far this year. Do not include Agency or Service Automatic (1%) or Matching Contributions. If you use this calculator before your <span id='yearB'>YYYY</span> contributions begin, enter 0.

{% include calculator/errorRow.html id="totalMade" %}

B
{% include calculator/inputRow.html id="additionalAmount" name="est_cont" inputType="integer"
    defaultValue=0 size="8" max="8"
    left="**How much more will you contribute to the TSP before any changes take effect?**"
    rightInputClass="positivefloat regInput" onBlur="totalContributionGood(false, true);" %}

People often use this calculator to figure out a new dollar amount they should contribute to reach the IRS limit without going over. But when you change how much you’re contributing, it can take 1-2 pay periods for your agency or service to process the new amount. During that time, the TSP will still receive the amount you’re contributing now.

Enter an estimate of how much you’ll contribute before any changes take effect. If you are uncertain, check with your personnel or finance office.

{% include calculator/errorRow.html id="additionalAmount" %}

C
{% include calculator/inputRow.html id="numberPayment" name="rmn_pmts" inputType="selectInt"
    selectList=52 defaultValue=26
    left="**Select the remaining number of salary payments you will receive in <span id='yearD'>YYYY</span> after your new amount takes effect:**"
    rightInputClass="greySelect2" %}

This will depend on
<a href="javascript:openWindow('/PlanningTools/Calculators/numberOfSalaryPayments.html', 650, 450);">how often you are paid</a>
(biweekly or monthly, for example). If you are uncertain, check with your personnel or finance office.

{% include calculator/errorRow.html id="numberPayment" %}

</div>

{% include calculator/buttonBlock.html panelID=panelID prev=1 showResults=3 %}

</div>
