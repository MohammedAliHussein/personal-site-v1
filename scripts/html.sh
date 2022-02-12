#!/usr/bin/bash

html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css false --minify-js false --output dist/index.html --input-dir src --output-dir dist/ --file-ext html

