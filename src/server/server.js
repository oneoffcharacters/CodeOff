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

// const waiting_queue = [];
// const active_cache = {};
// var cached = {}, ukey = '';

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
let activeUsers = {}
app.get('/api/enqueue',  (req, res) => {
	userID = chance.string({length:5, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
	// createNamespace(userID, io);
	activeUsers[userID] = true;
	res.send(userID);
})

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
        var pairedKey = chance.string({length:5, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
        // waiting_queue.push(pairedKey);
        createNamespace(pairedKey, io);
        console.log('waiting_queue', waiting_queue)
        console.log('pairedKey', pairedKey)
        io.emit(waiting_queue.shift(), {pairedKey:pairedKey});
        io.emit(waiting_queue.shift(), {pairedKey:pairedKey});
        console.log('waiting_queue', waiting_queue)
      }
    });
  });
}

setPairingListeners(io)

// const queue = [];
// io.on('connection', (socket) => {
// 	console.log('a user connected');

// 	socket.on('disconnect', () => {
// 		console.log('user disconnected');
// 	});
// });

module.exports = app;