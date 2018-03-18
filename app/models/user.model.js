var mongoose = require('mongoose');

var friendsSchema = mongoose.Schema({
   userName: String
}, { _id : false });

var postsSchema = mongoose.Schema({
   autho: String,
   category: String,
   content: String,
   friend: String
}, { _id : false });

var UserSchema = mongoose.Schema({
   userName: String,
   password: String,
   friends: [friendsSchema],
   posts: [postsSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);