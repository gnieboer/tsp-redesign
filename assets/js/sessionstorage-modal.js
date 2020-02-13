$(function() {
  if (typeof Storage != "undefined") {
    if (!sessionStorage.getItem("done")) {
      setTimeout(function() {
        $('#feedback-modal').modal('show');
      }, 1400);
    }
    sessionStorage.setItem("done", true);
  }
});
