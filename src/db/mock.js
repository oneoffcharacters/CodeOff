const mongoose = require('mongoose');
const Challenge = require('./models/Challenge');
const db = mongoose.connect('mongodb://localhost/codeoff');
const mockQuestions = [
  {
    'title': 'Max Prime Number',
    'functionName': 'maxPrimeNumber',
    'difficulty': 'Hard',
    'solutions': 'function maxNumber(first, second) { return Math.max(first, second)}',
    'prompt': 'Create a function maxNumber that will return the max of two numbers',
    'templateFunction': 'function(first, second) { \n\n }',
    'examples': ['Given mock produce mocky x2', 'so mock!']
  }
];

mockQuestions.forEach((seed, i) => {
	console.log(seed)
  Challenge.find({'title': seed.title} , (err, questions) => {
    if (!err && !questions.length) {
    	const newChallenge = new Challenge(seed)
    	newChallenge.save((err, data) => {
    		console.log(err, data);
    	})
  //     Challenge.create({
  //       title: seed.title,
  //       functionName: seed.functionName,
  //       difficulty: seed.difficulty,
  //       solutions: seed.solutions,
  //       prompt: seed.prompt,
		// templateFunction: seed.templateFunction,
  //       examples: seed.examples
  //     }, ((err, data) => {
  //     	console.log('err', err)
  //     	console.log('data', data)
  //     }));
    }
  });
});

// db.disconnect();