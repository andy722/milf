var app = {

  buttons: {

    updateText: function (pageId, $btn) {
      app.checkIgnored(
          pageId,
          function () {
            $btn.attr('value', chrome.i18n.getMessage("btnMarkNotIgnored"));
          },
          function () {
            $btn.attr('value', chrome.i18n.getMessage("btnMarkIgnored"));
          }
      );
    },

    handleClick: function (pageId, $btn) {
      function onUpdated() {
        app.buttons.updateText(pageId, $btn);
      }

      app.checkIgnored(
          pageId,
          function () { app.markNotIgnored(pageId, onUpdated) },
          function () { app.markIgnored(pageId, onUpdated) }
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

    chrome.storage.local.get(id, function (result) {
      if (result[id] == true) {
        that.log('Check ignored: ' + id + ', true');
        if (ifIgnored) { ifIgnored(); }

      } else {
        that.log('Check ignored: ' + id + ', false');
        if (ifNot) { ifNot(); }
      }
    });
  },

  markIgnored: function (id, callback) {
    this.log('Ignoring: ' + id);
    chrome.storage.local.set(this._makeParam(id, true), callback);
  },

  markNotIgnored: function (id, callback) {
    this.log('Reverting: ' + id);
    chrome.storage.local.set(this._makeParam(id, false), callback);
  },

  _makeParam: function (id, value) {
    var param = {};
    param[id] = value;
    return param;
  },

  log: function (stuff) {
    console.log('MILF: ' + stuff);
  }

};