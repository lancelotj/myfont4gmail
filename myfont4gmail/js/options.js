$(function() {
    var save = $("#id_save");
    var predefined_fonts = [
        "Arial", "Comic Sans MS", "Consolas", "Courier New",
        "Georgia", "Monaco", "monospace", "sans",
        "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana"
    ];

    function enableSave() {
        save.attr("disabled", false).text("Save");
    }

    var font_family = $("#font_family").autocomplete(
        predefined_fonts, {
            matchContains: true,
            renderItem: function(value, highlighted) {
                return $("<li style='font-family:" + value + "'/>")
                .html(highlighted);
            }
        }
    ).keypress(enableSave);

    var font_size = $("#font_size"
    ).change(enableSave);

    if (localStorage.fontFamily) {
        font_family.val(localStorage.fontFamily);
    }
    if (localStorage.fontSize) {
        font_size.val(localStorage.fontSize);
    }

    $("#id_cancel").click(function(){
        window.close();
    });

    $("#id_save").click(function(){
        localStorage.fontFamily = font_family.val();
        localStorage.fontSize = font_size.val();
        save.attr("disabled", true).text("Saved");
    });
});



