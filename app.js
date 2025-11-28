var createError = require('http-errors'); 
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.MONGO_URI

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
mongoose.connect(uri).then(() => console.log('connection successfully!')).catch((err) => console.error(err))

var indexRouter = require('./routes/index');
var settingRouter = require('./routes/settings');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.use((req, res, next) => {
  res.locals.config = {
    discord: process.env.DISCORD_SERVER || '',
    tiktok: process.env.TIKTOK || ''
  };
  next();
});

app.use('/', indexRouter);
app.use('/setting', settingRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
