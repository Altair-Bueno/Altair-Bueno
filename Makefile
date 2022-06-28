DATA_FILE        = data.json
MUSTACHE_CC      = poetry run chevron
MUSTACHE_CCFLAGS = -w
TARGET           = README.md

.PHONY: install build clean

build: $(TARGET)
clean:
	rm -f $(TARGET)
deps:
	poetry install

%: $(DATA_FILE) %.mustache
	$(MUSTACHE_CC) $(MUSTACHE_CCFLAGS) -d $^ > $@