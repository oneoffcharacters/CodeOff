const express = require('express');
const morgan = require('morgan');
const app = express();

// REQUEST LOGGING
app.use(morgan('dev'));

// STATIC ASSETS
app.use(express.static('client'));

// ROUTING

app.listen(3000, () => console.log('App listening on port 3000'))
