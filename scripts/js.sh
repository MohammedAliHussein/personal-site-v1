#!/bin/bash

npx rollup -c

mkdir dist/js

npx uglifyjs --compress --mangle -o ./dist/js/bundle.js ./src/bundle/bundle.js