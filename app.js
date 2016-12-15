var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './client/routes';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './client/reducers/index';
import fetchComponentData from './utils/fetchData';
import thunk from 'redux-thunk';


var app = express();
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

// var routes = require('./routes/index');
var admin = require('./routes/admin');
var api = require('./routes/api')

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

app.use('*', function(req, res) {

  match({ routes: routes, location: req.originalUrl },
    (error, redirectLocation, renderProps) => {
    let initialState = {};
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    if (error) {
      res.status(500).send(error.message)
    } else 

    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      return fetchComponentData(store, renderProps.components, renderProps.params)
        .then(() => {
          const body = renderToString(
            <Provider store={store}>       
              <RouterContext {...renderProps} />
            </Provider>
          );
          res.render('index', { body: body, initialState: JSON.stringify(store.getState()) });
        })
    } else {
      res.status(404).send('Not found')
    }
  })
});
const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV || 'production';
// server.listen(port, err => {
//   if (err) {
//     return console.error(err);
//   }
//   console.info(`Server running on http://localhost:${port} [${env}]`);
// });


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


app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
