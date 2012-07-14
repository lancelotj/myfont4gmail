function create_ddmenu(ddmenu) {
  var predefinedFonts = [
    "Arial", "Comic Sans MS", "Consolas", "Courier New",
  "Georgia", "monospace", "Monaco", "sans",
  "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"];
  // create font list
  var ul = $("<ul id=\"font_list\">");
  ddmenu.click(function(){
    ul.toggle();
  });
  $.each(predefinedFonts, function(i, f) {
    var li = $("<li/>");
    li.css("font-family", f).html(f).click(function(){
      alert(f);
      ul.hide();
    });
    ul.append(li);
  });
  ddmenu.append(ul);
}

function enableSave() {
  $("#id_save").attr("disabled", false).html("Save &amp; Apply");
}

(function($, undefined) {
  $.widget("ui.combobox", {
    _create: function() {
      var input,
      self = this,
      select = this.element.hide(),
      selected = select.children(":selected"),
      value = selected.val() ? selected.text() : "",
      wrapper = this.wrapper = $("<span>")
        .addClass("ui-combobox")
        .insertAfter(select);

      input = $("<input/>")
        .appendTo(wrapper)
        .val(value)
        .addClass("ui-state-default ui-combobox-input")
        .autocomplete({
          delay: 0,
          minLength: 0,
          source: function(request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(select.children("option").map(function() {
              var text = $(this).text();
              if (this.value && (!request.term || matcher.test(text)))
              return {
                label: text.replace(
                         new RegExp(
                           "(?![^&;]+;)(?!<[^<>]*)(" +
                           $.ui.autocomplete.escapeRegex(request.term) +
                           ")(?![^<>]*>)(?![^&;]+;)", "gi"
                          ), "<strong>$1</strong>"),
                value: text,
                option: this
              };
            }));
          },
          select: function(event, ui) {
            ui.item.option.selected = true;
            self._trigger("selected", event, {
              item: ui.item.option
            });
          },
          change: function(event, ui) {
            if (!ui.item) {
              var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
                valid = false;
              select.children("option").each(function() {
                if ($(this).text().match(matcher)) {
                  this.selected = valid = true;
                  return false;
                }
              });
              if (!valid) {
                // remove invalid value, as it didn't match anything
                $(this).val("");
                select.val("");
                input.data("autocomplete").term = "";
                return false;
              }
            }
          }
        })
        .addClass("ui-widget ui-widget-content ui-corner-left");

      input.data("autocomplete")._renderItem = function(ul, item) {
        return $("<li></li>")
          .data("item.autocomplete", item)
          .append("<a style='font-family:" + item.value + "'>" + item.label + "</a>")
          .appendTo(ul);
      };

      $("<a>")
        .attr("tabIndex", -1)
        .attr("title", "Show All Items")
        .appendTo(wrapper)
        .button({
          icons: {
            primary: "ui-icon-triangle-1-s"
          },
          text: false
        })
        .removeClass("ui-corner-all")
        .addClass("ui-corner-right ui-combobox-toggle")
        .click(function() {
          // close if already visible
          if (input.autocomplete("widget").is(":visible")) {
            input.autocomplete("close");
            return;
          }

          // work around a bug (likely same cause as #5265)
          $(this).blur();

          // pass empty string as value to search for, displaying all results
          input.autocomplete("search", "");
          input.focus();
        });
    },
    destroy: function() {
      this.wrapper.remove();
      this.element.show();
      $.Widget.prototype.destroy.call(this);
    }
  });
})(jQuery);

$(function() {
  $("#font_family").combobox();
});

$(function(){
  var fontFamilyInput = $("#text_font_family");
  var fontSizeInput = $("#text_font_size");
  if (localStorage.fontFamily) {
    fontFamilyInput.val(localStorage.fontFamily);
  }
  if (localStorage.fontSize) {
    fontSizeInput.val(localStorage.fontSize);
  }
  fontFamilyInput.keydown(enableSave)
  .click(function(){
    this.select();
    return false;  
  });
fontSizeInput.change(enableSave);
create_ddmenu($("#ddmenu"));
$("#id_cancel").click(function(){
  window.close();
});

$("button").button();
$("#id_save").click(function(){
  localStorage.fontFamily = fontFamilyInput.val();
  localStorage.fontSize = fontSizeInput.val();
});

});



