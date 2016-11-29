'use strict'

const Chance = require('chance')
const chance = new Chance();
const axios = require('axios');

let queueIDList = {};
let queue = [];
let namespaces = {};

const uniqueXInArray = (x, array) => {
  let arrayCopy = array.slice();
  let results = [];
  for (var i = 0; (i < x && arrayCopy.length > 0); i++) {
    const randIndex = Math.floor(Math.random() * arrayCopy.length)
    results.push(arrayCopy[randIndex])
    arrayCopy.splice(randIndex, 1);
  }
  return results
}

//Create a namespace for a socket connection for a specific ID
const createNamespace = (ID, io, ...users) => {
  console.log('created namespace for ', ID);
  var nsp = io.of('/' + ID);
  let allConnections = io.of('/' + ID).clients()
  let userList = Object.keys(allConnections.server.sockets.sockets)
  //Add the namespace to the object that will be exported
  namespaces[ID] = {
    socket: nsp
  }

  console.log('HERE ARE ALL THE CONNECTIONS, ', allConnections);

  users.forEach((userID) => {
    namespaces[ID][userID] = true;
  })

  nsp.on('connection', (socket) => {
    console.log('socket.idsocket.id', socket.id)
    console.log('Object.keys(io.sockets.sockets)', Object.keys(io.sockets.sockets))
    // Store only the two people who are participating in the game in this players prop
    // console.log('namespaces[ID].players on connection', namespaces[ID].players)
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

      const nspUsers = Object.keys(io.sockets.sockets)
      console.log('The connected users',  nspUsers)
      //Get the current list of people on NSP after disconnection
      console.log('NSP users',  nspUsers)
      // console.log('namespaces[ID].players', namespaces[ID].players)
      
      if (namespaces[ID]) {
        for (var i = 0; i < namespaces[ID].players.length; i++) {
          const player = namespaces[ID].players[i]

          for (var shortID in queueIDList) {
            if (queueIDList[shortID] === player) {
              console.log('queueIDList before', queueIDList)
              delete queueIDList[shortID];
              console.log('queueIDList after', queueIDList)
            }
          }
          
          if (nspUsers.indexOf(player) === -1) {
            console.log('namespaces before', namespaces)
            delete namespaces[ID]

            console.log('namespaces after', namespaces)
            console.log('It was a player that left')
            nsp.emit('opponent resigned', {
              client: player
            })


            return;
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
      }
      

      console.log('The data in the disconnect is', data)
      console.log('a user has disconnected from the namespace', ID);
    });
  });
}

// Currently not used in favour of returning three question objects
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

// Return three random questions from the database
const getThreeChallenges = () => {
  return axios.get('http://localhost:3000/api/challenge')
  .then((resp) => {
    const questions = uniqueXInArray(3, resp.data);
    return questions //array of question objects
  })
  .catch((err) => {
    console.log('err in getChallenge', err)
  })
}

//This will notify both of the pairs of their new opponents
const notifyPair = (io, pair1, pair2, pairID) => {
  getThreeChallenges()
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

   getThreeChallenges()
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
      console.log('The socket ID on connection of pairing listeners', socket.id)
      
      
      if ( obj.currentGameType === 'Battle') {
        //If the user has not been queued, then queue them
        if (!queueIDList[obj.clientID]){
          queue.push(obj.clientID);
          queueIDList[obj.clientID] = socket.id;
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
