---
title: Search
layout: page
permalink: /fund-performance/search/
#sidenav: fund-options
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/jquery.numeric.js
  - /assets/js/calculator/calculator.js
  - /assets/js/ajaxFetch.js
  - /assets/js/ajax-usa-search-gov.js
document-ready:
  - doSearch();
---

<div id="panel-{{ panelID }}" class="calculator-panel" style="{{ hide }}" markdown="1">

{% comment %}
<fieldset>
{% include calculator/div-panel-form-field.html
  fieldID="panel-1.1" id="search-box"
  inputClass="format-left"  inputType="text" maxLength="100"
  value="" placeholder="enter search terms"
  prompt="Enter a search term"
  explanation="
  <p>Enter a search term and click the button</p>"
  onBlur="doSearch();"
%}
</fieldset>

{% include calculator/button.html text='Search' onClick="doSearch();" xtraClass2='primary' %}
{% endcomment %}

<div class="usa-grid-full">
  <div class="usa-width-one-whole">
    <section class="search-forms">

empty
<br>
{% include animated-search-bar.html %}

<br>

8657
<br>
{% include animated-search-bar.html search_label="Search 8657: " collectionID="8657"
    autocomplete='off' placeholder="Enter terms for 8657" %}


<br>

8657 #2
<br>
{% include animated-search-bar.html search_label="Search 8657 #2: " collectionID="8657"
    IDprefix="prefix2_" autocomplete='off' placeholder="Enter terms for 8657" %}
    </section>
  </div>
</div>


<hr>
<div id='search-results'></div>
<hr>
<div>
