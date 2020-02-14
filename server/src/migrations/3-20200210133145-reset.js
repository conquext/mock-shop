module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("resets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        onDelete: "CASCADE",
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id"
        }
      },
      email: {
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "email"
        }
      },
      resetToken: {
        type: Sequelize.STRING
      },
      expireTime: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable("resets")
};
