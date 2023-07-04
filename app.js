var createError = require('http-errors');
var express = require('express');
const { NOT_FOUND_PATH } = require('./constant/errorCode');
const { NOT_FOUND, ERROR_SERVER } = require('./constant/errorHttp');
const { PATH_NOT_FOUND } = require('./constant/errorMessage');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const HttpError = require('./interface/httpError');
const { response } = require('./middleware/responseMiddleware'); 
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

app.use(response);
// error handler
// catch 404 and forward to error handler
app.use((req, res, next) => {
  if (req.data) next();
  const error = new HttpError(PATH_NOT_FOUND, NOT_FOUND, NOT_FOUND_PATH);
  throw error;
})

app.use((error, req, res, next) => {
  console.log(error);
  if (req.data) next();
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.status || ERROR_SERVER).json({ message : error.message, code: error.code });
});


module.exports = app;
