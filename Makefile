DATA_FILE        = data.json
MUSTACHE_CC      = ./hbs.ts
MUSTACHE_CCFLAGS = --hbs.noEscape --hbs.strict
TARGET           = README.md

.PHONY: install build clean

build: $(TARGET)
clean:
	rm -f $(TARGET)
deps:
	deno cache $(MUSTACHE_CC)

%: %.hbs $(DATA_FILE) $(MUSTACHE_CC) 
	$(MUSTACHE_CC) $(MUSTACHE_CCFLAGS) -d $(DATA_FILE) -o $@ $< 
