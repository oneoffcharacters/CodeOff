const repl = require('repl');
const stream = require('stream');

module.exports = {
  runCode: (code, path, callback) => {

    //Clear the white space from every line
    var codeSanitized = code.split('\n').map((section) => {
      var trimmed = section.trim();
      var firstChar = trimmed.charAt(0);
      if (firstChar === '.') {
        return trimmed.slice(1);
      }
      return section;
    }).join('\n');

    //Convert the input string into a readable stream for use of the REPL module
    var input = new stream.Readable();
    input._read = function noop() {
      input.push(codeSanitized);
      input.push(null);
    };

    //Prepare a writeable stream for the REPL to write the result to
    var output = new stream.Writable();
    var data = '';
    output._write = function noop(chunk, encoding, callback) {
      data += chunk;
      callback();
    };

    //Evaluate the code and run the callback on the result
    var server = repl.start({input: input, output:output, terminal: false, ignoreUndefined: true});
    server.on('exit', () => {
      data = data.replace(/(\.)+/g, '');
      data = data.slice(2)
      console.log('Data after running', data)
      callback(data);
    });
  }
};