var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// default routes given, stored in routes folder, which holds methods to handle request!
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// creates the express app as a function using the imported module, then used to setup the view engine
var app = express(); 

// view engine setup // views stored in views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// gets path and tells you who should take care of the request
// i.e.: app will use /users route required in usersRouters (defined earlier) to handle request
app.use('/', indexRouter);
app.use('/users', usersRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;






