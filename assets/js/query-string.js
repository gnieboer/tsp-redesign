// get anchor from query string
function openAnchor() {
  var anchor = location.hash.slice(1);
  anchor = anchor.replace(/([^a-z0-9A-Z]+)/g, '-');
  var button = '#'+anchor+'-button';
  if ($(button).length) {
    $(button).click();
  }
}
