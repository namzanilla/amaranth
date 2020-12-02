#!/bin/sh

killall -9 node

sh -c "docker-compose start" &

./static/public/js/build/clear.sh

cd ./api || exit
sh -c "npm start" &

cd ../app || exit
sh -c "npm run wp:build" &
sh -c "npm start" &
