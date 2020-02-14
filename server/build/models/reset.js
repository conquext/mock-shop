"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// define the Reset model with its content
var resets = function resets(sequelize, DataTypes) {
  var Reset = sequelize.define("reset", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true
    },
    email: {
      type: DataTypes.INTEGER,
      unique: true
    },
    resetToken: {
      type: DataTypes.STRING,
      unique: true
    },
    expireTime: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  Reset.associate = function (models) {
    Reset.belongsTo(models.User, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
  };

  return Reset;
};

var _default = resets;
exports["default"] = _default;