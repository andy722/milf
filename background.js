chrome.extension.onMessage.addListener(function (message, sender, callback) {
  // Look for Exact message
  if (message == "message-page") {
    //Inject script again to the current active tab
    chrome.tabs.executeScript({
      file: "message-page.js"
    }, function () {
      console.log("Injection is Completed");
    });
  }
});