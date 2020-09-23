module.exports = (app) => {
  app.use(require('./controllers/language.controller')(app).routes());
  app.use(require('./controllers/category.controller')(app).routes());
  app.use(require('./controllers/brand.controller')(app).routes());
  app.use(require('./controllers/product.controller')(app).routes());
};
