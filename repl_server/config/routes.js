// Routes received by the server
var runCode = require('./repl.js').runCode;

module.exports = (app) => {

  /**
    * @name /api/repl
    * @desc Creates a new REPL instance or runs request javascript code.
    *       Sends back the output of the code to the user.
    * @param {req, res} the request and response for calls
    * @returns {nothing}
    */
  app.route('/api/repl')
    .get((req, res) => {
      res.send('Getting that REPL SERVER');
    })
    .post((req, res) => {
      console.log(req.body);
      runCode(req.body.code, req.path, (data) => {
        console.log('data', data);
        if (!res.headerSent) {
          res.send(data);
        }
      });
    });
};
