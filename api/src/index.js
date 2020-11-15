require('./dotenv');

const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('koa-router')();
const koaInstance = new Koa();
const {
  NODE_ENV,
  NODE_API_PORT,
} = process.env;

const app = {};

app.isDevelopment = NODE_ENV === 'development';

require('./mysql')(app);
require('./redis')(app);
require('./koaLogger')(koaInstance, NODE_ENV);

koaInstance.use(koaBody());

require('./controllers')(koaInstance, app);

koaInstance.use(router.allowedMethods());

koaInstance.listen(NODE_API_PORT, () => {
  console.log(`Server running at http://localhost:${NODE_API_PORT}`);
});
