// schema for restaurants
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cachedContentSchema = new Schema({
  repl_id: Number,
  cachedContent: String,
});

var CachedContent = mongoose.model('Test', cachedContentSchema);

module.exports = CachedContent;
