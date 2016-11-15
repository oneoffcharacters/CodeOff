const express = require('express');
const morgan = require('morgan');
const app = express();
const runCode = require('./repl').runCode
const bodyParser = require('body-parser')

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

io.on('connection', (socket) => {
  console.log('a user connected');
 
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


