module.exports = (koaInstance, app) => {
  koaInstance.use(require('./controllers/language.controller')(app).routes());
  koaInstance.use(require('./controllers/category.controller')(app).routes());
  koaInstance.use(require('./controllers/brand.controller')(app).routes());
  koaInstance.use(require('./controllers/product.controller')(app).routes());
};
