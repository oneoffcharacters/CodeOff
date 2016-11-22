'use strict'

const Chance = require('chance')
const chance = new Chance();
const axios = require('axios');

let queueIDList = {};
let queue = [];
let namespaces = {};

//Create a namespace for a socket connection for a specific ID
const createNamespace = (ID, io) => {
  console.log('created namespace for ', ID);
  var nsp = io.of('/' + ID);
  //Add the namespace to the object that will be exported
  namespaces[ID] = nsp;
  nsp.on('connection', (socket) => {
    console.log('a user has connected to the namespace', ID);
    socket.on('i won', (data) => {
      console.log('The following client won',  data.client)
      nsp.emit('game won', {
        client: data.client
      })
    });
    socket.on('i resigned', (data) => {
      console.log('The following resigned',  data.client)
      console.log('The before after is ', queueIDList)
      delete queueIDList[data.opponent];
      delete queueIDList[data.client]
      console.log('The queue after is ', queueIDList)
      nsp.emit('opponent resigned', {
        client: data.client
      })
    });
    socket.on('disconnect', (data) => {
      nsp.emit('opponent resigned', {
        client: data.client
      })
      console.log('The data in the disconnect is', data)
      console.log('a user has disconnected from the namespace', ID);
    });
  });
}

// ajax request to db
const getChallenge = () => {
  return axios.get('http://localhost:3000/api/challenge')
  .then((resp) => {
    console.log('The response in getChallenge is', resp)
    const qLength = resp.data.length;
    const randomIndex = Math.floor(Math.random() * qLength)
    return resp.data[randomIndex]; //object
  })
  .catch((err) => {
    console.log('err in getChallenge', err)
  })
}

//This will notify both of the pairs of their new opponents
const notifyPair = (io, pair1, pair2, pairID) => {
  getChallenge()
  .then((randomChallenge) => {
   io.emit(pair1, {
    type: 'initBattle',
    pairID: pairID,
    opponentID: pair2,
    challenge: randomChallenge
  });
   io.emit(pair2, {
    type: 'initBattle',
    pairID: pairID,
    opponentID: pair1,
    challenge: randomChallenge
  });
 })
}

const setupSolo = (io, client) => {
  var pairID = chance.string({length:3, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'});
  createNamespace(pairID, io);

   getChallenge()
   .then((randomChallenge) => {
    io.emit(client, {
     type: 'initBattle',
     pairID: pairID,
     challenge: randomChallenge
   });
  })
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
  io.on('connection', function(socket){
    socket.on('message', function(obj){
      //Return out of function if the client ID is empty
      if (!obj.clientID) {return;}
      console.log('Entire object in message sent request', obj)
      
      //
      if ( obj.currentGameType === 'Batle') {
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
      } else if ( obj.currentGameType === 'Solo') {
        //Get question and return to client
        setupSolo(io, obj.clientID)
      }
    });
  });
}


module.exports = {
  setPairingListeners: setPairingListeners,
  namespaces: namespaces
}


