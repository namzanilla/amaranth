const router = require('koa-router')();
const baseController = require('./base.controller');
router.prefix('/api/v1');

module.exports = (app) => {
  const cartService = require('./../services/cart.service')(app);

  router.get('/cart/:token', baseController(getCart));
  router.get('/cart/:token/details', baseController(getCartDetails));
  router.post('/cart/:token/add', baseController(addIntoCart));
  router.post('/cart/:token/remove', baseController(removeFromCart));

  async function getCart(ctx) {
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

  function removeFromCart(ctx) {
    return cartService.removeFromCart(ctx.params.token, ctx.request.body)
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
