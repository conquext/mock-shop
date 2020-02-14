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
 *   Cart:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       userId:
 *         type: string
 *       productId:
 *         type: string
 *       price:
 *         type: number
 *       quantity:
 *         type: number
 *       updatedAt:
 *         type: string
 *         format: date-time
 */
var carts = function carts(sequelize, DataTypes) {
  var Cart = sequelize.define("cart", {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  };

  return Cart;
};

var _default = carts;
exports["default"] = _default;