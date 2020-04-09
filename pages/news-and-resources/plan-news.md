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
<<<<<<< HEAD
  - /ParticipantSupport/Content/notifications.html
=======
  - /ParticipantSupport/Content/notifications/
>>>>>>> 637af4923eefebba6d9b5d0a5b3c6ec427165abb
  - /plan-news/
  - /whatsnew/Content/
---

# Plan news
{:#plan-news}

{% include next-outage.html %}

<section class="plan-news" markdown="1">
{% include search-bar.html  onChange="searchInline('plan-news', planNewsCallback);" searchName="plan-news" %}
</section>

{% include plan-news-list.html %}
