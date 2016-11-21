const Challenge = require('./models/Challenge');

const mockQuestions = [
  {
    'title': 'Max Number',
    'functionName': 'maxNumber',
    'difficulty': 'Hard',
    'solutions': 'function maxNumber (first, second) {return Math.max(first, second)}',
    'prompt': 'Create a function maxNumber that will return the max of two numbers',
    // 'templateFunction': 'module.exports = false;',
    'templateFunction': 'function maxNumber (first, second) { \n return Math.max(first, second)\n } \n\
    module.exports = maxNumber;',
    'examples': ['maxNumber(3,4) \n>4', 'maxNumber(-1,0) \n>0'],
    'test': 'const expect = require("chai").expect; describe("test", () => { it("should be true", () => { expect(attempt(3,4)).to.equal(solution(3,4)) }) })'
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

