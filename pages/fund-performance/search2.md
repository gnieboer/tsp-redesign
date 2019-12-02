---
title: Search
layout: page
permalink: /fund-performance/search2/
#sidenav: fund-options
scripts:
  - /assets/js/jquery.min.js
  - /assets/js/jquery.numeric.js
  - /assets/js/calculator/calculator.js
  - /assets/js/ajaxFetch.js
  - /assets/js/ajax-usa-search-gov.js
document-ready:
  - buildAffiliateSelect('search-affiliate-s2');
#  - doSearch();
---

<section class="plan-news" markdown="1">

{% include search-bar.html  onChange="doSearch2('search-input-s2', 'search-message-s2',
    'search-affiliate-s2');" searchName="s2" affiliatePlaceholder=1 %}

</section>

<hr>
<div id='search-results'></div>
<hr>
<div>
