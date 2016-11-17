const Chance = require('chance')
const chance = new Chance();

//Create a namespace for a socket connection for a specific ID
const createNamespace = (ID, io) => {
  console.log('created namespace for ', ID);
  var nsp = io.of('/' + ID);
  
  nsp.on('connection', (socket) => {
    console.log('a user has connected to the namespace', ID);
    socket.on('i won', (data) => {
      console.log('The following client won',  data.winner)
      nsp.emit('game won', {
        winner: data.winner
      })
    });
    socket.on('disconnect', () => {
      console.log('a user has disconnected from the namespace', ID);
    });
  });
}

//This will notify both of the pairs of their new opponents
const notifyPair = (io, pair1, pair2, pairID) => {
  io.emit(pair1, {
    type: 'initBattle',
    pairID: pairID,
    opponentID: pair2
  });
  io.emit(pair2, {
    type: 'initBattle',
    pairID: pairID,
    opponentID: pair1
  });
}

const dequeue = (io, queue) => {
  //Declare the pairing ID for them and create the namespace for them to communicate on
  var pairID = chance.string({length:3, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'});
  createNamespace(pairID, io);

  const pair1 = queue.shift()
  const pair2 = queue.shift()

  notifyPair(io, pair1, pair2, pairID)
  console.log('queue:', queue)
}

const setPairingListeners = (io) => {
  let queueIDList = {};
  let queue = [];

  io.on('connection', function(socket){
    socket.on('message', function(obj){
      //Return out of function if the client ID is empty
      if (!obj.clientID) {return;}

      //If the user has not been queued, then queue them
      if (!queueIDList[obj.clientID]){
        queue.push(obj.clientID);
        queueIDList[obj.clientID] = true;
      }

      console.log('queue:', queue)
      //If there is now someone to match with, create a unique pairing ID and share it with both clients
      if (queue.length > 1){
        dequeue(io, queue);
      }
    });
  });
}


module.exports = {
  setPairingListeners: setPairingListeners
}


