// var express = require('express');
// var request = require('supertest');
// var expect = require('chai').expect;
// var app = require('../src/server/server.js');

import express from 'express';
import request from 'supertest';
import { expect } from 'chai'
import app from '../src/server/server.js';
// import io from 'socket.io';

describe('Application Server', () => {

  it('should post to api/repl successfully', (done) => {
    request(app)
      .post('/api/repl')
      .expect(200)
    done()
  })

});

