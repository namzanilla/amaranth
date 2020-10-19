import Koa from 'koa';
import Router from 'koa-router';

const router = new Router();
const koa = new Koa();
const {
  NODE_ENV,
  NODE_APP_PORT,
} = process.env;
const app = {};

app.isDevelopment = NODE_ENV === 'development';

require('./koaLogger')(koa, NODE_ENV);

import indexController from 'controllers/index.controller';
router.get('/', indexController(1));
router.get('/ru', indexController(2));

import categoriesController from 'controllers/categories.controller';
router.get('/c', categoriesController(1));
router.get('/ru/c', categoriesController(2));

import categoryController from 'controllers/category.controller';
router.get('/c/:id(\\d+)', categoryController(1));
router.get('/ru/c/:id(\\d+)', categoryController(2));

import cartController from 'controllers/cart.controller';
router.get('/cart', cartController(1));
router.get('/ru/cart', cartController(2));

import notFoundController from 'controllers/notFound.controller';

koa.use(async(ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;

    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;

    if (ctx.status === 404) {
      await notFoundController(ctx);
    }
  }
});

koa
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(NODE_APP_PORT, () => {
    console.log(`Server running at http://localhost:${NODE_APP_PORT}`);
  });
