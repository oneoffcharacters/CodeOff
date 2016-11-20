const mongoose = require('mongoose');
const uri = 'mongodb://localhost/codeoff';
const options = {
  promiseLibrary: require('bluebird')
};

mongoose.connect(uri, options);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Mongoose connection is on', uri);
});

module.exports = db;
