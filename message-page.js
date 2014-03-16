(function () {

  var page = {

    registerPushStateEvent: function () {
      (function (history) {
        var pushState = history.pushState;
        history.pushState = function(state) {
          if (typeof history.onpushstate == "function") {
            history.onpushstate({state: state});
          }
          return pushState.apply(history, arguments);
        }
      })(window.history);
    },

    registerPushStateEventHandler: function (callback) {
      history.onpushstate = function(e) { callback(e) };
    },

    processPage: function () {
      var url = $('a.username').attr('href');
      var pageId = app.url2Id(url);

      app.checkIgnored(
          pageId,
          function () {
            page.createButton(pageId, chrome.i18n.getMessage("btnMarkNotIgnored"));
          },
          function () {
            page.createButton(pageId, chrome.i18n.getMessage("btnMarkIgnored"));
          }
      );

      this.registerPushStateEventHandler(function (e) { this.processPage(); });
    },

    createButton: function (pageId, text) {
      var $btn = $('<input type="button" id="milf_mark_btn" class="button" value="' + text + '"/>');
      $btn.click(function () {
        app.buttons.handleClick(pageId, $btn);
        return false;
      });
      $('div.mb-userinfo').append($btn);
    }

  };

  page.registerPushStateEvent();
  page.registerPushStateEventHandler(function (e) {
    chrome.extension.sendMessage("message-page");
  });

  page.processPage();

})();