const mongoose = require('mongoose');
const User = require('../models/User');

exports.findUser = (name) => {
  console.log('FIND NAME', name)
  return Challenge.findOne({ 'name': name })
    .then(challenge => {
        console.log('WITHINPROMISE NAME', challenge.name);
        return challenge;
      })
    .catch(err => {
      console.error(err);
    })
}