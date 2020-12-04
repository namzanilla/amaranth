const router = require('koa-router')();
const baseController = require('./base.controller');
router.prefix('/api/v1');

module.exports = (app) => {
  const brandService = require('./../services/brand.service')(app);

  router.get('/brand', baseController(getBrandList));
  router.get('/brand-list', baseController(getBrandList));
  router.get('/brand/:brandId(\\d+)', baseController(getBrandById));

  function getBrandList(ctx) {
    return brandService.getBrandList()
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  function getBrandById(ctx) {
    return brandService.getBrandById(ctx.params.brandId)
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
