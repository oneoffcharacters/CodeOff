// Packages
const CLIEngine = require('eslint').CLIEngine;
const exec = require('child_process').exec
const Promise = require('bluebird');
const path = require('path');
const tmp = require('tmp');
const fs = require('fs');
// Env variables
const CLIEngineOptions = {
      envs: ["browser", "mocha"],
      useEslintrc: false,
      rules: {
          semi: 2
      }
  }

// Promise.promisifyAll(fs);

exports.installTmpDependencies = () => {
  // test taking out options in fileSync
  var tmpPath = tmp.fileSync({prefix: 'find', keep: true});
  tmpPath.removeCallback();
  var tmpDirPath = path.parse(tmpPath.name).dir
  var dependenciesPath = path.join(tmpDirPath, 'node_modules');
  var dependenciesExist = fs.existsSync(`${dependenciesPath}/mocha`) && fs.existsSync(`${dependenciesPath}/chai`)
  if(!dependenciesExist) {
    console.log('Installing mocha and chai in temp directory...');
    exec(`cd ${tmpDirPath} && npm install mocha chai`, (error, stdout, stderr) => {
      if(error) {
        console.error(error);
        console.log('Failed to install mocha and chai');
      } else {
        console.log(stdout);
        console.log('Installed mocha and chai successfully');
      }
    })
  };
};

// Run mocha on given filepath
const mochaOnFile = (filePath, callback) => {
  exec(`mocha --reporter json ${filePath}`, (error, stdout, stderr) => {
    // errors occur for failed tests, commenting out error handling prevents this
    // if(error) {
    //   console.error(error)
    // } else {
      callback(stderr, stdout)
    // }
  })
}

// How should inputs be formatted?
// Solution should allow as many file inputs as user wants
// One file must be the test file to which all others are imported / required in test file
// {
// attempt:
// solution:
// test:
// }
exports.mochaOnText = (text, callback) => {
  var testRequirements = '';
  console.log('JUST ENTERED MOCHAONTEXT');

  // Error reporting
  typeof text === 'object' || console.error('Typeof text must be object');
  text.hasOwnProperty('test') || console.error('Text must have property called test');

  // Create temp directory
  var temp = tmp.dirSync({prefix: '/test-', unsafeCleanup: true});
  var tempDir = path.parse(temp.name).base;
  
  var testFile = tmp.fileSync({prefix: `/${tempDir}/test-`, postfix: '.spec.js', keep: true});
  var textTest = text.test;
  delete text.test;
  
  // Create temp files
  for(prop in text) {
    var file = tmp.fileSync({prefix: `/${tempDir}/${prop}-`, postfix: '.js', keep: true});
    var fileBase = path.parse(file.name).base;
    testRequirements += `var ${prop} = require("./${fileBase}");\n`;
    // Write temp files
    fs.writeFileSync(file.name, text[prop]);
  };

  fs.appendFileSync(testFile.name, testRequirements);
  fs.appendFileSync(testFile.name, textTest);
  console.log('temp', temp);

  mochaOnFile(testFile.name, (err, data) => {
    callback(err, data);
    // Remove temp files
    temp.removeCallback();
  })
};

exports.eslintOnText = (text, fileName) => {
  var cli = new CLIEngine(CLIEngineOptions);

  return cli.executeOnText(text, fileName);
};
