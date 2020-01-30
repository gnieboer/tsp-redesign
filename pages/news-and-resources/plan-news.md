---
layout: page
title: Plan news
sidenav: news-and-resources
styles:
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/forms.js
  - /assets/js/bootstrap.min.js
#  - /assets/js/share-modal.js
  - /assets/js/copy-to-clipboard.js
  - /assets/js/plan-news.js
  - /assets/js/ajax-usa-search-gov.js
permalink: /news-and-resources/plan-news/
# Jekyll redirects https://github.com/jekyll/jekyll-redirect-from
redirect_from:
  - /plan-news/
---

# Plan news
{:#plan-news}

{% include next-outage.html %}

<section class="plan-news" markdown="1">
{% include search-bar.html  onChange="searchInline('plan-news', planNewsCallback);" searchName="plan-news" %}
</section>

{% include plan-news-list.html %}
