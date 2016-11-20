// Packages
const router = require('express').Router();
const handlers = require('./handlers');
const axios = require('axios');
// Modules
const challengeCtrl = require('../../db/controllers/challengeCtrl');
// Env variables
const testServiceURL = 'http://localhost:3001/api/test';

//Run the code from the editor and return the result
router.post('/codeOutput', handlers.codeOutput);
router.post('/testCode', handlers.testCode);

router.get('/challenge', challengeCtrl.allChallenge); // returns all challeneges
router.get('/challenge/:id', challengeCtrl.serveChallenge); // returns individual challenge
// router.post('/api/challenge', challengeCtrl.postChallenge); //for when posting challenge is available

router.post('/mocha', (req, res) => {
  // use req.body.qId -> query database for the challenge attempted
  console.log('REQUEST BODY ',typeof req.body);
  challengeCtrl.findChallenge(req.body.challengeID)
    .then(challenge => {
      console.log('THIS IS THE CHALLENGE TYPE ', typeof challenge);
      console.log('THIS IS THE CHALLENGE', challenge);
      
      return axios.post(testServiceURL, {
        "attempt": req.body.code,
        "solution": challenge.solutions,
        "test": challenge.test
      })
        .then(resp => {
        console.log('AXIOS RESPONSE', resp);
        })
        .catch(err => {
        console.error(err);
        })
    })

});

module.exports = router;
