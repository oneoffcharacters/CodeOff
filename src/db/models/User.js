const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const db = require('../setup.js');

// code drop userSchema
  // login: Sequelize.STRING,
  // github_id: Sequelize.STRING,
  // name: Sequelize.STRING,
  // avatar_url: Sequelize.STRING,
  // github_url: Sequelize.STRING,
  // email: Sequelize.STRING,
  // company: Sequelize.STRING,
  // admin: Sequelize.BOOLEAN,
  // moderator: Sequelize.BOOLEAN,
  // reputation: Sequelize.INTEGER

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  }
  password: {
    type: String,
    required: true
  }
  completedChallenges: Array,
})

userSchema.pre('save', function(next) {  
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {  
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

const Challenge = db.model('User', userSchema);

module.exports = User;
