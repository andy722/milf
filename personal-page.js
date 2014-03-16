(function () {

  var page = {

    createButton: function (pageId, text) {
      var $btn = $('<input type="button" id="milf_mark_btn" class="button" value="' + text + '"/>');
      $btn.click(function () {
        app.buttons.handleClick(pageId, $btn);
        return false;
      });
      $('.infoName').append($btn);
    },

    preInit: function () {
      return $('.infoName').length;
    }
  };


  if (page.preInit()) {
    var pageId = app.url2Id(document.URL);

    app.checkIgnored(
        pageId,
        function () {
          page.createButton(pageId, chrome.i18n.getMessage("btnMarkNotIgnored"));
        },
        function () {
          page.createButton(pageId, chrome.i18n.getMessage("btnMarkIgnored"));
        }
    );
  }

})();