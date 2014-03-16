(function () {

  var page = {

    init: function () {
      var $list = $('#excluded-list');

      app.listIgnored(function (list) {
        for (var i = 0; i < list.length; i++) {
          page.addEntry($list, list[i]);
        }
      });
    },

    addEntry: function ($target, id) {
      var $entry = $('<li id=' + id + ' class="excluded-entry"/>');

      var $left = $('<div class="left"/>');
      $entry.append($left);

      var $right = $('<div class="right"/>');
      $entry.append($right);

      var $name = $('<a href="' + app.site.id2url(id) + '"/>');
      $right.append($name);

      var $imgWrapper = $('<a href="' + app.site.id2url(id) + '"/>');
      $left.append($imgWrapper);

      var $img = $('<img/>');
      $imgWrapper.append($img);

      app.checkIgnored(
          id,
          function () {
            var $btn = page.createButton(id, true);
            $right.append($btn);
          },
          function () {
            var $btn = page.createButton(id, false);
            $right.append($btn);
          }
      );

      app.site.loadInfoElem(id, function ($elem) {
        $name.html($elem.find('.infoName').text());
        $img.attr('src',
            $elem.find('a.avatarko.big').css('background').replace(/.*url\(|\).*/g, ''));
        $target.append($entry);
      });

    },

    createButton: function (id, isBlocked) {
      var $btn = $('<input type="button" ' +
          'id="milf_mark_btn" ' +
          'class="settings-button settings-page"/>');

      app.buttons.setStyle($btn, isBlocked);
      $btn.click(function () {
        app.buttons.handleClick(id, $btn);
        return false;
      });
      return $btn;
    }

  };

  $(function () {
    page.init();
  })

})();