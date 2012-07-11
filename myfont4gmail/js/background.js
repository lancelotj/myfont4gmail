chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  switch (request.method) {
    case "getFont":
      sendResponse({
        family: localStorage["fontFamily"],
        size: localStorage["fontSize"]
      });
      break;
    default: sendResponse({});
  }
});
