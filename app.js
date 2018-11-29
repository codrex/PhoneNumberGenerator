const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./models');
const { renderErrorPage } = require('./controller');
const { SERVER_ERR_MSG } = require('./constants');

const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', (req, res, next) => {
  req.db = db;
  indexRouter(req, res, next);
});
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  renderErrorPage(res, err.status || 500, SERVER_ERR_MSG);
});

module.exports = app;
