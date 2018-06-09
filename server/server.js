/***********************************
 * Module dependencies. 
 ************************************/
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var path = require('path');
var passport = require('passport');
var connectEnsureLogin=require('connect-ensure-login');
var Logger = require('./lib/logger');
var loopback = require('loopback');
var boot = require('loopback-boot');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');

/***********************************
 * App creation
 ************************************/
dotenv.config();
var app = loopback();

/***********************************
 * Set up passport
 ************************************/
// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// attempt to build the providers/passport config
var config = {};
config = require('../providers.js');

/***********************************
 * Set up app properties & engine
 ************************************/
// boot scripts mount components like REST API
boot(app, __dirname);
// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true,
}));
// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
}));
app.middleware('session:before', cookieParser(app.get('cookieSecret')));
app.middleware('session', session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true,
}));
passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());
//app.use(express.static(path.join(__dirname, 'client')));
app.use(Logger.getRequestLogger());

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential,
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


/***********************************
 * App initialization
 ************************************/
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

/***********************************
 * Module exports.
 ************************************/
module.exports = app;