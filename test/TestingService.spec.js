// const { expect, should } = require('chai');
// const request = require('supertest');
// const app = require('../src/test_service/server.js');
// const fs = require('fs');

// describe('Testing service server', () => {
//   describe('GET /api/test', () => {
//     it('should respond with a 200 status code', () => {
//       request(app)
//       .get('/api/test')
//       .expect(200);
//     })
//   });
//   describe('POST /api/test', () => {
//     it('should create attempt file based on given user, challengeName, and attempt', () => {
//       var attemptPath = '../src/test_service/challenge_attempts/Guy/CHALLENGE.js';
//       var attemptsData = {
//         user: 'Guy',
//         challengeName: 'CHALLENGE',
//         attemptCode: 'var attempt = function(){ return true };'
//       }
//       request(app)
//       .post('/api/test')
//       .expect(200)
//       .end(function(res){
//         console.log('HELLO FROM THE OTHERSIDE!');
//         console.log(err, res)
//       })
//       // var attemptFiles = fs.readdirSync(attemptPath);
//       // expect(attemptFiles).to.be.a(Array);
//       // expect(attemptFiles[0]).to.be('CHALLENGE.js');
//       // get rid of file after creating it
//     });
//   })
// });
