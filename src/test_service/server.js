const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser')

// REQUEST LOGGING
app.use(morgan('dev'));

app.post('/api/test', (req, res) => {

})
