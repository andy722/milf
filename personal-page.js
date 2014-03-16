(function () {

  var page = {

    createButton: function (pageId, isBlocked) {
      var $btn = $('<input type="button" ' +
          'id="milf_mark_btn" ' +
          'class="button personal-page"/>');
      $btn.click(function () {
        app.buttons.handleClick(pageId, $btn);
        return false;
      });
      app.buttons.setStyle($btn, isBlocked);
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
          page.createButton(pageId, true);
        },
        function () {
          page.createButton(pageId, false);
        }
    );
  }

})();