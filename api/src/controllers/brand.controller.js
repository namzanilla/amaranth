const router = require('koa-router')();
router.prefix('/api/v1');

module.exports = (app) => {
  const brandService = require('./../services/brand.service')(app);

  router.get('/brand/:id(\\d+)?', (ctx) => {
    return brandService.getList()
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
