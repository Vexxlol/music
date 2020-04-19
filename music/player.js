let funcs = {}

const db = require('./db/songs.json')
const webS = require('../webserver/server.js')
let poss = 0;
let popS = 0;
funcs.playerPop = (pos, s) => {
  parseInt(pos)
  popS = 0;
  parseInt(s)
  poss = pos
  var timer = setInterval(() => {
    if (s >= popS) {
      // Keep playing!
      popS++;
	console.log(`Song ${pos}, played ${popS} out of ${s}`)
    } else {
	pos += 1
      if (pos >= parseInt(db.popQueue.length)) {
        pos = 0;
        poss = pos
      } else {
        poss = pos
      }
      console.log(`Song ended: ${pos}`)
      clearInterval(timer)
      return broadCastPop(pos);
    }

  }, 1000)
}

function broadCastPop(pos) {
  parseInt(pos)
  var length = parseInt(db.popQueue[pos].split(' ').slice(2, 3).toString())
  funcs.playerPop(pos, length)
  webS.broadcast(db.popQueue[pos].split(' ').slice(0, 1).toString(), 0) 
}

funcs.getPosPop = () => {
  return `${poss} ${popS}`;                 
}

module.exports = funcs;
