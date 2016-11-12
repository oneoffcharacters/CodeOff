// Running Code in REPL
const repl = require('repl');
const net = require('net');
const stream = require('stream');
const util = require('util');
const vm = require('vm');

var connections = 0;

module.exports = {
  /**
    * @name runCode
    * @desc Runs the javascript code in a REPL instance, requested from POST to api
    * @param {code, callback} code is the request javascript code, callback returns the output data
    * @returns {nothing}
    */
  runCode: (code, path, callback) => {

    var done = false;
    //sanitize the repl input
    var codeSanitized = code.split('\n').map((section) => {
      var trimmed = section.trim();
      var firstChar = trimmed.charAt(0);
      if (firstChar === '.') {
        return trimmed.slice(1);
      }
      return section;
    }).join('\n');

    console.log('code sant', codeSanitized);

    /**
      * @name input
      * @desc Push to-be-evaluated code to readable stream, ready by REPL.
      */
    var input = new stream.Readable();
    input._read = function noop() {
      input.push(codeSanitized);
      input.push(null);
    };

    /**
      * @name output
      * @desc Writable stream written by REPL while evaluating input code.
      */
    var output = new stream.Writable();
    var data = '';
    output._write = function noop(chunk, encoding, callback) { // why is it called NOOP?
        data += chunk;
        callback();
    };

    var outputChange = function(line) {
      return line;
    };

    var inputChange = function (cmd, context, filename, callback) {
      // console.log(cmd, filename);
      // var result;
      // var first = cmd.slice(0,1);
      // if (first === '*' || first === '/') {

      // } else {
      //   result = cmd;
      // }
      // callback(null, result);
    };
    /**
      * @name repl.start
      * @desc Sends a Readable stream to the repl server and outputs a writeable stream after eval
      * @param {input, output} readable and writable streams
      * @returns {nothing}
      */
      var server = repl.start({input: input, output:output, terminal: false, ignoreUndefined: true});
      server.on('exit', () => {
        console.log('Received "exit" event from repl!');
        data = data.replace(/(\.)+/g, '');
        data = data.replace(/( \>)+/g, "> ");
        callback(data);
      });

    // var server;
    // var thing;
    // var error = false;

    // setTimeout(() => {
    //   console.log('stuck');
    //   callback('Program exceeded time limit of 3000ms!');
    //   error = true;
    // }, 1000);

    // try {
    //   thing = vm.runInThisContext(codeSanitized);
    // } finally {
    //     console.log(thing);
    //     clearTimeout(time);

    //       error = false;
    // }

    // function initializeContext(context, path) {
    //   _.extend(context, cache[path]);
    // };

    // Returns data to the callback once REPL is done with code
    // Will not respond with data to client-side if callback is removed.


    // initializeContext(server.context, path);
    // server.on('reset', initializeContext);
  }
};


