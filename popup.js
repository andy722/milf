(function () {

  var page = {

    openSettings: function () {
      chrome.tabs.create({
        url: chrome.extension.getURL("settings.html")
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var settingsLink = document.getElementById('settings');
    settingsLink.innerHTML = chrome.i18n.getMessage("settingsLink")
    settingsLink.addEventListener('click', page.openSettings);
  });

})();


