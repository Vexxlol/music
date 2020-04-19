var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var queue = require('../music/db/songs.json')

var port = 3000

var player = require('../music/player.js')

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  //console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

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
  http.listen(port, () => {
    console.log('listening on *:' + port);
  });
  player.playerPop(0, queue.popQueue[0].split(' ').slice(2, 3).toString());
}
