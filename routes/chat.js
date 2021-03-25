var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();
//var server = require('http').createServer(app);
var Chat = require('../models/Chat.js');




/* GET ALL CHATS */
router.get('/:room', function(req, res, next) {
  Chat.find({ room: req.params.room }, function (err, chats) {
    if (err) return next(err);
    res.json(chats);
  });
});

/* GET  CHATS based on USER */
router.get('/users/:user/:loggedInUser', function(req, res, next) {
  console.log("username ==",req.params);
   // Chat.find({$and: [ { createdTo: { $in: req.params.loggedInUser } }, { nickname: { $in: req.params.user } } ] }, function (err, chats) {
    Chat.find(
      {
      $or: [
        {$and: [ { createdTo: { $in: req.params.loggedInUser } }, { nickname: { $in: req.params.user } } ] },
        {$and: [ { createdTo: { $in: req.params.user } }, { nickname: { $in: req.params.loggedInUser } }]}
        ]
    }, function (err, chats) {

    if (err) return next(err);
    res.json(chats);
  });
});


/* GET SINGLE CHAT BY ID */
router.get('/:id', function(req, res, next) {
  Chat.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE CHAT */
router.post('/', function(req, res, next) {
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE CHAT */
router.put('/:id', function(req, res, next) {
  Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE CHAT */
router.delete('/:id', function(req, res, next) {
  Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
