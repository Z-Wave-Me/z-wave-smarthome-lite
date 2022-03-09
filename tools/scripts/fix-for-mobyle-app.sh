#!/usr/bin/env bash
./tools/scripts/venv/Scripts/python.exe ./tools/scripts/fix-for-mobyle-app.py

DIST="./dist/apps/lite/"
FILE=$(find $DIST -name "main.*.js")
gzip -k -f "$FILE"
echo "gzip file updated"
