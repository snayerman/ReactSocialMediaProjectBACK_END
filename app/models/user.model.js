var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
   userName: String,
   password: String,
   friends: [{userName: String}],
   posts: [{author: String, category: String, content: String, friend: String}]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);