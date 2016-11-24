// Packages
const bodyParser = require('body-parser')
const express = require('express');
const morgan = require('morgan');
// Modules
const utils = require('./utils');
// Env variables
const app = express();
const port = 3001;


// ---------- MIDDLEWARE ----------
// REQUEST LOGGING
app.use(morgan('dev'));

// BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// --------------------------------

// Install mocha and chai in temp directory
utils.installTmpDependencies();

app.get('/api/test', (req, res) => {
    res.status(200)
})

app.post('/api/test', (req, res) => {
  // Assign req code to text object to run with mocha
  var text = {
    attempt: req.body.attempt,
    solution: req.body.solution,
    test: req.body.test
  };

  console.log('REQUEST RECEIVED');
  utils.mochaOnText(text, (err, data) => {
    // Send err and data from mocha
    res.status(200).json({
      err: err,
      data: data,
      eslint: utils.eslintOnText(text.attempt, 'attempt.js'),
    });
  })
})

// SERVER
app.listen(port, () => {
  console.log(`Testing Service listening on port ${port}`);
})

module.exports = app;
