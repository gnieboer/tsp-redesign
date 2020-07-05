---
layout: page
title: Bulletinss
styles:
sidenav: agency-service-reps
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/bootstrap.min.js
#  - /assets/js/form-modals.js
#  - /assets/js/flatpickr/flatpickr.js
  - /assets/js/ajaxFetch.js
  - /assets/js/ajax-usa-search-gov.js
  - /assets/js/copy-to-clipboard.js
  - /assets/js/calculator/calculator.js
  - /assets/js/search.js
  - /assets/js/bulletins.js
permalink: /agency-service-reps/bulletins/
document-ready:
  - setTopic('select-bulletins-topic');
---

# Bulletins

TSP bulletins provide guidance to TSP Agency and Service representatives for implementing the provisions of law, regulations, and procedures relating to the TSP.

<div><button class="usa-button-big" onclick="window.location.href = '{{ site.baseurl }}/exit/?idx=2';">Subscribe</button></div>

<div class="calculator-panel subscribe">
  <ul class="usa-accordion explain-this">
    <li>
      <button class="usa-accordion-button" aria-expanded="false" aria-controls="subscribe">Explain this</button>
      <div id="subscribe" class="usa-accordion-content">
      <p>The Thrift Savings Plan is happy to offer a free email subscription service. This service allows TSP representatives to receive automatic notifications by email when new or updated information is available in the "Agency and Service Representative resources" section of the TSP Web site.</p>
      </div>
    </li>
  </ul>
</div>

<!-- SEARCH FORMS -->
<section class="search-bulletins inline-search">
  <div class="usa-grid-full">
    <div class="usa-width-one-whole">
        <div role="search" class="search-container">
          <!-- Topic drop-down list -->
          <div class="select">
            <label class="usa-sr-only" for="select-bulletins-topic">Search by topic</label>
            <select id="select-bulletins-topic" name="select-bulletins-topic" onchange="selectBulletinsTopic();">
              <option disabled selected value='-1'>Choose topic</option>
              {% for topic in site.data.bulletins_topics %}
              {% assign dropValue = topic | downcase | replace: " ", "-" %}
              <option value='{{ dropValue }}'>{{ topic }}</option>
              {% endfor %}
              <option value='0'>Show all</option>
            </select>
          </div>
          <span class="or">or</span>
          <!-- SEARCH FIELD -->
          <input id="group" type="hidden" value="bulletins">
          <form accept-charset="UTF-8" action="javascript:void(0);" id="search-form-bulletins bulletins" method="get"
            class="animated-search bulletins">
              <label for="search-terms" class="usa-sr-only">Enter search term(s)</label>
              <input type="text" name="search-terms" id="search-terms"
                onChange="myPageChange();" onBlur="myPage(1);"
                autocomplete="off" placeholder="Enter search term(s)">
          </form>
        </div>
        <!-- checkbox to see USV bulletins only -->
        <!-- DAV, when checked, only bulletins with "service: true" should be displayed -->
        <input id="usv-only" type="checkbox" name="usv-only" value="usv-only" onChange="usvOnlyGood();" onBlur="usvOnlyGood();"/>
        <label for="usv-only">Show only Uniformed Services bulletins</label>
    </div><!-- END div.usa-width-one-whole -->
  </div><!-- END div.usa-grid-full -->
</section>

<!-- # Help me find bulletins about {#forms} -->
{% assign showTotal = 4 %}
{% assign startAccordion = showTotal %}
{% assign bulletin_list = site.bulletins | sort: 'path' | reverse %}

<section id="popular-bulletins" markdown="1">
  <div id="select-bulletins-0" class="select-bulletins-div" markdown="1">
  <!-- # All Bulletins  -->
  {% include bulletins/bulletin-list.html topic="" idx='a' %}
  </div>

{% for topic in site.data.bulletins_topics %}
  {% assign dropValue = topic | downcase  %}
  {% assign topicID = dropValue | replace: " ", "-" %}
  <div id="select-bulletins-{{ topicID }}"  class="select-bulletins-div hide" markdown="1">
  <!-- # All {{topicID}} Bulletins  -->
  {% include bulletins/bulletin-list.html topic=dropValue idx=forloop.index noAccordions=true %}
  </div>
{% endfor %}
</section>

<!-- CONTENT END -->
