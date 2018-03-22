var Post = require('../models/post.model.js');
var User = require('../models/user.model.js');
var jwt = require('jsonwebtoken');
var dbConfig = require('../../config/database.config.js');

function verifyToken(token, res) {
   return jwt.verify(token, dbConfig.secret, (err, decoded) => {
      if(err)
         return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      return decoded;
   });
}

function getToken(req) {
   var token = req.headers['x-access-token'];
   
   if (!token)
      return res.status(401).send({ auth: false, message: 'No token provided.' });
   
   return token;
}

exports.newPost = function(req, res) {
   var token = getToken(req);
   var self = verifyToken(token, res);
      
   User.findById(self.id, (err, usr) => {
      if(usr) {
         var post = new Post({ author: req.body.author, category: req.body.category, content: req.body.content, friend: req.body.friend });
         console.log(usr+"\n\n");
         usr.posts = usr.posts.concat(post);
         console.log(usr);
         post.save();
         usr.save();
         return res.status(200).send({ message: 'Posted message succesfully '});
      }
   })
}

exports.deletePost = function(req, res) {
   var token = getToken(req);
   var self = verifyToken(token, res);

   if (!req.params.id)
      return res.status(400).send({ message: "No ID specified" });

   var id = req.params.id;

   User.findById(self.id, (err, usr) => {
      if(usr) {
         usr.posts = usr.posts.filter(post => {
            return post._id !== id;
         });
         usr.save();

         Post.findById(id, (err, post) => {
            if(post) {
               post.remove();
               return res.status(200).send({ message: "Post deleted!" });
            }
         })
      }
   })
}

exports.getAllPosts = function(req, res) {
   var token = getToken(req);
   var self = verifyToken(token, res);

   Post.find({}, (err, posts) => {
      if(err)
         return res.status(400).send({message: "unable to retrieve posts!"});
      
      return res.status(200).send({posts});
   })
}