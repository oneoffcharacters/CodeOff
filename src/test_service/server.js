// Packages
const bodyParser = require('body-parser')
const exec = require('child_process').exec
const Promise = require('bluebird');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const tmp = require('tmp');
const fs = require('fs');
// Env variables
const app = express();
const port = 3001;
// const test = 'const expect = require("chai").expect; describe("test", () => { it("should be true", () => { expect(true).to.be.true }) })';
const test = 'require("chai").expect; describe("test", () => { it("should be true", () => { expect(attempt).to.be(solution) }) })' 

Promise.promisifyAll(fs);

// Install mocha and chai in temp directory
var findTemp = tmp.fileSync({prefix: 'find', keep: true});
var tempPath = path.parse(findTemp.name).dir
findTemp.removeCallback();
exec(`cd ${tempPath} && npm install mocha chai`, (error, stdout, stderr) => {
  if(error) {
    console.error(error)
  } else {
    console.log(stderr, stdout)
  }
})

// Run mocha on given testpath
const runMocha = (testPath, callback) => {
  exec(`mocha --reporter json ${testPath}`, (error, stdout, stderr) => {
    if(error) {
      console.error(error)
    } else {
      callback(stderr, stdout)
    }
  })
}

app.get('/api/test', (req, res) => {
    res.status(200)
})

app.post('/api/test', (req, res) => {
  console.log('INSIDE OF POST');
  console.log(test)
  console.log(req)

  // Assign code to variables
  var attempt = req.body.attempt;
  var solution = req.body.solution;
  // test = req.body.test;

  // Create temp files
  var attemptFile = tmp.fileSync({prefix: 'attempt-', postfix: '.js', keep: true});
  var solutionFile = tmp.fileSync({prefix: 'solution-', postfix: '.js', keep: true});
  var testFile = tmp.fileSync({prefix: 'test-', postfix: '.spec.js', keep: true});

  // Derive file bases from parsed temp files
  var solutionFileBase = path.parse(solutionFile.name).base;
  var attemptFileBase = path.parse(attemptFile.name).base;

  // Import with file bases
  console.log('TESTING', test);
  test = (`var solution = require('./${solutionFileBase}');`).concat(test);
  test = (`var attempt = require('./${attemptFileBase}');`).concat(test);
	console.log(test);

  // Write temp files
  fs.writeFileSync(attemptFile.name, attempt)
  fs.writeFileSync(solutionFile.name, solution)
  fs.writeFileSync(testFile.name, test)

  runMocha(testFile.name, (err, data) => {
    // Send err and data from mocha
    res.status(200).json({
      err: err,
      data: data,
    });

    // Remove temp files
    testFile.removeCallback();
    solutionFile.removeCallback();
    attemptFile.removeCallback();
  });
})

// REQUEST LOGGING
app.use(morgan('dev'));

// BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json());

// SERVER
app.listen(port, () => {
  console.log(`Testing Service listening on port ${port}`);
})

module.exports = app;
