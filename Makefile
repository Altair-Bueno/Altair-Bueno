.PHONY: install build clean

build: README.md

clean:
	rm README.md || true

install:
	poetry install

README.md: README.md.mustache data.json
	poetry run chevron -w -d data.json README.md.mustache > $@