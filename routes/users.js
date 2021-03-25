var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
//var server = require('http').createServer(app);
var User = require('../models/User.js');

/* GET  CHATS based on USER */
// router.get('/users/:user/:loggedInUser', function(req, res, next) {
//     console.log("username ==",req.params);
//     Chat.find({  nickname : [ req.params.user , req.params.loggedInUser ]   }, function (err, chats) {
//       if (err) return next(err);
//       res.json(chats);
//     });
//   });

/* GET  Users BY Room  */
router.get('/:room', function (req, res, next) {
  console.log("room ==",req.params.room);
  
    User.find({ room: req.params.room }, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET  Users BY Room and loggedOnUser */
router.get('/:room/:user', function (req, res, next) {
  //console.log("room ==",req.params.room);
  //console.log("user ==",req.params.user);

  User.find({$and: [ { room: { $in: req.params.room } }, { nickname: { $in: req.params.user } } ] }  , function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* SAVE CHAT */
router.post('/', function (req, res, next) {
//  User.findOne({ nickname: name }, function (err,user ) {
  User.find({$and: [ { room: { $in: req.body.room } }, { nickname: { $in: req.body.nickname } } ] }  , function (err, user) {

    if (err) console.log(err);
    if (user.length !== 0) {
      res.json({status :'User Exists',user: user});

    } else {
     
      User.create(req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
      });
    }
    });
  });
  module.exports = router;
