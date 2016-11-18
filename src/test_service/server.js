const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser')
const exec = require('child_process').exec
const port = 3000;
const mock = require('mock-fs');
const code = 'describe("test", () => {expect(true).to.be(true)})';
const fs = require('fs')


// REQUEST LOGGING
app.use(morgan('dev'));

var testCode = (challenge, callback) => {
  exec(`mocha --reporter json ${challenge}`, (error, stdout, stderr) => {
    if(error) {
      console.error(error)
    } else {
      callback(stderr, stdout)
    }
  })
}

app.get('/', (req, res) => {
  testCode((err, data) => {
    res.status(200)
    res.send(data);
  })
})

app.listen(3000, () => {
  console.log(`Testing service running on port ${port}`);
})
