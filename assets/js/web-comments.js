(function(a, b) {
  b.fba = {
    init: function(a) {
      this.options = a;
      this.loadHtml();
      this.loadButton();
      this.loadOverlay()
    },
    loadHtml: function() {
      // this.buttonEl = document.createElement("a");
      // this.buttonEl.setAttribute("id", "leave-feedback");
      // this.buttonEl.setAttribute("href", "#");
      // this.buttonEl.innerHTML = this.options.open;
      this.overlayEl = document.createElement("div");
      this.overlayEl.setAttribute("id", "fba-overlay");
      this.dialogEl = document.createElement("div");
      this.dialogEl.setAttribute("id", "fba-modal");
      this.dialogEl.setAttribute("role",
        "dialog");
      this.dialogEl.innerHTML = '\x3cdiv id\x3d"fba-modal-dialog"\x3e\x3ch1 id\x3d"fba-modal-title"\x3e' + this.options.title + '\x3c/h1\x3e\x3ca id\x3d"fba-modal-close" type\x3d"button" href\x3d"#"\x3e\x26times;\x3c/a\x3e\x3cp id\x3d"fba-description"\x3e' + this.options.description + '\x3c/p\x3e\x3cform id\x3d"feedback-form"\x3e\x3clabel for\x3d"fba-text-long"\x3e\x3c/label\x3e\x3ctextarea id\x3d"fba-text-long" name\x3d"fba-text-long" class\x3d"textarea" autofocus\x3d"true"\x3e\x3c/textarea\x3e\x3cdiv class\x3d"button-wrapper"\x3e\x3cbutton type\x3d"submit" id\x3d"fba-submit" class\x3d"usa-button usa-button-outline" href\x3d"#"\x3e' +
        this.options.send + '\x3c/button\x3e\x3c/div\x3e\x3c/form\x3e\x3cp id\x3d"fba-modal-privacy" class\x3d"usa-external_link"\x3e\x3ca href\x3d"https://www.gsa.gov/portal/content/162010"\x3ePrivacy\x3c/a\x3e\x3c/p\x3e\x3c/div\x3e'
    },
    handleButtonClick: function(a) {
      b.fba.loadDialog();
      a.preventDefault()
    },
    handleDialogClose: function(a) {
      b.fba.closeDialog();
      a.preventDefault()
    },
    handleSubmitClick: function(a) {
      b.fba.sendFeedback();
      a.preventDefault()
    },
    loadButton: function() {
      // a.body.appendChild(this.buttonEl);
      a.getElementById("leave-feedback").addEventListener("click",
        this.handleButtonClick, !1)
    },
    loadOverlay: function() {
      a.body.appendChild(this.overlayEl)
    },
    loadDialog: function() {
      a.getElementById("leave-feedback").removeEventListener("click", this.handleButtonClick, !1);
      a.body.appendChild(this.dialogEl);
      a.getElementById("fba-overlay").setAttribute("class", "is-active");
      a.getElementById("fba-modal").setAttribute("class", "is-active");
      a.getElementById("fba-modal-close").addEventListener("click", this.handleDialogClose, !1);
      a.getElementById("fba-submit").addEventListener("click",
        this.handleSubmitClick, !1)
    },
    closeDialog: function() {
      a.getElementById("fba-modal-close").removeEventListener("click", this.handleDialogClose, !1);
      a.getElementById("fba-overlay").removeAttribute("class", "is-active");
      a.getElementById("fba-modal").removeAttribute("class", "is-active");
      a.getElementById("fba-submit").removeEventListener("click", this.handleSubmitClick, !1);
      a.body.removeChild(a.getElementById("fba-modal"));
      this.loadButton()
    },
    sendFeedback: function() {
      alert(this.options.thankyou);
      this.closeDialog()
    }
  }
})(document,
  window);
fba.init({
  // open: google_tag_manager["GTM-MLDLTMR"].macro(4),
  // title: google_tag_manager["GTM-MLDLTMR"].macro(5),
  // description: google_tag_manager["GTM-MLDLTMR"].macro(6),
  // send: google_tag_manager["GTM-MLDLTMR"].macro(7),
  // thankyou: google_tag_manager["GTM-MLDLTMR"].macro(8)
});
