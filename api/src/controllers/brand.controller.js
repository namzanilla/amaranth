const router = require('koa-router')();
const baseController = require('./base.controller');
router.prefix('/api/v1');

module.exports = (app) => {
  const brandService = require('./../services/brand.service')(app);

  router.get('/brand', baseController(getList));
  router.get('/brand/:id(\\d+)', baseController(getById));

  function getList(ctx) {
    return brandService.getList()
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  function getById(ctx) {
    const {
      params: {
        id: brandId,
      } = {},
    } = ctx;

    return brandService.getById(brandId)
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
