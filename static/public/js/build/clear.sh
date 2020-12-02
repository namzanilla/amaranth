#!/bin/sh

SCRIPT=$(readlink -f "$0")
SCRIPT_PATH=$(dirname "$SCRIPT")

cd "$SCRIPT_PATH" || exit

find . -name "*.gz" -type f -delete
find . -name "*.js" -type f -delete
find . -name "*.map" -type f -delete
