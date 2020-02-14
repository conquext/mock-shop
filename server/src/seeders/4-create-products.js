const faker = require("faker");

const stockAv = [true, true, false];
const category = ["clothings", "electronics", "books"];

module.exports = {
  up: (queryInterface, Sequelize) => {
    let products = [];
    for (let i = 0; i <= 10; i++) {
      let product = {};
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
  down: queryInterface => queryInterface.bulkDelete("products", null, {})
};
