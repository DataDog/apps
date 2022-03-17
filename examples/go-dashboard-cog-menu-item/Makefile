.SUFFIXES:
Makefile:;

.DEFAULT_GOAL := dist/index.html

.PHONY: clean
clean:
	rm -fr dist

dist:
	mkdir -p $@

dist/index.html: index.html dist/index.js
	cp $< $@

dist/index.js: dist/main.wasm dist/wasm_exec.js
	touch $@

dist/main.wasm: app/main.go | dist
	GOOS=js GOARCH=wasm go build -o $@ $<

dist/wasm_exec.js: | dist
	cp "$$(go env GOROOT)/misc/wasm/wasm_exec.js" $@

.PHONY: serve
serve: dist/index.html
	go run server/main.go
