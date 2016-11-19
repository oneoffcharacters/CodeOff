const repl = require('repl');
const stream = require('stream');
const replService = require('./replService')
const testingService = require('./testingService')

var assert = require('assert');

module.exports = {
  codeOutput: (req, res) => {
    console.log('req.body', req.body)
    
    //Hande no valid code
    if (!req.body.code) {
      return res.status(400).send('No code was submitted');
    }

    replService.runCode(req.body.code, req.path, (data) => {
      const replResponse = {}

      //Get the output of the code and put it in an object
      const text = data
      replResponse.text = text

      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json(replResponse);
    });
  },
  testCode: (req, res) => {
    console.log('Test result route')
  }
};