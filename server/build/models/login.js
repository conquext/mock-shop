"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// define the Login model with its content
var logins = function logins(sequelize, DataTypes) {
  var Login = sequelize.define("login", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    userId: DataTypes.INTEGER,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 420]
      }
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });

  Login.associate = function (models) {
    Login.belongsTo(models.User, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
  };

  return Login;
};

var _default = logins;
exports["default"] = _default;