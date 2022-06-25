var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var logger = require('morgan');
var config = require('./config');
var passport = require('passport');

module.exports = {
  Devices: require("./models/device"),
  Products: require("./models/product"),
  Users: require("./models/user"),
};
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var deviceRouter = require('./routes/devices');
var contactRouter = require('./routes/contacts');


/*
var galleryRouter = require('./routes/galleries');
var technicRouter = require('./routes/technics');

var deviRouter = require('./routes/devis');
var serviceRouter = require('./routes/services');
var categoryRouter = require('./routes/categories');
*/
const mongoose = require('mongoose');
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db)=>{
  console.log('Connected correctly to server');
  },(err)=>{
  console.log(err);
});

var app = express();



//app.use(cors()) 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('',productsRouter);
app.use('',deviceRouter);
app.use('',contactRouter);

app.use(express.static(path.join(__dirname, 'public')));

/*
app.use('',serviceRouter);
app.use('',productRouter);
app.use('',categoryRouter);
app.use('',technicRouter);
app.use('',galleryRouter)

app.use('',deviRouter);

*/

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
