var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose= require('mongoose');
var bookRouter = require("./routes/book");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.connect("mongodb+srv://samikakhadka63:tPQiOqudOkSeNMNH@cluster0.tpbbxdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log("connected")) //if connected then show connected in console
.catch((err)=> console.error("error conneting",err)) //if error then show errror connecting and show the error

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book',bookRouter);
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
