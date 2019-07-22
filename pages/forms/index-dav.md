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
<div class="usa-grid-full">  
{% endif %}
{% endfor %}
</div>
</div>

{% for topics in site.data.forms_topics %}
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
<div class="usa-grid-full">  
{% endif %}
{% endif %}
{% endfor %}
{% endfor %}
</div>
</div>
{% endfor %}
</section>
