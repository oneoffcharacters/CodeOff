const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes')
const pairingService = require('./pairingService')
const challengeCtrl = require('../db/controllers/challengeCtrl');
const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect('mongodb://localhost/codeoff/challenge');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Mongoose connection is on ');
});

//Middleware
app.use(morgan('dev'));
app.use(express.static('src/client'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Create the server and the socket connection
const server = app.listen(3000, () => console.log('App listening on port 3000'))
const io = require('socket.io')(server);

//Run the code from the editor and return the result
app.post('/api/codeOutput', (req, res) => {
	routes.codeOutput(req, res)
});

app.post('/api/testCode', (req, res) => {
	routes.testCode(req, res)
});

app.get('/api/challenge', challengeCtrl.serveChallenge);
// app.post('/api/challenge', challengeCtrl.postChallenge); //for when posting challenge is available

pairingService.setPairingListeners(io)

module.exports = app;