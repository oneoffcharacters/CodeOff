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
var cached = {}, ukey = '';

app.post('/api/enqueue',  (req, res) => {
	const createNamespace = (path, io) => {
		console.log('created namespace');
		var nsp = io.of(path);
		nsp.on('connection', (socket) => {
			console.log('a user has connected to the namespace', path);

			socket.on('win', (message) => {
				nsp.emit('lost', message);
			});

			socket.on('disconnect', () => {
				console.log('a user has disconnected from the namespace');
			});
		});
	}

	ukey = '/' + chance.string({length:5, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
	enqueue(ukey, io);
	cached[ukey] = ukey;
	res.send(ukey);
})

function setPairingListeners (io) {
  var context = this;
  io.on('connection', function(socket){
    socket.on('message', function(obj){
      if (!active_cache[obj.client_id]){
        waiting_queue.push(obj.client_id);
        active_cache[obj.client_id] = true;
        console.log(waiting_queue.length);
      }
      if (waiting_queue.length > 1){
        var ukey = '/' + chance.string({length:5, pool:'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
        addToCached(ukey);
        context.create_namespace(ukey, io, 'pair');
        io.emit(waiting_queue.shift(), {namespace:ukey});
        io.emit(waiting_queue.shift(), {namespace:ukey});
      }
    });
  });
}

const queue = [];
io.on('connection', (socket) => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});

module.exports = app;