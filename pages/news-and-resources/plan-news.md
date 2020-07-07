---
layout: page
title: Plan news
sidenav: news-and-resources
styles:
scripts:
  - /assets/js/forms.js
  - /assets/js/plan-news.js
  - /assets/js/ajax-usa-search-gov.js
permalink: /news-and-resources/plan-news/
# Jekyll redirects https://github.com/jekyll/jekyll-redirect-from
redirect_from:
  - /ParticipantSupport/Content/notifications.html
  - /plan-news/
  - /whatsnew/Content/
---

# Plan news
{:#plan-news}

{% include next-outage.html %}

<section class="subscribe-or-search" markdown="1">
{% include search-bar.html  onChange="searchInline('plan-news', planNewsCallback);" searchName="plan-news" %}

{% comment %}DAV: update this with explain component once calcs are added to staging {% endcomment %}
<ul class="usa-accordion explain-this subscribe">
  <li>
    <button class="usa-accordion-button" aria-expanded="false" aria-controls="subscribe">Explain this</button>
    <div id="subscribe" class="usa-accordion-content">
    <p>The Thrift Savings Plan is happy to offer a free email subscription service. This service allows participants to receive notifications by email when new information is available on the TSP website. With this service, you automatically receive an email when there is new or updated information on the TSP website about items of interest to you.</p>
    <p>This is a free service sponsored by the TSP and provided through GovDelivery. Your email address will be used to notify you when updates are made; it will not be used for any other purpose by the TSP.</p>
    </div>
  </li>
</ul>
</section>


{% include plan-news-list.html %}
