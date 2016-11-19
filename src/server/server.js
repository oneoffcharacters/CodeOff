const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const handlers = require('./handlers')
const pairingService = require('./pairingService')
const challengeCtrl = require('../db/controllers/challengeCtrl');
const port = 3000;

// ---------- MIDDLEWARE ----------
// REQUEST LOGGING
app.use(morgan('dev'));

// SERVE STATIC ASSETS
app.use(express.static('src/client'));

// BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// --------------------------------

// SERVER
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

// SOCKET CONNECTION
const io = require('socket.io')(server);

//Run the code from the editor and return the result
app.post('/api/codeOutput', handlers.codeOutput);

app.post('/api/testCode', handlers.testCode);

app.get('/api/challenge', challengeCtrl.allChallenge); // returns all challeneges
app.get('/api/challenge/:id', challengeCtrl.serveChallenge); // returns individual challenge
// app.post('/api/challenge', challengeCtrl.postChallenge); //for when posting challenge is available

pairingService.setPairingListeners(io)

module.exports = app;
