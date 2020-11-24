const {NODE_ENV} = process.env;

module.exports = function (controller) {
  return function (ctx) {
    if (NODE_ENV === 'development') {
      const {sleep} = require('./../helpers/sleep');
      sleep(1);
    }

    return controller(ctx);
  }
}
