const mongoose = require('mongoose');
const Challenge = require('../models/Challenge');

exports.serveChallenge = (req, res) => {
  Challenge.findOne({name: req.params.id}).exec((err, challenge) => {
    if (err) {
      console.log(err);
    }

    if (!challenge) {
      res.status(404).send('challenge not found');
    } else {
      res.status(200).send(Challenge.findOne({name: req.params.id}));
    }

  });
};

// for when posting challenges is available
// exports.postChallenge = (req, res) => {
//   Challenge.findOne({name: req.body.name}).exec((err, challenge) => {
//     if (err) {
//       console.log(err);
//     }

//     if (challenge) {
//       res.status(409).send('Challenge name already taken!');
//     } else {

//       const newChallenege = new Challenge({
//         name: req.body.name,
//         difficulty: req.body.difficulty,
//         solutions: req.body.solutions,
//         prompt: req.body.prompt,
//         ex1: req.body.ex1,
//         ex2: req.body.ex2
//       });

//       newChallenege.save((err, challenge) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send('error saving to db! ', err);
//         } else {
//           res.status(200).send(challenge);
//         }
//       });

//     }
//   });
// };
