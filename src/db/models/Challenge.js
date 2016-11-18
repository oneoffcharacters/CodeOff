const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: String,
  difficulty: String,
  solutions: String,
  prompt: String,
  ex1: String,
  ex2: String,
  name: {type: String, unique: true, required: true},
  // User has many Challenges, Challenge belongs to User
  creator: ObjectId,
})

// db is not yet defined, create and import connection before uncommenting
const Challenge = db.model('Challenge', challengeSchema);

exports = Challenge;
