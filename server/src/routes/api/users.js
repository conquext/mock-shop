import { Router } from "express";
import Permissions from "../../middlewares/permissionMiddleware";
import userController from "../../controllers/userController";
import Validation from "../../middlewares/validation";

const { requireOwnerAuth } = Permissions;
const { cartAddCheck } = Validation;
const {
  addItemToCart,
  getCartItems,
  getCartItem,
  removeCartItem
} = userController;

const router = Router();

// @route POST /api/v1/users/userId/carts
// @desc Add a new product to stock
// @access user

/**
 * @swagger
 * /users/{userId}/carts:
 *    post:
 *      summary: Add a new product item to cart
 *      description: Add a new cart item
 *      tags:
 *        - Cart
 *      consumes:
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          type: string
 *        - in: body
 *          name: body
 *          description: Cart details
 *          properties:
 *          productId:
 *           type: string
 *          quantity:
 *           type: number
 *          required:
 *           productId
 *      security:
 *        - bearerAuth: []
 *          type: apikey
 *      responses:
 *       201:
 *        description: Item added to cart
 *        schema:
 *         type: object
 *         $ref: '#/definitions/Cart'
 *       403:
 *        description: Unauthorized
 *       400:
 *        description: Bad request
 *       500:
 *        description: Something went wrong try again
 *
 */
router.post("/:userId/carts", requireOwnerAuth, cartAddCheck, addItemToCart);

/**
 * @swagger
 * /users/{userId}/carts:
 *    get:
 *      description: Return all items in cart with total price
 *      summary: Get all cart items for a user
 *      produces:
 *        application/json
 *      tags:
 *        - Cart
 *      security:
 *       - bearerAuth: []
 *         type: apikey
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Cart items retrieved
 *          schema:
 *            $ref: '#/definitions/Carts'
 *        400:
 *          description: Bad request
 *        404:
 *          description: No item in cart
 *        403:
 *          description: Unauthorized
 *        500:
 *          description: Something went wrong try again
 *
 */
router.get("/:userId/carts", requireOwnerAuth, getCartItems);

/**
 * @swagger
 * /users/{userId}/carts/{cartId}:
 *    get:
 *      description: Return a specific cart item
 *      summary: Get a cart item
 *      produces:
 *        application/json
 *      tags:
 *        - Cart
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          type: string
 *        - in: path
 *          name: cartId
 *          required: true
 *          type: string
 *      security:
 *       - bearerAuth: []
 *         type: apikey
 *      responses:
 *        200:
 *          description: Cart found
 *          schema:
 *            $ref: '#/definitions/Carts'
 *        400:
 *          description: Bad request
 *        404:
 *          description: No cart found
 *        403:
 *          description: Unauthorized
 *        500:
 *          description: Something went wrong try again
 */

router.get("/:userId/carts/:cartId", requireOwnerAuth, getCartItem);

/**
 * @swagger
 * /users/{userId}/carts/{productId}:
 *    delete:
 *      description: Delete an item from cart
 *      summary: Remove cart item
 *      produces:
 *        application/json
 *      tags:
 *        - Cart
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          type: string
 *        - in: path
 *          name: productId
 *          required: true
 *          type: string
 *        - in: body
 *          name: body
 *          properties:
 *           quantity:
 *            type: number
 *      security:
 *        - bearerAuth: []
 *          type: apikey
 *      responses:
 *        200:
 *          description: Product removed from cart
 *          schema:
 *            $ref: '#/definitions/Cart'
 *        403:
 *          description: Unauthorized
 *        404:
 *          description: Product is not in cart
 *        400:
 *          description: Bad request
 *        500:
 *          description: Something went wrong try again
 *
 */
router.delete("/:userId/carts/:productId", requireOwnerAuth, removeCartItem);

export default router;
