const express = require('express');
const morgan = require('morgan');
const app = express();
const runCode = require('./repl').runCode
const bodyParser = require('body-parser')
// const replRouter = require('./resources/repl/replRoutes.js');

// REQUEST LOGGING
// app.use(morgan('dev'));
// app.use('/api/replservice', replRouter);

// STATIC ASSETS
app.use(express.static('client'));
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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



app.listen(3000, () => console.log('App listening on port 3000'))
