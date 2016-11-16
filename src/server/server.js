const express = require('express');
const morgan = require('morgan');
const app = express();
const runCode = require('./repl').runCode
const bodyParser = require('body-parser');
const Chance = require('chance')
const chance = new Chance();




// const util = require('util')
// REQUEST LOGGING
app.use(morgan('dev'));

// STATIC ASSETS
app.use(express.static('src/client'));
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = app.listen(3000, () => console.log('App listening on port 3000'))
const io = require('socket.io')(server);

app.post('/api/repl', (req, res) => {
	runCode(req.body.code, req.path, (data) => {
		if (!res.headerSent) {
			const responseBody = {}

			const consoleText = data
			responseBody.consoleText = consoleText

			const strinfgBody =  JSON.stringify(JSON.stringify(responseBody))
			res.send(JSON.stringify(responseBody));
		}
	});
});

const createNamespace = (userID, io) => {
	console.log('created namespace for ', userID);
	var nsp = io.of('/' + userID);
	nsp.on('connection', (socket) => {
		console.log('a user has connected to the namespace', path);

		socket.on('disconnect', () => {
			console.log('a user has disconnected from the namespace');
		});
	});
};

function setPairingListeners (io) {
	let active_cache = {};
	let waiting_queue = [];

  io.on('connection', function(socket){
    socket.on('message', function(obj){
    	if (!obj.clientID) {return;}
    	console.log('The object being recieved from message event is',  obj)
      if (!active_cache[obj.clientID]){
        waiting_queue.push(obj.clientID);
        active_cache[obj.clientID] = true;
      }
      console.log('People in the queue:', waiting_queue.length)
      console.log('queue:', waiting_queue)
      if (waiting_queue.length > 1){
        var pairID = chance.string({length:5, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
        // waiting_queue.push(pairID);
        createNamespace(pairID, io);
        console.log('waiting_queue', waiting_queue)
        console.log('pairID', pairID)
        const pair1 = waiting_queue.shift()
        const pair2 = waiting_queue.shift()

        io.emit(pair1, {
        	type: 'init',
        	pairID: pairID,
        	opponentID: pair2
        });
        io.emit(pair2, {
        	type: 'init',
        	pairID: pairID,
        	opponentID: pair1
        });
        console.log('waiting_queue', waiting_queue)
      }
    });
  });
}

setPairingListeners(io)

module.exports = app;