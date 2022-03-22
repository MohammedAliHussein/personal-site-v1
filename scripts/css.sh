#!/bin/bash

npx sass ./src/scss/main.scss ./src/css/main.css


npx html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js false --output dist/css/main.css --input-dir src/css --output-dir dist/css --file-ext css