
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments

var dbURL =  process.env.MONGOLAB_URI || 'mongodb://localhost/backbone_express';
var db = require('mongoose').connect(dbURL,  function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + dbURL + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + dbURL);
  }
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.locals.pretty = true;

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/users', user.list);
require('./routes/contact')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
