---
layout: page
title: Forms
styles:
sidenav:
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/forms.js
permalink: /forms/dav/
---

# Help me find forms <br>and resources about {#forms}

<!-- SEARCH FORMS -->
<section id="search-forms">
<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div role="search">
    <form class="usa-search usa-search-big">
      <label class="usa-sr-only" for="select-forms-topic">Search small</label>
        <select id="select-forms-topic" type="search" name="select-forms-topic" onchange="selectFormsTopic();">
          <option value='0'>Select</option>
          {% for topics in site.data.forms_topics %}
          <option value='{{ forloop.index }}'>{{ topics }}</option>
          <!-- <option value='{{ topics }}'>{{ topics }}</option> -->
          {% endfor %}
        </select>
      <button type="submit" onClick="return false;">
        <span class="usa-sr-only">Search</span>
      </button>
    </form>
    </div>
  </div>
  <div class="usa-width-one-half"></div>
</div>
</section> <!-- // end #search-forms -->

{% assign showTotal = 2 %}
{% assign startAccordion = showTotal %}
<section id="popular-forms" markdown="1">
{% assign cnt = 0 %}
<div id="select-forms-0" class="select-forms-div" markdown="1">
# All Forms
<div class="usa-grid-full">
{% for form in site.data.forms %}
  {% assign cnt = cnt | plus: 1 %}
  {% include forms/form.html %}
  {% assign mod = cnt | modulo: 2 %}
{% if mod == 0 %}
</div>
{% if cnt == startAccordion %}
<div id="more-forms-0" class="see-more" onClick="showMoreForms('forms', 0);">
  <span>see more forms</span>
</div>
<div id="more-forms-content-0" class="hide">
{% endif %}
<div class="usa-grid-full">  
{% endif %}
{% endfor %}
</div>
{% if cnt >= startAccordion %}
</div>
{% endif %}
</div>

{% for topics in site.data.forms_topics %}
{% comment %}count number of forms for accordion{% endcomment %}
{% assign cnt = 0 %}
{% for form in site.data.forms %}
{% for form_topic in form.form_topics %}
{% if form_topic == topics %}
  {% assign cnt = cnt | plus: 1 %}
{% endif %}
{% endfor %}
{% endfor %}
{% assign startAccordion = cnt | plus: 1 %}
{% if cnt > showTotal %}{% assign startAccordion = showTotal %}{% endif %}
{% assign cnt = 0 %}
<div id="select-forms-{{forloop.index}}"  class="select-forms-div hide" markdown="1">
# {{ topics }} Forms
<div class="usa-grid-full">
{% for form in site.data.forms %}
{% for form_topic in form.form_topics %}
{% if form_topic == topics %}
  {% assign cnt = cnt | plus: 1 %}
  {% include forms/form.html %}
  {% assign mod = cnt | modulo: 2 %}
{% if mod == 0 %}
</div>
{% if cnt == startAccordion %}
<div id="more-forms-{{forloop.index}}" class="see-more" onClick="showMoreForms('forms', {{forloop.index}});">
  <span>see more forms</span>
</div>
<div id="more-forms-content-{{forloop.index}}" class="hide">
{% endif %}
<div class="usa-grid-full">  
{% endif %}
{% endif %}
{% endfor %}
{% endfor %}
</div>
{% if cnt >= startAccordion %}
</div>
{% endif %}
</div>
{% endfor %}
</section>

<hr>

{% assign startAccordion = showTotal %}
<section id="popular-resources" markdown="1">
{% assign cnt = 0 %}
<div id="select-resources-0" class="select-resources-div" markdown="1">
# All Resources
<div class="usa-grid-full">
{% for resource in site.data.publications %}
  {% assign cnt = cnt | plus: 1 %}
  {% include forms/resource.html %}
  {% assign mod = cnt | modulo: 2 %}
{% if mod == 0 %}
</div>
{% if cnt == startAccordion %}
<div id="more-resources-0" class="see-more" onClick="showMoreForms('resources', 0);">
  <span>see more resources</span>
</div>
<div id="more-resources-content-0" class="hide">
{% endif %}
<div class="usa-grid-full">  
{% endif %}
{% endfor %}
</div>
{% if cnt >= startAccordion %}
</div>
{% endif %}
</div>

{% for topics in site.data.forms_topics %}
{% comment %}count number of resources for accordion{% endcomment %}
{% assign cnt = 0 %}
{% for resource in site.data.publications %}
{% for form_topic in resource.form_topics %}
{% if form_topic == topics %}
  {% assign cnt = cnt | plus: 1 %}
{% endif %}
{% endfor %}
{% endfor %}
{% assign startAccordion = cnt | plus: 1 %}
{% if cnt > showTotal %}{% assign startAccordion = showTotal %}{% endif %}
{% assign cnt = 0 %}
<div id="select-resources-{{forloop.index}}"  class="select-resources-div hide" markdown="1">
# {{ topics }} Resources
<div class="usa-grid-full">
{% for resource in site.data.resources %}
{% for form_topic in resource.form_topics %}
{% if form_topic == topics %}
  {% assign cnt = cnt | plus: 1 %}
  {% include forms/resource.html %}
  {% assign mod = cnt | modulo: 2 %}
{% if mod == 0 %}
</div>
{% if cnt == startAccordion %}
<div id="more-resources-{{forloop.index}}" class="see-more" onClick="showMoreForms('resources', {{forloop.index}});">
  <span>see more resources</span>
</div>
<div id="more-resources-content-{{forloop.index}}" class="hide">
{% endif %}
<div class="usa-grid-full">  
{% endif %}
{% endif %}
{% endfor %}
{% endfor %}
</div>
{% if cnt >= startAccordion %}
</div>
{% endif %}
</div>
{% endfor %}
</section>
