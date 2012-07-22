var mfg_font_added = false;
document.addEventListener("DOMNodeInserted", function(e){
  if (!mfg_font_added ) {
      var styles = document.getElementById("canvas_frame"
      ).contentDocument.styleSheets;
      if (styles.length == 3) {
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
              styles[2].addRule(".ii,.Ak", rule);
            }
          });
      }
  }
});
