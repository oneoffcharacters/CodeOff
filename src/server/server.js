const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes')
const pairingService = require('./pairingService')

//Middleware
app.use(morgan('dev'));
app.use(express.static('src/client'));
app.use(bodyParser.urlencoded({ extended: true }))

//Create the server and the socket connection
const server = app.listen(3000, () => console.log('App listening on port 3000'))
const io = require('socket.io')(server);

//Run the code from the editor and return the result
app.post('/api/codeOutput', (req, res) => {
	routes.codeOutput(req, res)
});

pairingService.setPairingListeners(io)

module.exports = app;