const express = require('express');
const jwt = require('jsonwebtoken');
const configMain = require('../../../config/main');

// instance of router
var protectedRoutes = express.Router();

// app.use('/protected', protectedRoutes);

// route middleware to verify a token
protectedRoutes.use(function(req, res, next) {
  // get token from request body
  var token = req.body.token || req.headers['x-access-token'];
  console.log('token =', token);

  if(token) {
    // verify secret
    jwt.verify(token, configMain.secret, function(err, decoded) {
      console.log('secret =', configMain.secret);
      if(err) {
        console.log('Failed to authenticate token');
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        // if authentication is successful, save to request for use in other routes
        req.decoded = decoded;
        console.log('decoded =', decoded);
        next();
      }
    });
  } else {
    // if there is no token return error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }

});


// protected routes
protectedRoutes.get('/', function(req, res) {
  console.log('Successfully authenticated for this route');
  res.json({message: 'Hello! Successfully authenticated!'});
});


module.exports = protectedRoutes;