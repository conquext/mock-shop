// const userSeed = require("../helpers/seed").userSeed;
const faker = require("faker");
const hash = require("../helpers/hash").hash;
const role = ["user", "admin"];
const password = ["password1", "password2"];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwHash = [await hash(password[0]), await hash(password[1])];

    let users = [];
    for (let i = 0; i <= 10; i++) {
      let user = {};
      user.username = `username${i}`;
      user.firstName = faker.name.firstName() || `Firstname${i}`;
      user.lastName = faker.name.lastName() || `Lastname${i}`;
      user.email = `email${i}@email.com`;
      user.password = passwHash[i % 2];
      user.isAdmin = role[i % 2] === "admin";
      user.role = role[i % 2];
      user.createdAt = new Date();
      user.updatedAt = new Date();

      users.push(user);
    }

    return queryInterface.bulkInsert("users", users);
  },
  down: queryInterface => queryInterface.bulkDelete("users", null, {})
};
