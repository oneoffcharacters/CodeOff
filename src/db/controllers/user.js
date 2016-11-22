const mongoose = require('mongoose');
const User = require('../models/User');

// exports.findUser = (name) => {
//   console.log('FIND NAME', name)
//   return User.findOne({ 'name': name })
//     .then(User => {
//         console.log('WITHINPROMISE NAME', User.name);
//         return User;
//       })
//     .catch(err => {
//       console.error(err);
//     })
// }

exports.findUser = (name) => {
  return User.findOne({"name": name})
    .then(user => {
      console.log('user ', user);
      return user;
    })
    .catch(err => {
      console.error(err);
    })
}