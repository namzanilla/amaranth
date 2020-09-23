const router = require('koa-router')();
router.prefix('/api/v1');

module.exports = (app) => {
  const productService = require('./../services/product.service')(app);

  router.get('/product/:id(\\d+)/brand', getBrandByProductId);

  function getBrandByProductId(ctx) {
    const {
      params: {
        id: productId,
      } = {},
    } = ctx;

    return productService.getBrandByProductId(productId)
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
