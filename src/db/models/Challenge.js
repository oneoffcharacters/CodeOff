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
  examples: Array,
  test: String
  // User has many Challenges, Challenge belongs to User
  // creator: ObjectId,
})

const Challenge = db.model('Challenge', challengeSchema);

module.exports = Challenge;


