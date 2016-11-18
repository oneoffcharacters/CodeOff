var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('./src/db/models/User');
var socialAuth = require('./socialAuth.config');
var authInit = require('./socialAuthInit');

passport.use(new GitHubStrategy({
  
}));

