const {resolve} = require('path');
require('dotenv').config({
  path: resolve(__dirname, '..', '..', '..', '.env'),
});
const {exec} = require('child_process');
const {
  MYSQL_CONTAINER_NAME,
  MYSQL_DB_PASSWORD,
  MYSQL_DB_NAME,
  MYSQL_DB_USER,
} = process.env;

const cmd = `sh -c \\
  "docker exec ${MYSQL_CONTAINER_NAME} mysqldump \\
  -u${MYSQL_DB_USER} \\
  -p${MYSQL_DB_PASSWORD} ${MYSQL_DB_NAME} > ./docker/mysql/dump/${MYSQL_DB_NAME}.sql" \\
  &> /dev/null`;

exec(cmd);
