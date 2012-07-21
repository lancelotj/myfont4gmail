chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getFont") {
        sendResponse({
            family: localStorage.fontFamily,
            size: localStorage.fontSize
        });
    } else {
        sendResponse({});
    }
});
