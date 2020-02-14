"use strict";

var faker = require("faker");

var stockAv = [true, true, false];
var category = ["clothings", "electronics", "books"];
module.exports = {
  up: function up(queryInterface, Sequelize) {
    var products = [];

    for (var i = 0; i <= 10; i++) {
      var product = {};
      product.name = faker.commerce.productName();
      product.description = faker.lorem.sentence();
      product.category = category[i % 3];
      product.price = faker.commerce.price();
      product.quantity = i;
      product.inStock = stockAv[i % 3];
      product.imageUrl = faker.image.imageUrl();
      product.createdAt = new Date();
      product.updatedAt = new Date();
      products.push(product);
    }

    return queryInterface.bulkInsert("products", products);
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete("products", null, {});
  }
};