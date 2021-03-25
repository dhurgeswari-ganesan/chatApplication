var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  room: String,
  nickname: String,
  status: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
