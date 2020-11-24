const router = require('koa-router')();
const baseController = require('./base.controller');
const {NODE_API_SESSION_KEY} = process.env;
router.prefix('/api/v1');

module.exports = (app) => {
  const orderService = require('./../services/order.service')(app);

  router.get('/order/:orderId/:orderHash', baseController(getOrder));
  router.post('/order/create', baseController(createOrder));
  router.post('/order/:token/create', baseController(createOrder));

  async function getOrder(ctx) {
    return orderService.getOrder(ctx.params.orderId, ctx.params.orderHash)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx));
  }

  async function createOrder(ctx) {
    let token;

    if (ctx.params.token) token = ctx.params.token
    else token = ctx.cookies.get(NODE_API_SESSION_KEY);

    return orderService.createOrder(token, ctx.request.body)
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
