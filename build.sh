#!/bin/sh
set -eu

./node_modules/.bin/google-closure-compiler \
  --process_common_js_modules \
  --module_resolution NODE \
  --js index.js src/*.js \
  --js_output_file out/body.js

cat out/head.js out/body.js out/tail.js > out/bookmarklet.js
