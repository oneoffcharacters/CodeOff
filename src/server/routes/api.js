'use strict'

// Packages
const router = require('express').Router();
const handlers = require('./handlers');
const axios = require('axios');
let namespaces = require('../helpers/pairing').namespaces
// Modules
const challengeCtrl = require('../../db/controllers/challenge');
// Env variables
const testServiceURL = 'http://localhost:3001/api/test';

// Run the code from the editor and return the result
router.post('/codeOutput', handlers.codeOutput);
// router.post('/testCode', handlers.testCode);

// Returns a random challenge, used to provide client with random challenge
router.get('/challenge', challengeCtrl.allChallenge); // returns all challeneges
router.post('/challenge',  challengeCtrl.addChallenge);

// router.get('/challenge/:id', challengeCtrl.serveChallenge); // returns individual challenge
// router.post('/api/challenge', challengeCtrl.postChallenge); //for when posting challenge is available

router.post('/mocha', (req, res) => {
  // use req.body.qId -> query database for the challenge attempted
  console.log('req.body', req.body)
  challengeCtrl.findChallenge(req.body.challengeID)
    .then((challenge) => {
      console.log('challenge', req.body)
      
      return axios.post(testServiceURL, {
        "attempt": req.body.code,
        "solution": challenge.solutions,
        "test": challenge.test
      })
        .then(resp => {
        console.log('AXIOS RESPONSE', resp.data.data);
        const data = JSON.parse(resp.data.data)
        //TODO: Add check to see if they passed all test cases
        console.log('comparison', data.stats.passes,data.stats.tests)
        if (data.stats.passes === data.stats.tests) {
          namespaces[req.body.pairID].socket.emit('game won', {client: req.body.clientID})
        }
        res.status(200).json(resp.data);
        })
        .catch(err => {
        console.error(err);
        })
    })
});

// eventually we will want Object.keys(namespaces)
router.get('/lobbies', (req, res) => {
  res.json(Object.keys(namespaces))
});

module.exports = router;