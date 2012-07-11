DIST_DIR = dist
SRC_DIR = myfont4gmail

DIST = $(DIST_DIR)/gmail_font.zip

.PHONY: all clean

all: $(DIST)

$(DIST_DIR):
	mkdir -p $@

$(DIST): $(wildcard $(SRC_DIR)/*) | $(DIST_DIR)
	rm $(DIST_DIR)/$(DIST)
	cd $(SRC_DIR) && zip -r ../$@ . -x \*.DS_Store \*.\*.swp

clean:
	rm -rf $(DIST_DIR)/*
