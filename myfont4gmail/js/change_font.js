var mfg_font_added = false;
document.addEventListener("DOMNodeInserted", function(e){
  if (!mfg_font_added ) {
      var styles = document.getElementById("canvas_frame"
      ).contentDocument.styleSheets;
      if (styles.length == 2) {
          mfg_font_added = true;
          chrome.extension.sendRequest({method: "getFont"}, function(response) {
            var rule = "", family = response.family, size = response.size;
            if (family) {
              rule += "font-family:\"" + family  + "\"!important;";
            }
            if (size) {
              rule += "font-size:" + size  + "pt!important;";
            }
            if (rule) {
              styles[1].addRule(".ii,.Ak", rule);
            }
          });
      }
  }
});
