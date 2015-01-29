var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var compress = require('compression');
var MongoStore = require('connect-mongo')(session);

var routes = require('./routes/index');
var submit = require('./routes/submit');
var video = require('./routes/video');
var vote = require('./routes/vote');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compress());
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {maxAge:86400000}));
app.use(session({
    secret: 'Co*wefOwefpoiC89*(#)$&)(',
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 30 * 6 * 24 * 60 * 60 // = 6 months
    })
}));

app.use('/', routes);
app.use('/submit', submit);
app.use('/video', video);
app.use('/vote', vote);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            pageData: {
                title: "error",
                description: "we have a problem"
            },
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        pageData: {
                title: "error",
                description: "we have a problem"
            },
        message: err.message,
        error: {status: err.status}
    });
});


module.exports = app;
