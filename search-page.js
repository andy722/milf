(function () {
  var page = {
    processAll: function () {
      var that = this;
      $('div.u-photo').find('a').each(function (i, e) {
        that._processLink($(e));
      });
    },

    _processLink: function ($a) {
      var url = $a.attr('href');
      var pageId = app.url2Id(url);

      app.checkIgnored(
          pageId,
          function () {
            $a.closest('li').addClass('milf_ignored');
          },
          function () {}
      );
    }
  };

  page.processAll();

})();
