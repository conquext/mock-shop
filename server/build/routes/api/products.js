"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _productController = _interopRequireDefault(require("../../controllers/productController"));

var _validation = _interopRequireDefault(require("../../middlewares/validation"));

var _permissionMiddleware = _interopRequireDefault(require("../../middlewares/permissionMiddleware"));

var addProduct = _productController["default"].addProduct,
    deleteProduct = _productController["default"].deleteProduct,
    updateProduct = _productController["default"].updateProduct,
    getProduct = _productController["default"].getProduct,
    getAllProducts = _productController["default"].getAllProducts;
var requireAdmin = _permissionMiddleware["default"].requireAdmin; // const { loginCheck, signupCheck } = validateMiddleware;

var productCheck = _validation["default"].productCheck,
    updateProductCheck = _validation["default"].updateProductCheck;

var router = _express["default"].Router(); // @route POST /api/v1/products
// @desc Add a new product to stock
// @access admin

/**
 * @swagger
 * /products:
 *    post:
 *      summary: Add a new product to stock
 *      description: Create a new product listing
 *      tags:
 *        - Product
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *      - in: body
 *        name: body
 *        description: Product details
 *        properties:
 *         name:
 *          type: string
 *         description:
 *          type: string
 *         category:
 *          type: string
 *         quantity:
 *          type: number
 *         price:
 *          type: number
 *         imageUrl:
 *          type: string
 *          format: url
 *         required:
 *          name
 *          description
 *          category
 *          quantity
 *          price
 *      security:
 *        - bearerAuth: []
 *          type: apikey
 *      responses:
 *       201:
 *        description: Product added
 *        schema:
 *         type: object
 *         $ref: '#/definitions/Product'
 *       403:
 *        description: Unauthorized
 *       400:
 *        description: Bad request
 *       409:
 *        description: Product already exists. Update product if you have more stocks
 *       500:
 *        description: Something went wrong try again
 *
 */


router.post("/", requireAdmin, productCheck, addProduct);
/**
 * @swagger
 * /products/{productId}:
 *    delete:
 *      description: Delete a product from listing
 *      summary: Remove product from stock listing
 *      produces:
 *        application/json
 *      tags:
 *        - Product
 *      parameters:
 *        - in: path
 *          name: productId
 *          required: true
 *          type: string
 *      security:
 *        - bearerAuth: []
 *          type: apikey
 *      responses:
 *        200:
 *          description: Product deleted successfully
 *          schema:
 *            $ref: '#/definitions/Product'
 *        403:
 *          description: Unauthorized
 *        404:
 *          description: Product does not exist in database
 *        400:
 *          description: Bad request
 *        500:
 *          description: Something went wrong try again
 *
 */

router["delete"]("/:productId", requireAdmin, deleteProduct);
/**
 * @swagger
 * /product/{productId}:
 *    patch:
 *      description: Update a product listing
 *      summary: Update product information in stock
 *      produces:
 *        application/json
 *      tags:
 *        - Product
 *      parameters:
 *        - in: path
 *          name: productId
 *          required: true
 *          type: string
 *        - in: body
 *          name: body
 *          required: true
 *          description: Update product details
 *          schema:
 *            type: object
 *            $ref: '#/definitions/Product'
 *      security:
 *        - bearerAuth: []
 *          type: apikey
 *      responses:
 *        200:
 *          description: Product updated successfully
 *          schema:
 *            $ref: '#/definitions/Product'
 *        403:
 *          description: Unauthorized
 *        404:
 *          description: Product productId does not exist in database
 *        400:
 *          description: Bad request
 *        500:
 *          description: Something went wrong try again
 *
 */

router.patch("/:productId", requireAdmin, updateProductCheck, updateProduct);
/**
 * @swagger
 * /products/{productId}:
 *    get:
 *      description: Return a specific product listing
 *      summary: Get a product
 *      produces:
 *        application/json
 *      tags:
 *        - Product
 *      parameters:
 *        - in: path
 *          name: productId
 *          required: true
 *          type: string
 *      security:
 *       - bearerAuth: []
 *         type: apikey
 *      responses:
 *        200:
 *          description: Product found
 *          schema:
 *            $ref: '#/definitions/Product'
 *        404:
 *          description: Product productId does not exist in database
 *        400:
 *          description: Bad request
 *        403:
 *          description: Unauthorized
 *        500:
 *          description: Something went wrong try again
 */

router.get("/:productId", requireAdmin, getProduct);
/**
 * @swagger
 * /products:
 *    get:
 *      description: Return all product listings
 *      summary: Get all products
 *      produces:
 *        application/json
 *      tags:
 *        - Product
 *      security:
 *       - bearerAuth: []
 *         type: apikey
 *      responses:
 *        200:
 *          description: Products found
 *          schema:
 *            $ref: '#/definitions/Product'
 *        400:
 *          description: Bad request
 *        404:
 *          description: Property does not exist in database
 *        500:
 *          description: Something went wrong try again
 *
 */

router.get("/", getAllProducts);
var _default = router;
exports["default"] = _default;