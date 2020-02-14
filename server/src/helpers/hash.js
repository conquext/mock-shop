const bcrypt = require("bcrypt");

// es5 exports here because sequelize is cool with it
module.exports = {
  hash: password =>
    new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        resolve(hash);
        reject(err);
      });
    }),
  compareHash: (hashpassword, password) =>
    new Promise((resolve, reject) => {
      bcrypt.compare(password, hashpassword, (err, bool) => {
        resolve(bool);
        reject(err);
      });
    })
};
