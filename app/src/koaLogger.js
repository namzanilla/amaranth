module.exports = (koaInstance, NODE_ENV) => {
  if (NODE_ENV === 'development') {
    koaInstance.use(require('koa-logger')());
  }
}
