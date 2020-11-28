const router = require('koa-router')();
const baseController = require('./base.controller');
router.prefix('/api/v1');

module.exports = (app) => {
  const categoryService = require('./../services/category.service')(app);

  router.get('/category', baseController(getList));
  router.get('/category/:id(\\d+)', baseController(getById));
  router.get('/category/:id(\\d+)/info', baseController(getInfoById));

  function getList(ctx) {
    const {
      request: {
        query,
      } = {},
    } = ctx;

    return categoryService.getList(query)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx))
  }

  function getById(ctx) {
    const {
      params: {
        id: categoryId,
      } = {},
      query: {
        language_id: languageId,
      } = {},
    } = ctx;

    const params = {
      categoryId,
      languageId,
    };

    return categoryService.getById(params)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx))
  }

  function getInfoById(ctx) {
    return categoryService.getInfoById(ctx)
      .then(h(app).onFulfilled(ctx), h(app).onRejected(ctx))
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
