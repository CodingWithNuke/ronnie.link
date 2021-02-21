module.exports = (app) => {
  app.use('/urls', require('./UrlRouter'));
  app.use('/', require('./DefaultRouter'));
}