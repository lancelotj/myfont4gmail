SHELL := /bin/bash

TEMP_DIR = temp
SRC_DIR = myfont4gmail

SRC_FILES = $(shell find $(SRC_DIR) -type f \
			-not -name '*.swp' \
			-not -name .DS_Store \
			-not -name '*.js' \
			-not -name '*.html'\
			)
PRE_PACK_FILES = $(SRC_FILES:$(SRC_DIR)/%=$(TEMP_DIR)/%)

# options
JS_OPTIONS = $(TEMP_DIR)/js/options.js
JS_OPTIONS_SRC = $(addprefix $(SRC_DIR)/js/, jquery.autocomplete.js options.js )

JS_SINGLE = $(addprefix $(TEMP_DIR)/js/, jquery-1.7.2.min.js background.js change_font.js)

HTML = $(shell find $(SRC_DIR) -name '*.html' -type f)
HTML_TEMP = $(HTML:$(SRC_DIR)/%=$(TEMP_DIR)/%)

DIST_FILE = gmail_font.zip

OPTIONS_PAGE = $(SRC_DIR)/options.html

.PHONY: all clean

all: $(DIST_FILE)

$(TEMP_DIR):
	mkdir -p $@

$(DIST_FILE): $(PRE_PACK_FILES) $(JS_OPTIONS) $(JS_SINGLE) $(HTML_TEMP) | $(TEMP_DIR)
	cd $(TEMP_DIR) && zip -r ../$(DIST_FILE) .

# all source files
$(PRE_PACK_FILES): $(TEMP_DIR)/%: $(SRC_DIR)/%
	@mkdir -p `dirname $@`
	cp $< $@

# js files
$(JS_OPTIONS): $(JS_OPTIONS_SRC)
	@mkdir -p `dirname $@`
	cat $^ | uglifyjs > $@

$(JS_SINGLE): $(TEMP_DIR)/%: $(SRC_DIR)/%
	@mkdir -p `dirname $@`
	cat $^ | uglifyjs > $@

$(HTML_TEMP): $(TEMP_DIR)/%: $(SRC_DIR)/%
	@mkdir -p `dirname $@`
	cat <(sed -n '/<!-- JS_BLOCK -->/,$$!p' $<) \
		<(echo '<script type="text/javascript" src="js/$(patsubst $(SRC_DIR)/%,%,$(basename $<)).js"></script>') \
		<(sed -n '1,/<!-- END_JS_BLOCK -->/!p' $<) \
	> $@

clean:
	rm -rf $(TEMP_DIR)
	rm -f $(DIST_FILE)
