var passport = require('passport');
var User = require('./src/db/models/User');

// serialize and deserialize user instances from a session store to support login sessions
module.exports = function() {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
};