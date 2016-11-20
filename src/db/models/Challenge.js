const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../setup.js');

const challengeSchema = new Schema({
  title: String,
  functionName: String,
  difficulty: String,
  solutions: String,
  prompt: String,
  templateFunction: String,
  examples: Array
  // User has many Challenges, Challenge belongs to User
  // creator: ObjectId,
})

// db is not yet defined, create and import connection before uncommenting
const Challenge = db.model('Challenge', challengeSchema);

module.exports = Challenge;


