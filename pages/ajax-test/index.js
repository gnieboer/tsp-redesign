
  var siteName = "https://www.tsp.gov/components/CORS/";

  var fetchValue = function(scriptName, name) {
    // return the ajax object
    var serverCall = $.get(siteName + '/' + scriptName);
    serverCall.done(
      function (data) {
          $('#ajax-block').html(name + ':<br>' + data);
          console.log(name + ': ' + data);
      }
    );
    serverCall.fail(
      function (jqXHR, textStatus, errorThrown) {
          var errMsg = textStatus + ': ' + errorThrown;
          $('#ajax-block').html(name + ':<br>' + errMsg);
          console.log(name + ': ' + errMsg);
      }
    );
    serverCall.always(
      function (jqXHR, textStatus) {
        if (textStatus != "success") {
          $('#ajax-block').append('<br> failed with ' + textStatus);
          console.log('in always: ' + textStatus)
        } else {
          $('#ajax-block').append('<br>done');
        }
      }
    );
  }


$(document).ready(function() {
  console.log(' page is ready ');
  // alert(' page is ready ');
  /*
  $.ajax({
    type:     "GET",
    url:      "https://www.tsp.gov/components/investmentFunds.html",
    dataType: "jsonp",
    success: function(data){
      console.log(data);
    }
  });
  */


/*
  // jQuery cross domain ajax
  $.get("https://www.tsp.gov/components/CORS/getCurrentLoanInterestRate.html").done(function (data) {
      $('#ajax-block').html(data);
      console.log(data);
  });

  // using XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.tsp.gov/components/CORS/getCurrentLoanInterestRate.html", true);
  xhr.onload = function () {
      console.log(xhr.responseText);
  };
  xhr.send();

  // using the Fetch API
  fetch("https://www.tsp.gov/components/CORS/getCurrentLoanInterestRate.html").then(function (response) {
      return response.json();
  }).then(function (json) {
      console.log(json);
  });
*/
});
