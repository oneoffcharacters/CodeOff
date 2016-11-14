const express = require('express');
const app = express();
const repl = require('./repl')

// const replRouter = require('./resources/repl/replRoutes.js');

app.post('/api/runCode', (req, res) => {repl.runCode});
app.get('/api/runCode', (req, res) => {console.log(req)})

app.get('/*', (req, res) => {
	console.log('Missed the get')
	res.status(200).send('Missed the get')
	})

app.listen(3001, () => console.log('REPL App listening on port 3001'))
