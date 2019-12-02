function show(prefix, suffix) {
  var element = document.getElementById(prefix+'-'+suffix);
  var accordion = document.getElementById(prefix+'-content-'+suffix);
  if (element.hasClass('down')) {
    accordion.show();
  } else {
    accordion.hide();
  }
   element.classList.toggle("down");
}

function showMorePlans(type, formNum) {
  var controlDiv = 'more-'+type+'-'+formNum;
  var contentDiv = 'more-'+type+'-content-'+formNum;
  if ($('#'+controlDiv).hasClass('down')) {
    $('#'+contentDiv).addClass('hide');
    $('#'+controlDiv).removeClass('down');
  } else {
    $('#'+contentDiv).removeClass('hide');
    $('#'+controlDiv).addClass('down');
  }
}

function searchPlanNews() {
  var result1 = '{"query":"retirement","web":{"total":5,"next_offset":null,"spelling_correction":null,"results":[{"title":"New TSP Podcast | Thrift Savings Plan","url":"https://beta.tsp.gov/plan-news/real-TSP-podcast.html","snippet":"...provides an in-depth look into your retirement investment plan and answers questions...to the government, well into your retirement years, or serving our country in","publication_date":null},{"title":"Stick to Your Plan | Thrift Savings Plan","url":"https://beta.tsp.gov/plan-news/stick-plan.html","snippet":"...gains. Remember that investing for retirement is for the long-term. Try not to","publication_date":null},{"title":"New Withdrawal Options | Thrift Savings Plan","url":"https://beta.tsp.gov/plan-news/2019-AWP.html","snippet":"...options when seeking to withdraw retirement savings from their TSP accounts.","publication_date":null},{"title":"COPY Stick to your plan | Thrift Savings Plan","url":"https://beta.tsp.gov/plan-news/stick-2017.html","snippet":"...gains. Remember that investing for retirement is for the long-term. Try not to","publication_date":null},{"title":"COPY 2017 Withdrawls | Thrift Savings Plan","url":"https://beta.tsp.gov/plan-news/2017-withdrawl.html","snippet":"...options when seeking to withdraw retirement savings from their TSP accounts.","publication_date":null}]},"text_best_bets":[],"graphic_best_bets":[],"health_topics":[],"job_openings":[],"recent_tweets":[],"federal_register_documents":[],"related_search_terms":[]}';

  $('#search-message-plan-news').html('');
  var terms = $('#search-input-plan-news').val();
  console.log('terms = ', terms);
  if (terms == '') { resetPlanNews(); return; }

  inlineUSAsearch('search-message-plan-news', 'beta.tsp.plan-news', terms, searchPlanNewsCallback);
  // searchPlanNewsCallback(result1);
}


function searchPlanNewsCallback(result) {
  $('#'+'search-message-plan-news').html('');
  console.log('in callback searchPlanNewsCallback()');
  console.log(result);
  // var jsonBlock = JSON.parse(result);
  var jsonBlock = result;
  var hits = jsonBlock.web.total;
  var results = jsonBlock.web.results;
  console.log(results);
  var items = [];
  for (var i = 0; i < hits; i++) {
    var str = results[i].url.split(/\//).pop().replace(/.html$/, '');
    console.log(str)
    items.push(str);
  }
  console.log(items.length);
  showMatches(items);
}

// close accordions and show all content
function resetPlanNews() {
  console.log('reset plan news');
  // $('.plan-news-block').removeClass('hide');
  $('#plan-news-default-div').show();
  $('#plan-news-search-results').hide();
}
// open accordions but hide all content
function hidePlanNews() {
  console.log('hide plan news');

  // $('.plan-news-block').addClass('hide');
  // open accordions
  // hide accordion tops
  $('#plan-news-default-div').hide();
  $('#plan-news-search-results').show();
  $('.plan-news-search-block').addClass('hide');
}
// show plans that match, hide ones that document
// expect array of plan item names
function showMatches(items) {
  if (items.length <= 0) {
    console.log('no matches');
    $('#search-plan-news-message').html('no matches');
  }

  hidePlanNews();

  // show winners
  items.forEach(function (item, index) {
    console.log('processing ', item, index);
    // $('#'+item+'-block').show();
    $('#'+item+'-block').removeClass('hide');
  });
}
