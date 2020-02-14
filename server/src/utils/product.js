import db from "../models/index";
const { Product } = db;

export default class ProductUtils {
  static getProductField(body) {
    const data = {};
    const acceptedFields = [
      "id",
      "name",
      "description",
      "category",
      "imageUrl",
      "price",
      "quantity",
      "inStock"
    ];
    Object.entries(body).forEach(([key, value]) => {
      if (acceptedFields.includes(key)) {
        data[key] = value;
      }
    });
    return data;
  }

  static getUpdatableProductField(body) {
    const data = ProductUtils.getProductField(body);
    delete data?.id;
    return data;
  }

  static async addProduct(productData) {
    try {
      const product = await Product.create(productData);
      return product?.dataValues || product;
    } catch (error) {
      throw error;
    }
  }

  static async updateProduct(id, updates) {
    try {
      const productToUpdate = await ProductUtils.findProduct("id", id);

      if (productToUpdate) {
        const product = await Product.update(updates, {
          where: { id },
          attributes: {
            exclude: ["id"]
          },
          returning: true
        });

        return product?.dataValues || product;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findProduct(key, value) {
    let product;
    try {
      if (key || value) {
        product = await Product.findOne({
          where: {
            [key]: value
          }
        });
      } else product = await Product.findAll({ raw: true });
      return product?.dataValues || product;
    } catch (error) {
      throw error;
    }
  }

  static async inStock(productOrkey, productId) {
    if (!productId) return productOrkey.inStock;
    const product = ProductUtils.findProduct(productOrkey, value);
    if (!product.inStock) return false;
  }
}
