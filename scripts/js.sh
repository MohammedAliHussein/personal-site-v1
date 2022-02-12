#!/usr/bin/bash

rollup -c

mkdir dist/js

uglifyjs --compress --mangle -o ./dist/js/bundle.js ./src/bundle/bundle.js