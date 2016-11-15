const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  name: String,
  // password should not be stored as plain text
  password: String,
  completedChallenges: Array,
})

// db is not yet defined, create and import connection before uncommenting
// const User = db.model('User', userSchema);

exports = User;
