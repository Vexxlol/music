var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var queue = require('../music/db/songs.json')

var player = require('../music/player.js')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  //console.log('a user connected');

  socket.on('joinRoom', () => {
    var dd = player.getPosPop();
    dd.split(' ')
    var pos = dd.slice(0, 1)
    var into = dd.slice(1)

    //console.log(into)

    socket.emit('song', { url: queue.popQueue[pos].split(' ').slice(0, 1), into: into})
  })

  socket.on('disconnect', () => {
    //console.log('user disconnected');
  });
});

module.exports.broadcast = (url, into) => {
  io.emit('song', { url: url, into: into })
}

module.exports.start = () => {
  http.listen(3000, () => {
    console.log('listening on *:3000');
  });
  player.playerPop(0, queue.popQueue[0].split(' ').slice(2, 3).toString());
}