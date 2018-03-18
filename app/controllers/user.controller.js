var User = require('../models/user.model.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var dbConfig = require('../../config/database.config.js');

const saltRounds = 10;

exports.signup = function(req, res) {
   if(!req.body.userName || req.body.userName.length === 0)
      return res.status(400).send({message: "Missing userName"});

   if(!req.body.password || req.body.password.length === 0)
      return res.status(400).send({message: "Missing password"});

   User.findOne({userName: req.body.userName}, function(err, data) {
      if(data)
         return res.status(401).send({message: "Username already exists"});
      else {

         bcrypt.hash(req.body.password, saltRounds).then(hashedPw => {
            var user = new User({userName: req.body.userName, password: hashedPw, friends: [], posts: []});

            user.save(function(err, data) {
               if(err) {
                  console.log(err);
                  res.status(500).send({message: "Some error occurred while creating the User."});
               } else {
                  res.send(data);
               }
            })
         });
      }
   })
};

exports.login = function(req, res) {
   if(!req.body.userName || req.body.userName.length === 0)
      return res.status(400).send({message: "Missing userName", auth: false});

   if(!req.body.password || req.body.password.length === 0)
      return res.status(400).send({message: "Missing password", auth: false});

   let user = req.body.userName, pw = req.body.password;

   User.findOne({userName: user}, function(err, user) {
      if(user) {
         bcrypt.compare(pw, user.password).then(match => {
            if(match) { // Password matches
               var token = jwt.sign({ id: user._id }, dbConfig.secret, {
                  expiresIn: 86400 // expires in 24 hours
                });
               return res.status(200).send({message: "Successfully logged in!", token: token, auth: true});
            } else {
               return res.status(400).send({message: "Wrong password!", auth: false});
            }
         })
      } else {
         return res.status(404).send({message: "User doesn't exist!", auth: false});
      }
   })
}