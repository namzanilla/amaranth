const router = require('koa-router')();
router.prefix('/api/v1');

module.exports = (app) => {
  const productsService = require('./../services/products.service')(app);

  router.get('/products', getProducts);

  function getProducts(ctx) {
    const {
      request: {
        query,
      } = {},
    } = ctx;

    return productsService.getProducts(query)
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
