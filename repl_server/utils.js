var db = require('./database/config.js');
var CachedContent = require('./database/models/cachedContent.js');

module.exports = {
  addNewContent: function (id, content, callback) {
    var cache = new CachedContent({
      repl_id: id,
      cachedContent: content
    });

    cache.save((err, newContent) => {
      if (err) {
        callback(err);
      }
      console.log('New cache content added to db: ' , newContent);
      callback(null, newContent);
    });
  },

  getContent: function(id, callback) {
    CachedContent.findOne({repl_id: id}).exec((err, found) => {
      if (err) {
        callback(err);
      }
      callback(null, found);
    });
  },

  updateContent: function(id, content, callback) {

    CachedContent.findOne({repl_id: id}).exec((err, found) => {
      if (err) {
        callback(err);
      }
      if (found) {
        found.cachedContent = content;
        found.save((err, updatedContent) => {
          if (err) {
            console.err(err);
            callback(err);
          }
          console.log('Content has been updated ', updatedContent);
          callback(null, updatedContent);
        });
      }
    });
  }
};

