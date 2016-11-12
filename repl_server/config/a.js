
// Running Code in REPL
const repl = require('repl');
const net = require('net');
const stream = require('stream');

var connections = 0;

module.exports = {
  /**
    * @name runCode
    * @desc Runs the javascript code in a REPL instance, requested from POST to api
    * @param {code, callback} code is the request javascript code, callback returns the output data
    * @returns {nothing}
    */
  runCode: (code, callback) => {

    // net.createServer((socket) => {
    //   connections += 1;
    //   repl.start({
    //     prompt: 'Node.js via TCP socket> ',
    //     input: socket,
    //     output: socket
    //   }).on('exit', () => {
    //     socket.end();
    //   });
    // }).listen(5001, () => {
    //   console.log('TCP server listening on 5001');
    // });

    /**
      * @name input
      * @desc Push to-be-evaluated code to readable stream, ready by REPL.
      */
    var input = new stream.Readable();
    input._read = function noop() {
      input.push(code);
      input.push(null);
    };

    /**
      * @name output
      * @desc Writable stream written by REPL while evaluating input code.
      */
    var output = new stream.Writable();
    var data = '';
    output._write = function noop(chunk, encoding, callback) {
        data += chunk;
        callback();
    };

    /**
      * @name repl.start
      * @desc Sends a Readable stream to the repl server and outputs a writeable stream after eval
      * @param {input, output} readable and writable streams
      * @returns {nothing}
      */
    var server = repl.start({input: input, output:output});

    // Returns data to the callback once REPL is done with code
    server.on('exit', () => {
      console.log('Received "exit" event from repl!');
      callback(data);
    });
  }
};