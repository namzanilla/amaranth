const router = require('koa-router')();
router.prefix('/api/v1');

module.exports = (app) => {
  const categoryService = require('./../services/category.service')(app);

  router.get('/category', getList);
  router.get('/category/:id(\\d+)', getById);

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
