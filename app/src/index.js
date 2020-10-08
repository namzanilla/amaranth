require('./dotenv');
const {resolve} = require('path');
const root = [resolve(__dirname)];

const args = {
  ignore: [/(node_modules)/],
  env: {
    development: {
      plugins: [
        [
          require.resolve('babel-plugin-module-resolver'),
          {
            root,
          },
        ],
      ],
    },
    production: {
      plugins: [
        [
          require.resolve('babel-plugin-module-resolver'),
          {
            root,
          },
        ],
      ],
    },
  },
};

require('@babel/register')(args);
require('./server');
