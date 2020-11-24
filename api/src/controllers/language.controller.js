const router = require('koa-router')();
const baseController = require('./base.controller');
router.prefix('/api/v1');

module.exports = (app) => {
  const languageService = require('./../services/language.service')(app);

  router.get('/language', baseController(getList));

  function getList(ctx) {
    return languageService.getList()
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  return router;
};

// default controller helper
function h(app) {
  return {
    onFulfilled: (ctx) => (res) => {
      ctx.body = res;
    },
    onRejected: (ctx) => (message) => {
      ctx.status = 500;

      if (app.isDevelopment === true) {
        ctx.body = message;
      }
    },
  };
}
