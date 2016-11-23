'use strict'

const Chance = require('chance')
const chance = new Chance();
const axios = require('axios');

let queueIDList = {};
let queue = [];
let namespaces = {};

//Create a namespace for a socket connection for a specific ID
const createNamespace = (ID, io, ...users) => {
  console.log('created namespace for ', ID);
  var nsp = io.of('/' + ID);
  let userList = io.of('/' + ID).clients();
  //Add the namespace to the object that will be exported
  
  namespaces[ID] = {
    socket: nsp
  }

  users.forEach((userID) => {
    namespaces[ID][userID] = true;
  })

  nsp.on('connection', (socket) => {
    console.log('socket.idsocket.id', socket.id)
    console.log('Object.keys(io.sockets.sockets)', Object.keys(io.sockets.sockets))
    // Store only the two people who are participating in the game in this players prop
    console.log('namespaces[ID].players on connection', namespaces[ID].players)
    if (!namespaces[ID].players) {
      const playerSocketIDs = Object.keys(io.sockets.sockets)
      namespaces[ID].players = playerSocketIDs
    } else {
      const idStart = socket.id.indexOf("#") + 1
      const socketid = socket.id.slice(idStart)
      if (namespaces[ID].viewers) {
        //TODO: Push the views into this property
        namespaces[ID].viewers.push(socketid)
      } else {
        namespaces[ID].viewers = [socketid]
        //TODO: Create the array with this viewer in there
      }
    }

    //Santizse the namespace object to not send the socket because it crashes it
    let safeUsers = {};
    for (var key in namespaces[ID]) {
      if (key != 'socket') {
        safeUsers[key] = true;
      }
    }
    console.log('safe users',  safeUsers)
    nsp.emit('pairInfo', safeUsers)
    console.log('a user has connected to the namespace', ID);
    
    socket.on('textChange', (data) => {
      nsp.emit('updateText', data)
    })

    socket.on('i won', (data) => {
      nsp.emit('game won', {
        client: data.client
      })
    });
    socket.on('i resigned', (data) => {
      delete queueIDList[data.opponent];
      delete queueIDList[data.client]

      nsp.emit('opponent resigned', {
        client: data.client
      })
    });
    socket.on('disconnect', (data) => {

      delete queueIDList[data.client] //TODO: I think data.client is undefined
      const nspUsers = Object.keys(io.sockets.sockets)
      //Get the current list of people on NSP after disconnection
      console.log('NSP users',  nspUsers)
      console.log('namespaces[ID].players', namespaces[ID].players)
      
      for (var i = 0; i < namespaces[ID].players.length; i++) {
        const player = namespaces[ID].players[i]
        if (nspUsers.indexOf(player) === -1) {
          console.log('It was a player that left')
          nsp.emit('opponent resigned', {
            client: player
          })
          break;
        } 
      }
      console.log('namespaces[ID].viewers', namespaces[ID].viewers)
      if (namespaces[ID].viewers) {
        for (var i = 0; i < namespaces[ID].viewers.length; i++) {
          const viewer = namespaces[ID].viewers[i]
          if (nspUsers.indexOf(viewer) === -1) {
            console.log('It was a viewer that left')
            nsp.emit('viewer left', {
              client: viewer
            })
            break;
          } 
        }
      }

      console.log('The data in the disconnect is', data)
      console.log('a user has disconnected from the namespace', ID);
    });
  });
}

// ajax request to db
const getChallenge = () => {
  return axios.get('http://localhost:3000/api/challenge')
  .then((resp) => {
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
  const pair1 = queue.shift()
  const pair2 = queue.shift()
  
  createNamespace(pairID, io, pair1, pair2);


  notifyPair(io, pair1, pair2, pairID)
  console.log('queue after:', queue)
}

const setPairingListeners = (io) => {
  io.on('connection', function(socket){
    socket.on('message', function(obj){
      //Return out of function if the client ID is empty
      if (!obj.clientID) {return;}
      console.log('Entire object in message sent request', obj)
      
      
      if ( obj.currentGameType === 'Battle') {
        //If the user has not been queued, then queue them
        if (!queueIDList[obj.clientID]){
          queue.push(obj.clientID);
          queueIDList[obj.clientID] = true;
        }

        console.log('queue before:', queue)
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


