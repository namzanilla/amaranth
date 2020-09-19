const {resolve} = require('path');
require('dotenv').config({
  path: resolve(__dirname, '..', '..', '..', '.env'),
});
const {exec} = require('child_process');
const {
  REDIS_CONTAINER_NAME,
} = process.env;

const cmd = `docker exec ${REDIS_CONTAINER_NAME} redis-cli flushall`;

exec(cmd);
