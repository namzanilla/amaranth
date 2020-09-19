const router = require('koa-router')();
router.prefix('/api/v1');

module.exports = (app) => {
  const languageService = require('./../services/language.service')(app);

  router.get('/language', (ctx) => {
    return languageService.getLanguages()
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
