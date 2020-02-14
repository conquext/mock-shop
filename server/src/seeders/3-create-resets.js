const hash = require("../helpers/hash").hash;
const password = ["password1", "password2"];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const passwHash = [await hash(password[0]), await hash(password[1])];
    // let resets = [];
    // for (let i = 0; i <= 5; i++) {
    //   let reset = {};
    //   reset.userId = i;
    //   reset.email = `email${i}@email.com`;
    //   reset.resetToken = passwHash[i % 2];
    //   reset.createdAt = new Date();
    //   reset.updatedAt = new Date();
    //   resets.push(reset);
    // }
    // return queryInterface.bulkInsert("resets", resets);
  },
  down: queryInterface => queryInterface.bulkDelete("resets", null, {})
};
