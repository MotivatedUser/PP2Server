var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const passport = require('passport');
const config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const forSalePageRouter = require('./routes/forSalePageRouter');
const schedulePageRouter = require('./routes/schedulePageRouter');
const contactPageRouter = require('./routes/contactPageRouter');
const aboutPageRouter = require('./routes/aboutPageRouter');
const pp2Router = require('./routes/pp2Router');

const mongoose = require('mongoose');

const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'),
  err => console.log(err)
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/forSalePage', forSalePageRouter);
app.use('/schedulePage', schedulePageRouter);
app.use('/contactPage', contactPageRouter);
app.use('/aboutPage', aboutPageRouter);
app.use('/pp2', pp2Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
