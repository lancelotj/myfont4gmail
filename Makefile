DIST_DIR = dist

DIST = $(DIST_DIR)/gmail_font.zip

.PHONY: all clean

all: $(DIST)

$(DIST_DIR):
	mkdir -p $@

$(DIST): $(wildcard gmail_font/*) | $(DIST_DIR)
	cd gmail_font && zip -r ../$@ . -x \*.DS_Store \*.\*.swp

clean:
	rm -rf $(DIST_DIR)/*
