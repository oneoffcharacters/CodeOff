const express = require('express');
const morgan = require('morgan');
const app = express();
// const replRouter = require('./resources/repl/replRoutes.js');

// REQUEST LOGGING
app.use(morgan('dev'));
// app.use('/api/replservice', replRouter);

// STATIC ASSETS
app.use(express.static('client'));

// ROUTING

app.listen(3000, () => console.log('App listening on port 3000'))
