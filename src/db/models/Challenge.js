const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  name: String,
  difficulty: String,
  attempts: String,
  solutions: String,
  prompt: String,
  comments: String,
  // User has many Challenges, Challenge belongs to User
  creator: ObjectId,
})

// db is not yet defined, create and import connection before uncommenting
// const Challenge = db.model('Challenge', challengeSchema);

exports = Challenge;
