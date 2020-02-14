"use strict";

var bcrypt = require("bcrypt"); // es5 exports here because sequelize is cool with it


module.exports = {
  hash: function hash(password) {
    return new Promise(function (resolve, reject) {
      bcrypt.hash(password, 10, function (err, hash) {
        resolve(hash);
        reject(err);
      });
    });
  },
  compareHash: function compareHash(hashpassword, password) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, hashpassword, function (err, bool) {
        resolve(bool);
        reject(err);
      });
    });
  }
};