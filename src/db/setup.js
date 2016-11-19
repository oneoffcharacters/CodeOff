const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeoff');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Mongoose connection is on ');
});

module.exports = db;