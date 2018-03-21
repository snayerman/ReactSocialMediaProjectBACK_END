var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
   author: String,
   category: String,
   content: String,
   friend: String
});

module.exports = mongoose.model('Post', PostSchema);