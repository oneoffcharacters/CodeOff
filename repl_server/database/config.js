var mongoose = require('mongoose');

// in case machine can't find config.js, then have a config_example.js file for testing

// var db = require('../config/env/config.js').mongo;
// mongoose.connect(db.url); //connect to database
var db = mongoose.connection;
mongoose.connect('mongodb://localhost/codedrop/testingService');

db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to Mongoose!');
});

module.exports = db;
