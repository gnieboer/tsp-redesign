---
layout: page
title: Forms
styles:
sidenav:
scripts:
permalink: /forms/forms/
---

# Forms

<ul class="forms-list">
{% for form in site.data.forms %}
  <li>
    <a href="/forms/{{ form.form_url }}" class="form-name">
      {{ form.form_name }}
    </a> <span class="form-date">{{ form.form_date }}</span>
    <span class="form-info">{{ form.form_info }}</span>
    <span class="form-pages">{{ form.form_pages }} pages</span>
    <span class="form-printed-date">Last printed {{ form.form_date }}</span>
    <p class="form-categories">
    {% for item in form.form_categories %}
      <span class="form-category">{{ item }}</span>
    {% endfor %}
    </p>
    <p class="form-topics">Form topics
      {% for item in form.form_topics %}
        <span class="form-topic">{{ item }}</span>
      {% endfor %}</p>
  </li>
{% endfor %}
</ul>

## Publications

<ul class="publications-list">
{% for publication in site.data.publications %}
  <li>
    <a href="/publications/{{ publication.publication_url }}" class="pub-name">
      {{ publication.publication_name }}
    </a> <span class="pub-date">{{ publication.publication_date }}</span>
    <span class="pub-info">{{ publication.publication_info }}</span>
    <span class="pub-pages">{{ publication.publication_pages }} pages</span>
    <span class="pub-printed-date">Last printed {{ publication.publication_date }}</span>
    <p class="pub-categories">
    {% for item in publication.publication_categories %}
      <span class="pub-category">{{ item }}</span>
    {% endfor %}
    </p>
  </li>
{% endfor %}
</ul>


## Newsletters

<ul class="newsletter-list">
{% for newsletter in site.data.newsletters %}
  <li>
    <a href="/newsletters/{{ newsletter.newsletter_url }}" class="news-name">
      {{ newsletter.newsletter_date | date: "%B %Y" }} Newsletter
    </a>
    <span class="news-info">{{ newsletter.newsletter_info }}</span>
    <span class="news-pages">{{ newsletter.newsletter_pages }} pages</span>
    <span class="news-printed-date">Last printed {{ newsletter.newsletter_date }}</span>
    <p class="news-categories">
    {% for item in newsletter.newsletter_categories %}
      <span class="news-category">{{ item }}</span>
    {% endfor %}
    </p>
  </li>
{% endfor %}
</ul>
