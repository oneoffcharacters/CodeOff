// Running Code in REPL
const repl = require('repl');
const stream = require('stream');


module.exports = {
  runCode: (code, path, callback) => {

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

  }
};