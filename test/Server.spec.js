// var express = require('express');
// var request = require('supertest');
// var expect = require('chai').expect;
// var app = require('../src/server/server.js');

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
  it('should evaluate simple functions', function(done) {
    request(app)
      .post('/api/codeOutput')
      .send({ "code": "2 + 2;"})
      .expect(function(res) {
        res.body.consoleText = JSON.parse(res.text).consoleText;
      })
      .expect(200, {
        consoleText: '4\n> '
      }, done);
  });


  // it('evaluate basic functions', (done) => {
  //   request(app)
  //     .post('/api/codeOutput')
  //     .field('code', 2+2)
  //     .expect(200, {
  //       consoleText: '3'
  //     })
  //   done()
  // })

});

