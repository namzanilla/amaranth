#!/bin/sh

#BASEDIR=$(dirname "$0")
#echo "$BASEDIR"

# Absolute path to this script, e.g. /home/user/bin/foo.sh
SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPT_PATH=$(dirname "$SCRIPT")
cd "$SCRIPT_PATH" || exit
find . -name "*.gz" -type f -delete
find . -name "*.js" -type f -delete
