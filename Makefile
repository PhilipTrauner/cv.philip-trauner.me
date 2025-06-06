.PHONY: build watch

BUILD_IN := $(shell find -L src -type f) build/build.ts build/build.config.ts
BUILD_OUT := out

$(BUILD_OUT): $(BUILD_IN)
	@node_modules/.bin/tsx build/build.ts
	@node out/prerender/index.cjs --out out/csr/index.html
	@touch "$(BUILD_OUT)"

build: $(BUILD_OUT)

watch:
	@node_modules/.bin/tsx build/watch.ts
