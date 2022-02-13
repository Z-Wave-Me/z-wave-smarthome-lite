#!/usr/bin/env bash
DIST="./dist/apps/lite/"
FILE=$(find $DIST -name "main.*.js")
sed 's/;.\{2\}\.responseType="json"!==.\{2\}?.\+:"text"//' "$FILE" > tmp.js
mv tmp.js "$FILE"
