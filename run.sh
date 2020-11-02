#!/bin/sh

killall -9 node

sh -c "docker-compose start" &

./static/js/build/clear.sh

cd ./api || exit
sh -c "npm run dev" &

cd ../app || exit
sh -c "npm run wp:build" &
sh -c "npm run dev" &
