var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandsRouter = require('./routes/brands');
var priceRouter = require('./routes/prices');
var customerRouter = require('./routes/customer');
var typeRouter = require('./routes/type');
var filterRouter = require('./routes/filters');
var itemsRouter = require('./routes/items')

// app.use('/items', itemsRouter);
// app.use('/brands', brandsRouter);
// app.use('/price', priceRouter);
// app.use('/customer', customerRouter);
// app.use('/type', typeRouter);
// app.use('/filters', filterRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/brands', brandsRouter);
app.use('/price', priceRouter);
app.use('/customer', customerRouter);
app.use('/type', typeRouter);
app.use('/filters', filterRouter);


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

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })

module.exports = app;
