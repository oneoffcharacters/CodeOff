import express from 'express';
import request from 'supertest';
import { expect } from 'chai'
import app from '../src/server/server.js';
// import io from 'socket.io';

describe('codeOutput endpoint', () => {

  it('should return 400 with NO CODE', (done) => {
    request(app)
      .post('/api/codeOutput')
      .expect(400, done)
  })
  it('should return 404 from unrecognised routes', function(done) {
    request(app)
      .post('/api/wrongRoute')
      .expect(404, done);
  });
  it('should evaluate simple expressions', function(done) {
    request(app)
      .post('/api/codeOutput')
      .send({ "code": "2 + 2;"})
      .expect(200, {
        text: '4\n> '
      }, done);
  });
  it('should evaluate multiple line expressions', function(done) {
    request(app)
      .post('/api/codeOutput')
      .send({ "code": 
      	"for (var i = 0; i < 4; i++) {\
			console.log(i);\
		}"
      })
      .expect(200, {
        text: '0\n1\n2\n3\n> '
      }, done);
  });
  it('should successfully get from api/challenge endpoint', (done) => {
    request(app)
      .get('/api/challenge')
      .expect(200)
    done()
  });
  it('should successfully get from api/challenge/:id endpoint when id exists', (done) => {
    request(app)
      .get('/api/challenge/ReverseAString')
      .expect(200)
    done()
  });
    it('should fail to get from api/challenge/:id endpoint when id does not exists', (done) => {
    request(app)
      .get('/api/challenge/taco')
      .expect(404)
    done()
  });
});

