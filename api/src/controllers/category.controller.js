const router = require('koa-router')();
router.prefix('/api/v1');

module.exports = (app) => {
  const languageService = require('./../services/category.service')(app);

  router.get('/category/:id(\\d+)?', (ctx) => {
    const {
      params,
      request: {
        query,
      } = {},
    } = ctx;

    return languageService.getCategories(params, query)
      .then((res) => {
        ctx.body = res;
      })
      .catch((message) => {
        ctx.status = 500;

        if (app.isDevelopment === true) {
          ctx.body = message;
        }
      });
  });

  return router;
};
