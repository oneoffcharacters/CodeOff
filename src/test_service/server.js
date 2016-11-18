const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser')
const exec = require('child_process').exec
const port = 3000;
const path = require('path');
// const mock = require('mock-fs');
// const code = 'describe("test", () => {expect(true).to.be(true)})';
const fs = require('fs')
Promise.promisifyAll(fs);

// REQUEST LOGGING
app.use(morgan('dev'));

// BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

var testCode = (challengePath, callback) => {
  exec(`mocha --reporter json ${challengePath}`, (error, stdout, stderr) => {
    if(error) {
      console.error(error)
    } else {
      callback(stderr, stdout)
    }
  })
}

/*
 * req.body
 *    .challengeName should be a string
 *    .user should be a string
 */

app.get('/api/test', (req, res) => {
  var attemptPath = path.join(__dirname, 'user_attempts', req.body.user, `${req.body.challengeName}.js`);
  // write user code to file
  fs.writeFileAsync(attemptPath, req.body.userCode)
    .then((data) => {
      var solutionPath = path.join
      // write result code to file
      fs.writeFileAsync();
    });
      // write exports to testfile
  var challengePath = path.join(__dirname, 'challenge_tests', `${req.body.challengeName}.spec.js`);
  testCode(challengePath, (err, data) => {
    res.status(200)
    res.send(data);
  })
})

app.listen(3000, () => {
  console.log(`Testing Service running on port ${port}`);
})
