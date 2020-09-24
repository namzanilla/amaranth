#!/bin/sh

killall -9 node
sh -c "docker-compose start" &
cd ./api || exit
sh -c "npm start" &
