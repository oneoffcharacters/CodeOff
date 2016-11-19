const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const handlers = require('./handlers')
const pairingService = require('./pairingService')
const challengeCtrl = require('../db/controllers/challengeCtrl');
const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect('mongodb://localhost/codeoff');
// TODO, CHALLENGE MODEL ISNT BEING FOUND....is it being imported correctly?

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
app.post('/api/codeOutput', handlers.codeOutput);

app.post('/api/testCode', handlers.testCode);

app.get('/api/challenge', challengeCtrl.allChallenge); // returns all challeneges
app.get('/api/challenge/:id', challengeCtrl.serveChallenge); // returns individual challenge
// app.post('/api/challenge', challengeCtrl.postChallenge); //for when posting challenge is available

pairingService.setPairingListeners(io)

module.exports = app;
