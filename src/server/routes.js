const repl = require('repl');
const stream = require('stream');
const replService = require('./repl')

module.exports = {
  codeOutput: (req, res) => {
    replService.runCode(req.body.code, req.path, (data) => {
      const responseBody = {}

      //Get the output of the code and put it in an object
      const consoleText = data
      responseBody.consoleText = consoleText

      //Double stringify because one didn't work
      const strinfgBody =  JSON.stringify(JSON.stringify(responseBody))
      res.send(JSON.stringify(responseBody));
    });
  }
};