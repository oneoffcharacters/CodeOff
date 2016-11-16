const repl = require('repl');
const stream = require('stream');
const replService = require('./replService')


module.exports = {
  codeOutput: (req, res) => {
    console.log('req.body', req.body)
    
    //Hande no valid code
    if (!req.body.code) {
      return res.status(400).send('No code was submitted');
    }

    replService.runCode(req.body.code, req.path, (data) => {
      const responseBody = {}

      //Get the output of the code and put it in an object
      const consoleText = data
      responseBody.consoleText = consoleText

      //Double stringify because one didn't work
      const stringBody =  JSON.stringify(responseBody)
      return res.status(200).send(stringBody);
    });
  }
};