// const Challenge = require('./models/Challenge');

// const mockQuestions = [
//   {
//     'name': 'TestingQuestion',
//     'difficulty': 'Easy',
//     'solutions': 'Mock',
//     'prompt': 'This is a mock question to test the databse',
//     'ex1': 'Given mock produce mocky',
//     'ex2': 'Truly mockerinoooooo'
//   },
//   {
//     'name': 'TestingQuestion2',
//     'difficulty': 'Hard',
//     'solutions': 'No solution available',
//     'prompt': 'This is also a mock question to test the databse',
//     'ex1': 'Given mock produce mocky x2',
//     'ex2': 'so mock!'
//   }
// ];

// mockQuestions.forEach((seed, i) => {
//   Challenge.find({'name': mockQuestions[i].name} , (err, questions) => {
//     if (!err && !questions.length) {
//       Challenge.create({
//         name: questions[i].name,
//         difficulty: questions[i].difficulty,
//         solutions: questions[i].solutions,
//         prompt: questions[i].prompt,
//         ex1: questions[i].ex1,
//         ex2: questions[i].ex2,
//       });
//     }
//   });
// });
