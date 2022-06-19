DATA_FILE        = data.json
MUSTACHE_CC      = poetry run chevron
MUSTACHE_CCFLAGS = -w -d $(DATA_FILE)
TARGET           = README.md

.PHONY: install build clean

build: $(TARGET)
clean:
	rm -f $(TARGET)
install:
	poetry install

%: %.mustache $(DATA_FILE)
	$(MUSTACHE_CC) $(MUSTACHE_CCFLAGS) $< > $@