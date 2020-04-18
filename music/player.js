let funcs = {}

const db = require('./db/songs.json')
const webS = require('../webserver/server.js')
let poss = 0;
let popS = 0;
funcs.playerPop = (pos, s) => {
  parseInt(pos)
  parseInt(s)
  poss = pos
  setInterval(() => {
    if (s >= popS) {
      // Keep playing!
      popS++;
    } else {

      if (pos > parseInt(db.popQueue.length)) {
        pos = 0;
        poss = pos
      } else {
        pos += 1;
        poss = pos
      }

      return broadCastPop(pos);
    }

  }, 1000)
}

function broadCastPop(pos) {
  parseInt(pos)
  var length = parseInt(db.popQueue[pos].split(' ').slice(2, 3).toString())
  funcs.playerPop(pos, length)
  popS = 0;
  webS.broadcast(db.popQueue[pos].split(' ').slice(0, 1).toString(), 0) 
}

funcs.getPosPop = () => {
  return `${poss} ${popS}`;                 
}

module.exports = funcs;