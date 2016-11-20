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

// const testTruth = 'const expect = require("chai").expect; describe("test", () => { it("should be true", () => { expect(true).to.be.true }) })';
const testAttempt = 'const expect = require("chai").expect; describe("test", () => { it("should be true", () => { expect(attempt).to.equal(solution) }) })' 

Promise.promisifyAll(fs);

// ---------- MIDDLEWARE ----------
// REQUEST LOGGING
app.use(morgan('dev'));

// BODY PARSING
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// --------------------------------

// Install mocha and chai in temp directory
var findTemp = tmp.fileSync({prefix: 'find', keep: true});
findTemp.removeCallback();
var tempPath = path.parse(findTemp.name).dir
var depPath = path.join(tempPath, 'node_modules');
var dependenciesExist = fs.existsSync(`${depPath}/mocha`) && fs.existsSync(`${depPath}/chai`)
if(!dependenciesExist) {
  console.log('Installing mocha and chai in temp directory...');
  exec(`cd ${tempPath} && npm install mocha chai`, (error, stdout, stderr) => {
    if(error) {
      console.error(error);
      console.log('Failed to install mocha and chai');
    } else {
      console.log(stdout);
      console.log('Installed mocha and chai successfully');
      // console.log(stderr);
    }
  })
};

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
  console.log('REQUEST BODY', req.body);
  // Assign code to variables
  var attempt = req.body.attempt;
  var solution = req.body.solution;
  var test = req.body.test;

  // Create temp files
  var attemptFile = tmp.fileSync({prefix: 'attempt-', postfix: '.js', keep: true});
  var solutionFile = tmp.fileSync({prefix: 'solution-', postfix: '.js', keep: true});
  var testFile = tmp.fileSync({prefix: 'test-', postfix: '.spec.js', keep: true});

  // Derive file bases from parsed temp files
  var solutionFileBase = path.parse(solutionFile.name).base;
  var attemptFileBase = path.parse(attemptFile.name).base;

  // Import attempt and solution with file bases
  var requireChallengeFiles = `var solution = require("./${solutionFileBase}"); var attempt = require("./${attemptFileBase}");`
  test = requireChallengeFiles.concat(test);

  console.log('ATTEMPT', attempt);
  console.log('SOLUTION', solution);
  console.log('TEST', test);

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

// SERVER
app.listen(port, () => {
  console.log(`Testing Service listening on port ${port}`);
})

module.exports = app;
