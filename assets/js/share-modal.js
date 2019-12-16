// // Get the modal
// var modal = document.getElementById("share-modal");
//
// // Get the button that opens the modal
// var btn = document.getElementById("share-name"); // where -name is unique
//
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];
//
// // When the user clicks the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

// Jekyll Share Modal Source by Clark Weckmann; Ref: https://codepen.io/clarkhacks/pen/bBMZaB
// var shrModal = '<div id=\"shareModal\" class=\"modal fade\" role=\"dialog\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"post-share-modal modal-body\"> <div> <a href=\"http:\/\/www.facebook.com\/sharer\/sharer.php?u={{site.url}}{{page.url}}&title={{page.title}}\" class=\"btn btn-social btn-facebook\"> <span class=\"fa fa-facebook\"><\/span>Facebook<\/a> <a href=\"http:\/\/www.tumblr.com\/share\/link?url={{site.url}}{{page.url}}&name={{page.title}}&description={{post.desc}}\" class=\"btn btn-social btn-tumblr\"> <span class=\"fa fa-tumblr\"><\/span>tumblr<\/a> <a href=\"https:\/\/plus.google.com\/share?url={{site.url}}{{page.url}}\" class=\"btn btn-social btn-google\"> <span class=\"fa fa-google-plus\"><\/span>Google Plus<\/a> <a href=\"mailto:?&subject=Blog%20Post:%20{{page.title}}&body=Check%20out%20this%20amazing%20blog%20post!%20{{site.url}}{{page.url}}\" class=\"btn btn-social btn-email\"> <span class=\"fa fa-envelope\"><\/span>Email<\/a> <a href=\"http:\/\/twitter.com\/intent\/tweet?status={{page.title}}%20at%20%{{site.url}}{{page.url}}\" class=\"btn btn-social btn-twitter\"> <span class=\"fa fa-twitter\"><\/span>Twitter<\/a> <hr> <\/div><div> <h3>Post Address<\/h3> <p> A direct link to this post! <\/p><input type=\"text\" id=\"windowurl\"\/> <a href=\"#\" data-copytarget=\"#windowurl\" class=\"btn btn-primary\">Copy<\/a> <\/div><hr> <p class=\"embed-post\"> <h3>Embed Post<\/h3> <p> The embed code reqiures that you have Bootstrap on your site. <\/p><div class=\"embed-post-text\"><textarea name=\"embed\" rows=\"4\" id=\"embedtext\">&lt;div class=\"well post-card\"&gt; &lt;img style=\"width: 100%; border-radius: 4px; margin-bottom: 10px;\" src=\"{{site.url}}\/a\/img\/post\/covers\/bootstrapcover.png\" alt=\"{{site.title}}\"\/&gt; &lt;h4 style=\"text-align: center\"&gt;{{post.title}}&lt;\/h4&gt; &lt;p&gt;{{page.desc}}&lt;\/p&gt;&lt;a href=\"{{site.baseurl}}{{page.url}}\" style=\"position: relative; display: block; width: 80%; margin-left: 10%; margin-right: auto\" class=\"btn btn-danger\"&gt;Read&lt;\/a&gt;&lt;\/div&gt;<\/textarea><\/div><a href=\"#\" data-copytarget=\"#embedtext\" class=\"btn btn-primary\">Copy<\/a> <\/p><button type=\"button\" class=\"btn btn-primary\" style=\"display: block; width: 100%\" data-toggle=\"modal\" data-target=\"#qrModal\">Generate QR<\/button> <\/div><\/div><\/div><\/div><div class=\"modal fade \" id=\"qrModal\" role=\"dialog\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"modal-body post-share-modal\"> <h1>Qr Code<\/h1> <center><div id=\"qrcode\"><\/div><\/center> <\/div><\/div><\/div><\/div>';
// var windowLoc = window.location.href;
// document.write(shrModal);
//$("input#windowurl").val(windowLoc);

/*
	Copy text from any appropriate field to the clipboard
*/
(function() {

	'use strict';

  // click events
  document.body.addEventListener('click', copy, true);

	// event handler
	function copy(e) {

    // find target element
    var
      t = e.target,
      c = t.dataset.copytarget,
      inp = (c ? document.querySelector(c) : null);

    // is element selectable?
    if (inp && inp.select) {

      // select text
      inp.select();

      try {
        // copy text
        document.execCommand('copy');
        inp.blur();

        // copied animation
        t.classList.add('copied');
        setTimeout(function() { t.classList.remove('copied'); }, 1500);
      }
      catch (err) {
        alert('please press Ctrl/Cmd+C to copy');
      }

    }

	}

})();
