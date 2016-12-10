var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();
// mongoose.connect('mongodb://ravi11o:podies.xyz@ds119738.mlab.com:19738/podiesnewsletter');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/podiesnewsletter', function(err, con){
    console.log(err, 'connected?')
});
var db = mongoose.connection;

// Setup webpack hot middleware.
(function() {

  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
})();

var routes = require('./routes/index');
var admin = require('./routes/admin');
var api = require('./routes/api')


// var db = require('./lib/db');

/*options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         
        db.config(config.get('databaseConfig'));
        next(null, config);
    }
}; */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use('/admin', admin);
app.use('/api', api);

// app.use('*', function(req, res) {
//   match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       res.status(500).send(error.message)
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//       // You can also check renderProps.components or renderProps.routes for
//       // your "not found" component or route respectively, and send a 404 as
//       // below, if you're using a catch-all route.
//       res.status(200).send(renderToString(<RouterContext {...renderProps} />))
//     } else {
//       res.status(404).send('Not found')
//     }
//   })
// });

app.use('*', function(req, res) {
  res.render('index');
})


// react match routes.
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
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
        message: err.message,
        error: {}
    });
});


module.exports = app;
