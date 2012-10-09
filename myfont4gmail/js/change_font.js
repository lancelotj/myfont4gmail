(function(){
    var PAGE_CHANGED_TIMER = null;
    document.body.addEventListener("DOMNodeInserted", pageBitLoaded, false);
    function pageBitLoaded(e) {
        if (PAGE_CHANGED_TIMER !== null) {
            clearTimeout(PAGE_CHANGED_TIMER);
        }
        PAGE_CHANGED_TIMER = setTimeout(function() {
            document.body.removeEventListener("DOMNodeInserted", pageBitLoaded, false);
            clearTimeout(PAGE_CHANGED_TIMER);
            chrome.extension.sendRequest({method: "getFont"}, function(response) {
                var rule = "", family = response.family, size = response.size;
                if (family) {
                    rule += "font-family:\"" + family  + "\"!important;";
                }
                if (size) {
                    rule += "font-size:" + size  + "pt!important;";
                }
                if (rule) {
                    document.styleSheets[document.styleSheets.length - 1].addRule(".ii,.Ak", rule);
                }
            });
        },
        100);
    }
})();
