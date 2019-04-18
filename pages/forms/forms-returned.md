---
layout: page
title: Forms
styles:
sidenav:
scripts:
permalink: /forms/results/
---

# Help me find forms <br>and resources about {#forms}

<!-- SEARCH FORMS -->
<section id="search-forms">
<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div role="search">
    <form class="usa-search usa-search-big">
      <label class="usa-sr-only" for="search-field-big">Search small</label>
      <!-- <input id="search-field-small" type="search" name="search"> -->
        <!-- Dropdown -->
        <select id="search-field-big" type="search" name="search">
        <option value='0'>Select</option>
        <option value='1'>Address/Name Change</option>
        <option value='2'>Beneficiary Participants</option>
        <option value='3'>Contributions</option>
        <option value='4'>Death Benefits</option>
        <option value='5'>General Information</option>
        <option value='6'>Legal Documents</option>
        <option value='7' selected>Loans</option>
        <option value='8'>Transfers and Rollovers</option>
        <option value='9'>Withdrawals</option>
        </select>
      <button type="submit">
        <span class="usa-sr-only">Search</span>
      </button>
    </form>
    </div>
  </div>
  <div class="usa-width-one-half"></div>
</div>
</section> <!-- // end #search-forms -->

<!-- ## Most popular forms
{:.forms} -->

<section id="returned-forms" markdown="1">

## We found **4** forms and **3** resources about **Loans**
{:.results}

<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="item-frame">
      <div class="top">
      <p class="form-title">Request for a transfer into the TSP</p>
      <p class="form-number">Form TSP-60</p>
      </div>
      <div class="form-description">
      <p>Use this form to:</p>
      <p>Request a transfer of Roth money from an applicable retirement plan into the Roth balance of your Thrift Savings Plan account.</p>
      </div>
    </div> <!-- end .item-frame -->
  </div> <!-- end .usa-width-one-half -->
  <div class="usa-width-one-half">
    <div class="item-frame">
      <div class="top">
      <p class="form-title">Change in address for separated participants</p>
      <p class="form-number">Form TSP-9</p>
      </div>
    <div class="form-description">
      <p>Use this form to:</p>
      <p>Change your address or online at My Account, and then select Profile Settings.</p>
    </div>
    </div> <!-- end .item-frame -->
  </div> <!-- end .usa-width-one-half -->
</div>
<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="item-frame">
      <div class="top">
      <p class="form-title">Loan payment coupon</p>
      <p class="form-number">Form TSP-26</p>
      </div>
      <div class="form-description">
      <p>Use this form to:</p>
      <p>Make loan payments in addition to payments made through payroll deductions.</p>
      </div>
    </div> <!-- end .item-frame -->
  </div> <!-- end .usa-width-one-half -->
  <div class="usa-width-one-half">
    <div class="item-frame">
      <div class="top">
      <p class="form-title">Change in address for separated participants</p>
      <p class="form-number">Form TSP-9</p>
      </div>
    <div class="form-description">
      <p>Use this form to:</p>
      <p>Name a person or persons to receive your account balance after your death.</p>
    </div>
    </div> <!-- end .item-frame -->
  </div> <!-- end .usa-width-one-half -->
</div>
<!-- IF forms returned for selected TOPIC is greater than 4, display SEE MORE FORMS -->
<div class="see-more"><span><a href="javascript:void(0)">see more forms</a></span></div>
</section>
<section id="returned-resources" markdown="1">

## Loan resources
{:.most-popular}
<!-- Row 1 -->
<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="item-frame">
      <div class="top">
      <i class="fas fa-book"></i>
      </div>
      <div class="resource-title">
      <p>Your TSP Account: A guide for Beneficiary Participants Booklet</p>
      </div>
    </div> <!-- end .item-frame -->
  </div> <!-- end .usa-width-one-half -->
  <div class="usa-width-one-half">
    <div class="item-frame">
      <div class="top">
      <i class="fal fa-sticky-note"></i>
      </div>
      <div class="resource-title">
      <p>Catch-Up Contributions Fact Sheet</p>
      </div>
    </div> <!-- end .item-frame -->
  </div> <!-- end .usa-width-one-half -->
</div>
<!-- Row 2 -->
<div class="usa-grid-full">
  <div class="usa-width-one-half">
    <div class="item-frame">
      <div class="top">
      <i class="fas fa-book"></i>
      </div>
      <div class="resource-title">
      <p>Court Orders and Powers of Attorney Booklet</p>
      </div>
    </div> <!-- end .item-frame -->
  </div> <!-- end .usa-width-one-half -->
  <div class="usa-width-one-half">
    <div class="item-frame">
      <div class="top">
      <i class="fas fa-book"></i>
      </div>
      <div class="resource-title">
      <p>In-Service Withdrawals Booklet</p>
      </div>
    </div> <!-- end .item-frame -->
  </div> <!-- end .usa-width-one-half -->
</div>
<!-- IF forms returned for selected TOPIC is greater than 4, display SEE MORE FORMS -->
<div class="see-more"><span><a href="javascript:void(0)">see more resources</a></span></div>

</section>
<!-- <ul class="forms-list">
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
</ul> -->
