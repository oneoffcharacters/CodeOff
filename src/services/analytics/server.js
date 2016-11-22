// Packages
const bodyParser = require('body-parser')
// const exec = require('child_process').exec
const Promise = require('bluebird');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const tmp = require('tmp');
const fs = require('fs');
// Env variables
const app = express();
const port = 3002;

Promise.promisifyAll(fs);

// ---------- MIDDLEWARE ----------
// REQUEST LOGGING
app.use(morgan('dev'));

// BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// --------------------------------

// best of n style game
  // passing test cases displayed to user
// o benchmarking
// o time to completion
// o linting /readability
// x brevity (lines of code)
// modularity (problem depends on using solution later in code, deduct points if
// user reworks previous soluton
// no universal code scoring / no leaderboard

// SERVER
app.listen(port, () => {
  console.log(`Analytics Service listening on port ${port}`);
})

module.exports = app;
