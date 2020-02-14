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
 *   Product:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       imageUrl:
 *         type: string
 *       category:
 *         type: number
 *       quantity:
 *         type: number
 *       inStock:
 *         type: boolean
 *       updatedAt:
 *         type: string
 *         format: date-time
 */

const products = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "http://placehold.it/400x600"
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  Product.associate = models => {
    // Product.hasMany(models.Cart, {
    //   foreignKey: "id",
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE"
    // });
    Product.hasMany(models.Cart, {
      foreignKey: "productId",
      onDelete: "CASCADE"
    });
  };

  return Product;
};

export default products;
