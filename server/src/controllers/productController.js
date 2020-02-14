import Response from "../utils/response";
import ProductUtils from "../utils/product";
import db from "../models";

const { Product, Cart } = db;
const { errorResponse, successResponse } = Response;
const {
  addProduct: addProducts,
  findProduct,
  updateProduct,
  getUpdatableProductField
} = ProductUtils;

export default class ProductController {
  /**
   * Add a product
   * Route: POST: api/v1/products/:productId
   * @param {req} req - HTTP Request object
   * @param {res} res - HTTP Response object
   * @returns {res} A newly added product
   * @description Add a new product to database
   * @memberof ProductController
   */
  static async addProduct(req, res) {
    try {
      const {
        productName,
        description,
        category,
        price,
        quantity = 1,
        inStock = true,
        imageUrl
      } = req.body;

      const newProduct = {
        name: productName,
        description,
        category,
        price,
        quantity,
        inStock,
        imageUrl
      };
      console.log("hey");

      const existingProduct = await findProduct("name", productName);

      if (
        existingProduct &&
        existingProduct.description === description &&
        existingProduct.category === category
      ) {
        return errorResponse(
          res,
          409,
          "Product already exists. Update product if you have more stocks"
        );
      }

      console.log("we");

      const productAdded = await addProducts(newProduct);
      console.log("hi");
      return successResponse(res, 200, "Product added", productAdded);
    } catch (err) {
      console.log("ye", err);
      return errorResponse(res, 500, err);
    }
  }

  /**
   * Remove a product
   * Route: DELETE: api/v1/products/:productId
   * @param {req} req - HTTP Request object
   * @param {res} res - HTTP Response object
   * @return {res} HTTP Response object
   * @description Delete a product from database
   * @memberof ProductController
   */
  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const thisId = parseInt(productId, 10);

      const productFound = await findProduct("id", thisId);

      if (!productFound) {
        return errorResponse(
          res,
          404,
          `ProductId ${productId} does not exist in database`
        );
      }

      // Delete product from database
      await Product.destroy({
        where: { id: productFound.id },
        cascade: true,
        include: [{ model: Cart }]
      });

      return successResponse(
        res,
        200,
        `Product ${productFound.id} deleted successfully`
      );
    } catch (error) {
      return errorResponse(res, 500, [error]);
    }
  }

  /**
   * Update a product
   * Route: PATCH: api/v1/products/:productId
   * @param {req} req - HTTP Request object
   * @param {res} res - HTTP Response object
   * @return {res} A product updated information
   * @description update a product in database
   * @memberof ProductController
   */
  static async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const thisId = parseInt(productId, 10);

      const productFound = await findProduct("id", thisId);

      if (!productFound) {
        return errorResponse(
          res,
          404,
          `ProductId ${productId} does not exist in record`
        );
      }

      const newProductDetails = getUpdatableProductField(req.body);

      // const newProduct = {
      //   name: productName,
      //   description,
      //   category,
      //   price,
      //   quantity,
      //   inStock,
      //   imageUrl
      // };

      // if (
      //   existingProduct &&
      //   existingProduct.description === description &&
      //   existingProduct.category === category
      // ) {
      //   return errorResponse(
      //     res,
      //     409,
      //     "Product already exists. Update product if you have more stocks"
      //   );
      // }

      const productUpdates = await updateProduct(productId, newProductDetails);

      return successResponse(
        res,
        200,
        `Product Id ${productId} updated`,
        productUpdates[1][0]
      );
    } catch (err) {
      return errorResponse(res, 500, err);
    }
  }

  /**
   * Get a product
   * @param {res} req - HTTP Request object
   * @param {res} res - HTTP Response object
   * @returns {res} - custom response
   * @description get details of listed product
   * @memberof ProductController
   */
  static async getProduct(req, res) {
    try {
      const { productId } = req.params;
      const thisId = parseInt(productId, 10);

      const productFound = await findProduct("id", thisId);

      if (!productFound) {
        return errorResponse(
          res,
          404,
          `ProductId ${productId} does not exist in record`
        );
      }

      return successResponse(res, 200, "Product Found", productFound);
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  /**
   * Get all products
   * @param {res} req - HTTP Request object
   * @param {res} res - HTTP Response object
   * @returns {res} - custom response
   * @description get details of all listed product
   * @memberof ProductController
   */
  static async getAllProducts(req, res) {
    try {
      const productFound = await findProduct();

      if (!productFound) {
        return errorResponse(
          res,
          404,
          `ProductId ${productId} does not exist in record`
        );
      }

      const msg = productFound.length > 1 ? "Products Found" : "Product Found";

      return successResponse(res, 200, msg, productFound);
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
