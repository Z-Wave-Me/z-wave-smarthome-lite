#!/usr/bin/env bash
python ./tools/scripts/fix-for-mobyle-app.py

DIST="./dist/apps/lite/"
FILE=$(find $DIST -name "main.*.js")
gzip -k -f "$FILE"
echo "gzip file updated"
