"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @swagger
 * definitions:
 *   error:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 400
 *       message:
 *         type: string
 *       error:
 *         type: string
 *   success:
 *     properties:
 *       statusCode:
 *         type: integer
 *         format: int32
 *         default: 200
 *       message:
 *         type: string
 *       data:
 *         type: object
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       username:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       isAdmin:
 *         type: boolean
 *       updatedAt:
 *         type: string
 *         format: date-time
 */
var users = function users(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 420]
      }
    },
    isAdmin: DataTypes.BOOLEAN,
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin", "disabled"],
      defaultValue: "user"
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  User.associate = function (models) {
    User.hasOne(models.Login, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
    User.hasOne(models.Reset, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
  };

  return User;
};

var _default = users;
exports["default"] = _default;