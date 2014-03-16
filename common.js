var app = {

  buttons: {

    updateText: function (pageId, $btn) {
      app.checkIgnored(
          pageId,
          function () {
            $btn.attr('value', app.msg("btnMarkNotIgnored"));
          },
          function () {
            $btn.attr('value', app.msg("btnMarkIgnored"));
          }
      );
    },

    handleClick: function (pageId, $btn) {
      function onUpdated() {
        app.buttons.updateText(pageId, $btn);
      }

      app.checkIgnored(
          pageId,
          function () { app._markNotIgnored(pageId, onUpdated) },
          function () { app._markIgnored(pageId, onUpdated) }
      );
    }

  },

  url2Id: function (url) {
    var id = url.replace(/.*\/|\?.*/g, '');
    this.log('URL -> Id: ' + url + ' -> ' + id);

    return id;
  },

  checkIgnored: function (id, ifIgnored, ifNot) {
    var that = this;
    this.log('Check ignored: ' + id);

    this._getIgnoredList(function (list) {
      if (list.indexOf(id) !== -1) {
        that.log('Check ignored: ' + id + ', true');
        ifIgnored();

      } else {
        that.log('Check ignored: ' + id + ', false');
        ifNot();
      }
    });
  },

  listIgnored: function (callback) {
    return this._getIgnoredList(callback);
  },

  _markIgnored: function (id, callback) {
    this.log('Ignoring: ' + id);

    this._getIgnoredList(function (list) {
      list.push(id);
      app._setIgnoredList(list, callback);
    });
  },

  _markNotIgnored: function (id, callback) {
    this.log('Reverting: ' + id);

    this._getIgnoredList(function (list) {
      app.util.removeItem(list, id);
      app._setIgnoredList(list, callback);
    });
  },

  _getIgnoredList: function (callback) {
    chrome.storage.local.get('ignored', function (result) {
      if (result && result.ignored) {
        callback(result.ignored);
      } else {
        callback([]);
      }
    });
  },

  _setIgnoredList: function (list, callback) {
    chrome.storage.local.set({ignored: list}, callback);
  },

  log: function (stuff) {
    console.log('MILF: ' + stuff);
  },

  msg: function (key) {
    return chrome.i18n.getMessage(key);
  },

  util: {

    removeItem: function (array, item) {
      for(var i in array) {
        if(array[i] == item) {
          array.splice(i, 1);
          break;
        }
      }
    }
  },

  site: {
    loadInfoElem: function (id, callback) {
      var $tempPage = $('<div/>');
      $tempPage.load(
          app.site.id2url(id) + " .MainBlockRight",
          function () {
            callback($tempPage);
          }
      );
    },

    id2url: function (id) {
      return "http://www.mamba.ru/" + id;
    }
  }

};