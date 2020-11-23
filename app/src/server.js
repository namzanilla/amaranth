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

import baseController from 'controllers/base.controller';

import indexController from 'controllers/index.controller';
router.get('/', baseController(1, indexController));
router.get('/ru', baseController(2, indexController));

import categoriesController from 'controllers/categories.controller';
router.get('/c', baseController(1 ,categoriesController));
router.get('/ru/c', baseController(2, categoriesController));

import categoryController from 'controllers/category.controller';
router.get('/c/:id(\\d+)', baseController(1, categoryController));
router.get('/ru/c/:id(\\d+)', baseController(2, categoryController));

import cartController from 'controllers/cart.controller';
router.get('/cart', baseController(1, cartController));
router.get('/ru/cart', baseController(2, cartController));

import orderController from 'controllers/order.controller';
router.get('/order/:orderId(\\d+)/:orderHash', baseController(1, orderController));
router.get('/ru/order/:orderId(\\d+)/:orderHash', baseController(2, orderController));

import productController from 'controllers/product.controller';
router.get('/p:id(\\d+)', baseController(1, productController));
router.get('/ru/p:id(\\d+)', baseController(2, productController));

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
