const router = require('koa-router')();
router.prefix('/api/v1');

module.exports = (app) => {
  const productService = require('./../services/product.service')(app);

  router.get('/product/:productId(\\d+)/brand', getBrandByProductId);
  router.get('/product/:productId(\\d+)/meta', getMetaByProductId);

  function getBrandByProductId(ctx) {
    const {
      params: {
        productId,
      } = {},
    } = ctx;

    return productService.getBrandByProductId(productId)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  function getMetaByProductId(ctx) {
    const {
      params: {
        productId,
      } = {},
    } = ctx;

    return productService.getMetaByProductId(productId)
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
