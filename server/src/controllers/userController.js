import Response from "../utils/response";
import db from "../models";
import CartUtils from "../utils/cart";
import ProductUtils from "../utils/product";

const { Cart } = db;
const { errorResponse, successResponse } = Response;
const {
  createCart,
  findCart,
  findAllCarts,
  updateCart,
  getCartField,
  getCartDisplayInfo
} = CartUtils;

const { findProduct } = ProductUtils;

export default class UserController {
  /**
   * Add a product
   * Route: POST: api/v1/users/:userId/carts
   * @param {req} req - HTTP Request object
   * @param {res} res - HTTP Response object
   * @returns {res} A newly added product
   * @description Add a new product to database
   * @memberof UserController
   */
  static async addItemToCart(req, res) {
    const { userId } = req.params;

    try {
      const { productId, quantity = 1 } = req.body;

      const product = await findProduct("id", productId);

      if (!product || !product?.inStock) {
        return errorResponse(res, 400, "Cannot add item");
      }
      if (product.quantity < quantity) {
        return errorResponse(
          res,
          400,
          `Max order exceeded. Only ${product.quantity} Carts in stock`
        );
      }

      // Find if user already has a cart or create one
      // Check if product is already in cart, if yes, only update the quantity
      const productCartExist = await findAllCarts({
        userId,
        productId
      });
      let cart;
      const withoutId = true;

      if (productCartExist[0]) {
        // Has the product price changed since last check?
        // In the future, we should do this for all items in cart
        const pCE = productCartExist[0]?.dataValues;
        if (pCE.price !== product.price) {
          const cartUpdate = await getCartField(withoutId, product);
          const productUpdates = await updateCart(pCE.id, cartUpdate);
          pCE = productUpdates[1][0].dataValues;
        }
        // Would adding more quantity run the product out of stock?
        const quantityIncrement = pCE.quantity + +quantity;
        if (quantityIncrement <= product.quantity) {
          cart = await updateCart(pCE.id, {
            quantity: quantityIncrement
          });
          cart = cart[1][0].dataValues;
        } else
          return errorResponse(
            res,
            400,
            `Max order exceeded. Only ${product.quantity} ${
              product.quantity > 1 ? "products" : "product"
            } in stock`
          );
      } else {
        // this is a new product, so add to cart
        const cartData = await getCartField(withoutId, req.body);
        cartData.userId = userId;
        cartData.productId = productId;
        cartData.price = product.price; // always update price
        if (!cartData.quantity) cartData.quantity = 1;
        else if (
          (cartData.quantity && cartData.quantity > product.quantity) ||
          !product.inStock
        ) {
          return errorResponse(
            res,
            400,
            `Max order exceeded. Only ${product.quantity} ${
              product.quantity > 1 ? "products" : "product"
            } in stock`
          );
        }
        cart = await createCart(cartData);
        cart = cart.dataValues;
      }
      return successResponse(res, 200, "Item added to cart", cart);
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
  static async getCartItem(req, res) {
    try {
      const { userId, cartId } = req.params;
      const thisId = parseInt(cartId, 10);

      const cartFound = await findAllCarts({
        id: thisId,
        userId
      });

      if (!cartFound[0]) {
        return errorResponse(res, 404, `No Cart Found`);
      }

      return successResponse(
        res,
        200,
        "Cart Found",
        getCartDisplayInfo([cartFound[0]?.dataValues])[0]
      );
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
  static async getCartItems(req, res) {
    try {
      const cartItem = await findAllCarts("userId", req.user.id);

      if (!cartItem[0]) {
        return errorResponse(res, 404, `No item in cart`);
      }

      const msg = cartItem.length > 1 ? "Cart items" : "Cart item";
      msg += "retrieved";

      const cartsFound = cartItem.map(cart => cart.dataValues);
      const includeTotal = true;

      return successResponse(
        res,
        200,
        msg,
        getCartDisplayInfo(cartsFound, includeTotal)
      );
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  /**
   * Remove a cart item or entire product
   * @param {res} req - HTTP Request object
   * @param {res} res - HTTP Response object
   * @returns {res} - custom response
   * @description get details of listed product
   * @memberof ProductController
   */
  static async removeCartItem(req, res) {
    try {
      let { userId, productId } = req.params;
      const { quantity = 1 } = req.body || req.query;
      productId = parseInt(productId, 10);
      let withoutId = true,
        includeTotal = true;

      const productInCart = await findAllCarts({
        productId,
        userId
      });

      if (!productInCart[0]) {
        return errorResponse(res, 404, `Product is not in Cart`);
      }

      // Has the product price changed since last check?
      // In the future, we should do this for all items in cart
      // And best done at checkout but until then
      const product = await findProduct("id", productId);

      let pIC = productInCart[0]?.dataValues;
      if (pIC.price !== product.price) {
        const cartUpdate = await getCartField(withoutId, product);
        const productUpdates = await updateCart(pIC.id, cartUpdate);
        pIC = productUpdates[1][0].dataValues;
      }

      pIC.quantity -= quantity;
      pIC.quantity < 0 ? (pIC.quantity = 0) : "";

      if (pIC.quantity == 0) {
        // Delete product from cart
        await Cart.destroy({
          where: { productId: pIC.productId },
          cascade: true
        });
        return successResponse(
          res,
          200,
          `Product ${pIC.productId} removed from cart`
        );
      }
      if (pIC.quantity >= 1) {
        if (pIC.quantity > product.quantity) {
          return errorResponse(
            res,
            400,
            `Remove more items. Only ${product.quantity} ${
              product.quantity > 1 ? "quantities" : "quantity"
            } in stock`
          );
        }

        // Remove items and update cart
        const cartProductUpdate = await getCartField(withoutId, pIC);
        Object.entries(cartProductUpdate).forEach(([key, _]) => {
          if (key != "quantity") {
            delete cartProductUpdate[key];
          }
        });

        await updateCart(pIC.id, cartProductUpdate);
      }

      const cartUpdates = await findAllCarts("userId", userId);

      const cartsLeft = cartUpdates.map(cart => cart.dataValues);

      return successResponse(
        res,
        200,
        "Cart Item Removed",
        getCartDisplayInfo(cartsLeft)
      );
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
