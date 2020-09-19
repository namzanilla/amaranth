const {resolve} = require('path');
require('dotenv').config({
  path: resolve(__dirname, '..', '..', '..', '.env'),
});
const {exec} = require('child_process');
const {
  MYSQL_CONTAINER_NAME,
  MYSQL_DB_PASSWORD,
  // MYSQL_DB_NAME,
  MYSQL_DB_USER,
} = process.env;

const file = resolve(__dirname, '..', 'dump', 'amaranth.sql.gz');
// console.log('file', file);
const cmd = `zcat ${file} | docker exec ${MYSQL_CONTAINER_NAME} mysql -u${MYSQL_DB_USER} -p${MYSQL_DB_PASSWORD} test`;

exec(cmd);
