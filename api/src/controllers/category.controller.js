const router = require('koa-router')();
const baseController = require('./base.controller');
router.prefix('/api/v1');

module.exports = (app) => {
  const categoryService = require('./../services/category.service')(app);

  router.get('/category', baseController(getCategoryList));
  router.get('/category/:id(\\d+)', baseController(getById));
  router.get('/category/:id(\\d+)/info', baseController(getCategoryInfoById));

  function getCategoryList(ctx) {
    const {
      request: {
        query,
      } = {},
    } = ctx;

    return categoryService.getCategoryList(query)
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

  function getCategoryInfoById(ctx) {
    return categoryService.getCategoryInfoById(ctx)
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
