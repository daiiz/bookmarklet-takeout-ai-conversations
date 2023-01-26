#!/bin/sh
set -eu

closure-compiler --js index.js --js_output_file out/body.js
# head="javascript:(function(){"
# tail="})()"
# body=$(cat index.js)
# echo "${head}${body}${tail}" > out/bookmarklet.js

cat out/head.js out/body.js out/tail.js > out/bookmarklet.js
