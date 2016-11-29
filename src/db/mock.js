const Challenge = require('./models/Challenge');

const mockQuestions = [
  {
    'title': 'Max Number',
    'functionName': 'maxNumber',
    'difficulty': 'Easy',
    'solutions': 'function maxNumber (first, second) {return Math.max(first, second)}; module.exports = maxNumber',
    'prompt': 'Create a function maxNumber that will return the max of two numbers',
    'templateFunction': 'function maxNumber (first, second) { \n return Math.max(first, second)\n } ',
    'examples': ['maxNumber(3,4) = 4', 'maxNumber(-1,-3) = -1'],
    'test': 'const expect = require("chai").expect; \
      describe("test", () => { \
        it("should return the max number for positives", () => { expect(attempt(2, 3)).to.equal(solution(2,3)) }); \
        it("should return the max number for negatives", () => { expect(attempt(-3, -1)).to.equal(solution(-3,-1)) }); \
        it("should return the max number for positives & negatives", () => { expect(attempt(-1, 1)).to.equal(solution(-1,1)) }); \
      })'
  },
  {
    'title': 'Min Number',
    'functionName': 'minNumber',
    'difficulty': 'Easy',
    'solutions': 'function minNumber (first, second) {return Math.min(first, second)}; module.exports = minNumber',
    'prompt': 'Create a function minNumber that will return the min of two numbers',
    'templateFunction': 'function minNumber (first, second) { \n return Math.min(first, second)\n } ',
    'examples': ['minNumber(3,4) = 3', 'minNumber(-1,-3) = -3'],
    'test': 'const expect = require("chai").expect; \
      describe("test", () => { \
        it("should return the min number for positives", () => { expect(attempt(2, 3)).to.equal(solution(2,3)) }); \
        it("should return the min number for negatives", () => { expect(attempt(-3, -1)).to.equal(solution(-3,-1)) }); \
        it("should return the min number for positives & negatives", () => { expect(attempt(-1, 1)).to.equal(solution(-1,1)) }); \
      })'
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

