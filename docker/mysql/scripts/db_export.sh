#!/bin/sh

sh -c \
  "docker exec amaranth_mysql mysqldump -uroot -pjPxY7fUCZqtTaPueMGTA amaranth > ./docker/mysql/dump/amaranth.sql" \
  &> /dev/null
