var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var log=require('./routes/login');
const fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
app.post('/register',function(req,res){
  var formbody=req.body;
  var jsondata = '{"name":"'+formbody.usname+'","mail":"'+formbody.mail+'","pasword":"'+formbody.psw+'","age":"'+formbody.age+'","address":"'+formbody.addr+'","phone_no":"'+formbody.ph+'"}';
  var jsonobj= JSON.parse(jsondata);
  var jsoncontent = JSON.stringify(jsonobj);
  fs.writeFile('output.json',jsoncontent,'utf8',
function (err){
  if (err){
    console.log("error");
  }
  console.log("success");
});
});
app.use('/users', usersRouter);
app.use('/login',log);

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
