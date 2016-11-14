const express = require('express');
const morgan = require('morgan');
const app = express();
const runCode = require('./repl').runCode
const bodyParser = require('body-parser')
// const replRouter = require('./resources/repl/replRoutes.js');

// REQUEST LOGGING
app.use(morgan('dev'));
// app.use('/api/replservice', replRouter);

// STATIC ASSETS
app.use(express.static('client'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/repl', (req, res) => {
	//Convert the request body into the format that the REPL will accept
	  const request = JSON.parse(Object.keys(req.body)[0])
	  const code = request.code
	  
	  runCode(code, req.path, (data) => {
	    if (!res.headerSent) {
	    	const responseBody = {}

	    	const consoleText = data
	    	responseBody.consoleText = consoleText
	    	console.log('The code about to be sent is', JSON.stringify(responseBody))
	      res.send(JSON.stringify(responseBody));
	    }
	  });
	});



app.listen(3000, () => console.log('App listening on port 3000'))
