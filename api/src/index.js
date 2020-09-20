require('./dotenv');

const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('koa-router')();
const app = new Koa();
const {
  NODE_ENV,
  NODE_API_PORT,
} = process.env;

app.isDevelopment = NODE_ENV === 'development';

require('./mysql')(app);
require('./redis')(app);
require('./mongo')(app);
require('./koaLogger')(app, NODE_ENV);

app.use(koaBody());

require('./controllers')(app);

app.use(router.allowedMethods());

app.listen(NODE_API_PORT, () => {
  console.log(`Server running at http://localhost:${NODE_API_PORT}`);
});
