const hash = require("../helpers/hash").hash;
const password = ["password1", "password2"];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const passwHash = [await hash(password[0]), await hash(password[1])];
    // let logins = [];
    // for (let i = 0; i <= 10; i++) {
    //   let login = {};
    //   login.userId = i;
    //   login.email = `email${i}@email.com`;
    //   login.password = passwHash[i % 2];
    //   login.lastLogin = new Date();
    //   login.createdAt = new Date();
    //   login.updatedAt = new Date();
    //   logins.push(login);
    // }
    // return queryInterface.bulkInsert("logins", logins);
  },
  down: queryInterface => queryInterface.bulkDelete("logins", null, {})
};
