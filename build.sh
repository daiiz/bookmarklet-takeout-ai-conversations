#!/bin/sh
set -eu

closure-compiler --js index.js --js_output_file out/body.js

cat out/head.js out/body.js out/tail.js > out/bookmarklet.js
