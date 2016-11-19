var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('./src/db/models/User');
var socialAuth = require('./socialAuth.config');
var authInit = require('./socialAuthInit');

passport.use(new GitHubStrategy({
    clientID: socialAuth.github.clientID,
    clientSecret: socialAuth.github.clientSecret,
    callbackURL: socialAuth.github.callbackURL
  },

  function(accessToken, refreshToken, profile, done) {
    var searchQuery = {
      'github_username': profile.username
    };
    var updates = {
      github_username: profile.username
    };
    // update the user if they exist or add a new user
    User.find(searchQuery, function(err, user) {
      console.log(user);
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into session
authInit();

module.exports = passport;

