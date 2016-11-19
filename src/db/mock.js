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
  Challenge.find({'title': seed.title} , (err, questions) => {
    if (!err && !questions.length) {
    	const newChallenge = new Challenge(seed)
    	newChallenge.save((err, data) => {
    		if (err) {console.log('Error in writing mock files', err)};
    	})
    }
  });
});

// db.disconnect();