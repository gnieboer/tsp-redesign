// Responsive comparison table JS

$( "ul.funds-lifecycle, ul.scenarios" ).on( "click", "li", function() {
  var pos = $(this).index()+2;
  $("table.l tr").find('td:not(:eq(0))').hide();
  $('table.l td:nth-child('+pos+')').css('display','table-cell');
  $("table.l tr").find('th:not(:eq(0))').hide();
  $('li').removeClass('active');
  $(this).addClass('active');
});

$( "ul.funds-individual" ).on( "click", "li", function() {
  var pos = $(this).index()+2;
  $("table.i tr").find('td:not(:eq(0))').hide();
  $('table.i td:nth-child('+pos+')').css('display','table-cell');
  $("table.i tr").find('th:not(:eq(0))').hide();
  $('li').removeClass('active');
  $(this).addClass('active');
});

// Initialize the media query
  var mediaQuery = window.matchMedia('(min-width: 640px)');

  // Add a listen event
  mediaQuery.addListener(fundComparison);

  // Function to do react to the media query
  function fundComparison(mediaQuery) {
    if (mediaQuery.matches) {
      $('.sep').attr('colspan',6);
    } else {
      $('.sep').attr('colspan',2);
    }
  }

  // On load
  fundComparison(mediaQuery);
