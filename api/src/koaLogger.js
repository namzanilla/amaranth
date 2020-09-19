module.exports = (app, NODE_ENV) => {
  if (NODE_ENV === 'development') {
    app.use(require('koa-logger')());
  }
}
