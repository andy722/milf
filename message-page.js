(function () {

  var page = {

    processPage: function () {
      var $username = $('a.username');
      if (!$username.length) {
        return;
      }

      var url = $username.attr('href');
      var pageId = app.url2Id(url);

      var $btn = $('#milf_mark_btn');
      if ($btn.length) {
        // Update the state if necessary.
        app.buttons.updateText(pageId, $btn);

      } else {
        // No button present, just add it.
        app.checkIgnored(
            pageId,
            function () {
              page.createButton(pageId, app.msg("btnMarkNotIgnored"));
            },
            function () {
              page.createButton(pageId, app.msg("btnMarkIgnored"));
            }
        );
      }

    },

    createButton: function (pageId, text) {
      if ($('#milf_mark_btn').length) return;
      var $btn = $(
          '<input type="button" ' +
              'id="milf_mark_btn" ' +
              'class="button message-page" ' +
              'value="' + text + '"/>');
      $btn.click(function () {
        app.buttons.handleClick(pageId, $btn);
        return false;
      });
      $('div.mb-userinfo').append($btn);
    }
  };

  page.processPage();

  $('body').bind('DOMSubtreeModified', page.processPage);
})();