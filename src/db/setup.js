const mongoose = require('mongoose');
// const uri = 'mongodb://localhost/codeoff';
const config = require('../../config/main.js');
const options = {
  promiseLibrary: require('bluebird')
};

mongoose.connect(config.database, options);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Mongoose connection is on', config.database);
});

module.exports = db;
