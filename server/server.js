/***********************************
 * Module dependencies. 
 ************************************/
var express = require('express');
var Logger = require('./lib/logger');
var dotenv = require('dotenv');

/***********************************
 * App creation
 ************************************/
dotenv.config();
var app = express();

/***********************************
 * Set up app properties & engine
 ************************************/
app.use(Logger.getRequestLogger());
app.set('appname',  process.env.APPNAME);
app.set('env',  process.env.ENVIRONMENT);
app.set('port', process.env.PORT || process.env.DEFAULT_APP_HTTP_LISTENING_PORT);

/***********************************
 * Controllers
 ************************************/
var habitsController = require('./controllers/habits');

app.get('/', habitsController.index);

/***********************************
 * Start server
 ************************************/
/***********************************
 * App initialization
 ************************************/
app.listen(app.get('port'), function() {  
  Logger.getLogger().info('Express server listening on port ' + app.get('port'));
});

/***********************************
 * Module exports.
 ************************************/
module.exports = app;
