// Packages
const router = require('express').Router();
const handlers = require('./handlers');
// Modules
const challengeCtrl = require('../../db/controllers/challengeCtrl');

//Run the code from the editor and return the result
router.post('/codeOutput', handlers.codeOutput);
router.post('/testCode', handlers.testCode);

router.get('/challenge', challengeCtrl.allChallenge); // returns all challeneges
router.get('/challenge/:id', challengeCtrl.serveChallenge); // returns individual challenge
// router.post('/api/challenge', challengeCtrl.postChallenge); //for when posting challenge is available

module.exports = router;
