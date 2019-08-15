$(document).ready(function() {
	$('[data-toggle="toggle"]').change(function(){
		$(this).parents().next('.hide').toggle();
  }); // end data-table.change function

  $("label").click(function(){
    $(this).toggleClass("bounce");
	}); // end label.click function
}); // end doc.ready function
