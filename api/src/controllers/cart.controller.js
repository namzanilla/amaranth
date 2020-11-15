const router = require('koa-router')();
router.prefix('/api/v1');

module.exports = (app) => {
  const cartService = require('./../services/cart.service')(app);

  router.get('/cart/:token', getCart);
  router.get('/cart/:token/details', getCartDetails);
  router.post('/cart/:token', addIntoCart);
  router.delete('/cart/:token', deleteFromCart);

  function getCart(ctx) {
    return cartService.getCart(ctx.params.token)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  function getCartDetails(ctx) {
    return cartService.getCartDetails(ctx.params.token, ctx.query)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  function addIntoCart(ctx) {
    return cartService.addIntoCart(ctx.params.token, ctx.request.body)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  function deleteFromCart(ctx) {
    return cartService.deleteFromCart(ctx.params.token)
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
