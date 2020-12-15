const {resolve} = require('path');
const dotEnv = require('dotenv');

dotEnv.config({
  path: resolve(__dirname, '..', '..', '.env'),
});
