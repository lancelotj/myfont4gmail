var canvas_frame = document.getElementById("canvas_frame");
var font_added = false;
document.addEventListener("DOMNodeInserted", function(e){
  if (!font_added ) {
      var styles = canvas_frame.contentDocument.styleSheets
      if (styles.length > 1) {
          font_added = true;
          chrome.extension.sendRequest({method: "getFont"}, function(response) {
            var rule = "", family = response.family, size = response.size;
            if (family) {
              rule += "font-family:\"" + family  + "\"!important;";
            }
            if (size) {
              rule += "font-size:" + size  + "pt!important;";
            }
            console.log(styles[1]);
            console.log("works");
            rule && styles[1].addRule(".ii,.Ak", rule);
          });
      }
  }
});
