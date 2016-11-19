// Packages
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
// Modules
const pairingService = require('./pairingService')
const apiRouter = require('./routes/api.js');
// Env variables
const app = express();
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

// ------------ ROUTES ------------
app.use('/api', apiRouter);
// --------------------------------

// SERVER
const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})

// SOCKET CONNECTION
const io = require('socket.io')(server);
pairingService.setPairingListeners(io)

module.exports = app;
