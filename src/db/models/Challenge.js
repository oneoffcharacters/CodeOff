const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: {type: String, unique: true, required: true},
  difficulty: String,
  solutions: String,
  prompt: String,
  ex1: String,
  ex2: String,
  // User has many Challenges, Challenge belongs to User
  // creator: ObjectId,
})

// db is not yet defined, create and import connection before uncommenting
const Challenge = mongoose.model('Challenge', challengeSchema);

exports = Challenge;
