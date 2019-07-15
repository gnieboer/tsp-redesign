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


<div id="select-forms-0" class="select-forms-div" markdown="1">
# All Forms
  <ul class="forms-list">
{% for form in site.data.forms %}
  <!-- <a href="/forms/{{ form.form_url }}" class="form-name">{{ form.form_name }}</a>
    <span class="form-date">{{ form.form_date }}</span> -->
  {% include forms/form.html %}

{% endfor %}
  </ul>
</div>

{% for topics in site.data.forms_topics %}
<div id="select-forms-{{forloop.index}}"  class="select-forms-div hide" markdown="1">
# {{ topics }} Forms
  <ul class="forms-list">
{% for form in site.data.forms %}
{% for form_topic in form.form_topics %}
{% if form_topic == topics %}
  <!-- <a href="/forms/{{ form.form_url }}" class="form-name">{{ form.form_name }}</a>
    <span class="form-date">{{ form.form_date }}</span> -->
  {% include forms/form.html %}

{% endif %}
{% endfor %}
{% endfor %}
  </ul>
</div>
{% endfor %}
