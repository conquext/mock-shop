const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // let carts = [];
    // for (let i = 0; i <= 30; i++) {
    //   let cart = {};
    //   cart.userId = (i % 5) + 1;
    //   cart.productId = (i % 5) + 1;
    //   cart.price = i * 10;
    //   cart.quantity = (i % 3) + 1;
    //   cart.createdAt = new Date();
    //   cart.updatedAt = new Date();
    //   carts.push(cart);
    // }
    // return queryInterface.bulkInsert("carts", carts);
  },
  down: queryInterface => queryInterface.bulkDelete("carts", null, {})
};
