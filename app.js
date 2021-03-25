var express = require('express');
var path = require('path');
const config = require('config')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
var app = express();
var server = app.listen(config.get('port'));
app.use(cors())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://'+config.get('host')+'/'+config.get('collectionName'))
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var chat = require('./routes/chat');
var user = require('./routes/users');

var io = require('socket.io')(server);

//app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/chat', chat);
app.use('/user', user);


// socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log(data);
    io.emit('new-message', { message: data });
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   //res.render('error');
// });

module.exports = app;
