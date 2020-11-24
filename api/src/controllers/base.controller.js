const {sleep} = require('./../helpers/sleep');
const {NODE_ENV} = process.env;

module.exports = function (controller) {
  return function (ctx) {
    if (NODE_ENV === 'development') {
      sleep(1);
    }

    return controller(ctx);
  }
}
