module.exports = (app) => {
  app.use('/api/urls', require('./UrlRouter'));
  app.use('/', require('./DefaultRouter'));
}