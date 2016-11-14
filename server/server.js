const express = require('express');
const morgan = require('morgan');
const app = express();
const runCode = require('./repl').runCode
// const replRouter = require('./resources/repl/replRoutes.js');

// REQUEST LOGGING
app.use(morgan('dev'));
// app.use('/api/replservice', replRouter);

// STATIC ASSETS
app.use(express.static('client'));
app.route('/api/repl')
	.get((req, res) => {
	  res.send('Getting that REPL SERVER');
	})
	.post((req, res) => {
	  console.log('req.body', req.body);
	  runCode(req.body.code, req.path, (data) => {
	    console.log('data', data);
	    if (!res.headerSent) {
	      res.send(data);
	    }
	  });
	});
	  


// ROUTING

app.listen(3000, () => console.log('App listening on port 3000'))
