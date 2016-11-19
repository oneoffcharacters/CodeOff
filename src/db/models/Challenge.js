const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbconnection = require('../setup.js');

const challengeSchema = new Schema({
  title: String,
  functionName: {type: String, unique: true, required: true},
  difficulty: String,
  solutions: String,
  prompt: String,
  templateFunction: String,
  examples: Array
  // User has many Challenges, Challenge belongs to User
  // creator: ObjectId,
})

// db is not yet defined, create and import connection before uncommenting
const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;


