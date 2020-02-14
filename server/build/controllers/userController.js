"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _response = _interopRequireDefault(require("../utils/response"));

var _models = _interopRequireDefault(require("../models"));

var _cart = _interopRequireDefault(require("../utils/cart"));

var _product = _interopRequireDefault(require("../utils/product"));

var Cart = _models["default"].Cart;
var errorResponse = _response["default"].errorResponse,
    successResponse = _response["default"].successResponse;
var createCart = _cart["default"].createCart,
    findCart = _cart["default"].findCart,
    findAllCarts = _cart["default"].findAllCarts,
    updateCart = _cart["default"].updateCart,
    getCartField = _cart["default"].getCartField,
    getCartDisplayInfo = _cart["default"].getCartDisplayInfo;
var findProduct = _product["default"].findProduct;

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "addItemToCart",

    /**
     * Add a product
     * Route: POST: api/v1/users/:userId/carts
     * @param {req} req - HTTP Request object
     * @param {res} res - HTTP Response object
     * @returns {res} A newly added product
     * @description Add a new product to database
     * @memberof UserController
     */
    value: function () {
      var _addItemToCart = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var userId, _req$body, productId, _req$body$quantity, quantity, product, productCartExist, cart, withoutId, _productCartExist$, pCE, cartUpdate, productUpdates, quantityIncrement, cartData;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = req.params.userId;
                _context.prev = 1;
                _req$body = req.body, productId = _req$body.productId, _req$body$quantity = _req$body.quantity, quantity = _req$body$quantity === void 0 ? 1 : _req$body$quantity;
                _context.next = 5;
                return findProduct("id", productId);

              case 5:
                product = _context.sent;

                if (!(!product || !(product === null || product === void 0 ? void 0 : product.inStock))) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", errorResponse(res, 400, "Cannot add item"));

              case 8:
                if (!(product.quantity < quantity)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", errorResponse(res, 400, "Max order exceeded. Only ".concat(product.quantity, " Carts in stock")));

              case 10:
                _context.next = 12;
                return findAllCarts({
                  userId: userId,
                  productId: productId
                });

              case 12:
                productCartExist = _context.sent;
                withoutId = true;

                if (!productCartExist[0]) {
                  _context.next = 35;
                  break;
                }

                // Has the product price changed since last check?
                // In the future, we should do this for all items in cart
                pCE = (_productCartExist$ = productCartExist[0]) === null || _productCartExist$ === void 0 ? void 0 : _productCartExist$.dataValues;

                if (!(pCE.price !== product.price)) {
                  _context.next = 24;
                  break;
                }

                _context.next = 19;
                return getCartField(withoutId, product);

              case 19:
                cartUpdate = _context.sent;
                _context.next = 22;
                return updateCart(pCE.id, cartUpdate);

              case 22:
                productUpdates = _context.sent;
                pCE = ((0, _readOnlyError2["default"])("pCE"), productUpdates[1][0].dataValues);

              case 24:
                // Would adding more quantity run the product out of stock?
                quantityIncrement = pCE.quantity + +quantity;

                if (!(quantityIncrement <= product.quantity)) {
                  _context.next = 32;
                  break;
                }

                _context.next = 28;
                return updateCart(pCE.id, {
                  quantity: quantityIncrement
                });

              case 28:
                cart = _context.sent;
                cart = cart[1][0].dataValues;
                _context.next = 33;
                break;

              case 32:
                return _context.abrupt("return", errorResponse(res, 400, "Max order exceeded. Only ".concat(product.quantity, " ").concat(product.quantity > 1 ? "products" : "product", " in stock")));

              case 33:
                _context.next = 51;
                break;

              case 35:
                _context.next = 37;
                return getCartField(withoutId, req.body);

              case 37:
                cartData = _context.sent;
                cartData.userId = userId;
                cartData.productId = productId;
                cartData.price = product.price; // always update price

                if (cartData.quantity) {
                  _context.next = 45;
                  break;
                }

                cartData.quantity = 1;
                _context.next = 47;
                break;

              case 45:
                if (!(cartData.quantity && cartData.quantity > product.quantity || !product.inStock)) {
                  _context.next = 47;
                  break;
                }

                return _context.abrupt("return", errorResponse(res, 400, "Max order exceeded. Only ".concat(product.quantity, " ").concat(product.quantity > 1 ? "products" : "product", " in stock")));

              case 47:
                _context.next = 49;
                return createCart(cartData);

              case 49:
                cart = _context.sent;
                cart = cart.dataValues;

              case 51:
                return _context.abrupt("return", successResponse(res, 200, "Item added to cart", cart));

              case 54:
                _context.prev = 54;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", errorResponse(res, 500, _context.t0));

              case 57:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 54]]);
      }));

      function addItemToCart(_x, _x2) {
        return _addItemToCart.apply(this, arguments);
      }

      return addItemToCart;
    }()
    /**
     * Get a product
     * @param {res} req - HTTP Request object
     * @param {res} res - HTTP Response object
     * @returns {res} - custom response
     * @description get details of listed product
     * @memberof ProductController
     */

  }, {
    key: "getCartItem",
    value: function () {
      var _getCartItem = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var _cartFound$, _req$params, userId, cartId, thisId, cartFound;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$params = req.params, userId = _req$params.userId, cartId = _req$params.cartId;
                thisId = parseInt(cartId, 10);
                _context2.next = 5;
                return findAllCarts({
                  id: thisId,
                  userId: userId
                });

              case 5:
                cartFound = _context2.sent;

                if (cartFound[0]) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", errorResponse(res, 404, "No Cart Found"));

              case 8:
                return _context2.abrupt("return", successResponse(res, 200, "Cart Found", getCartDisplayInfo([(_cartFound$ = cartFound[0]) === null || _cartFound$ === void 0 ? void 0 : _cartFound$.dataValues])[0]));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", errorResponse(res, 500, _context2.t0));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function getCartItem(_x3, _x4) {
        return _getCartItem.apply(this, arguments);
      }

      return getCartItem;
    }()
    /**
     * Get all products
     * @param {res} req - HTTP Request object
     * @param {res} res - HTTP Response object
     * @returns {res} - custom response
     * @description get details of all listed product
     * @memberof ProductController
     */

  }, {
    key: "getCartItems",
    value: function () {
      var _getCartItems = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var cartItem, msg, cartsFound, includeTotal;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return findAllCarts("userId", req.user.id);

              case 3:
                cartItem = _context3.sent;

                if (cartItem[0]) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", errorResponse(res, 404, "No item in cart"));

              case 6:
                msg = cartItem.length > 1 ? "Cart items" : "Cart item";
                msg += ((0, _readOnlyError2["default"])("msg"), "retrieved");
                cartsFound = cartItem.map(function (cart) {
                  return cart.dataValues;
                });
                includeTotal = true;
                return _context3.abrupt("return", successResponse(res, 200, msg, getCartDisplayInfo(cartsFound, includeTotal)));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", errorResponse(res, 500, _context3.t0));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 13]]);
      }));

      function getCartItems(_x5, _x6) {
        return _getCartItems.apply(this, arguments);
      }

      return getCartItems;
    }()
    /**
     * Remove a cart item or entire product
     * @param {res} req - HTTP Request object
     * @param {res} res - HTTP Response object
     * @returns {res} - custom response
     * @description get details of listed product
     * @memberof ProductController
     */

  }, {
    key: "removeCartItem",
    value: function () {
      var _removeCartItem = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var _productInCart$, _req$params2, userId, productId, _ref, _ref$quantity, quantity, withoutId, includeTotal, productInCart, product, pIC, cartUpdate, productUpdates, cartProductUpdate, cartUpdates, cartsLeft;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _req$params2 = req.params, userId = _req$params2.userId, productId = _req$params2.productId;
                _ref = req.body || req.query, _ref$quantity = _ref.quantity, quantity = _ref$quantity === void 0 ? 1 : _ref$quantity;
                productId = parseInt(productId, 10);
                withoutId = true, includeTotal = true;
                _context4.next = 7;
                return findAllCarts({
                  productId: productId,
                  userId: userId
                });

              case 7:
                productInCart = _context4.sent;

                if (productInCart[0]) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", errorResponse(res, 404, "Product is not in Cart"));

              case 10:
                _context4.next = 12;
                return findProduct("id", productId);

              case 12:
                product = _context4.sent;
                pIC = (_productInCart$ = productInCart[0]) === null || _productInCart$ === void 0 ? void 0 : _productInCart$.dataValues;

                if (!(pIC.price !== product.price)) {
                  _context4.next = 22;
                  break;
                }

                _context4.next = 17;
                return getCartField(withoutId, product);

              case 17:
                cartUpdate = _context4.sent;
                _context4.next = 20;
                return updateCart(pIC.id, cartUpdate);

              case 20:
                productUpdates = _context4.sent;
                pIC = productUpdates[1][0].dataValues;

              case 22:
                pIC.quantity -= quantity;
                pIC.quantity < 0 ? pIC.quantity = 0 : "";

                if (!(pIC.quantity == 0)) {
                  _context4.next = 28;
                  break;
                }

                _context4.next = 27;
                return Cart.destroy({
                  where: {
                    productId: pIC.productId
                  },
                  cascade: true
                });

              case 27:
                return _context4.abrupt("return", successResponse(res, 200, "Product ".concat(pIC.productId, " removed from cart")));

              case 28:
                if (!(pIC.quantity >= 1)) {
                  _context4.next = 37;
                  break;
                }

                if (!(pIC.quantity > product.quantity)) {
                  _context4.next = 31;
                  break;
                }

                return _context4.abrupt("return", errorResponse(res, 400, "Remove more items. Only ".concat(product.quantity, " ").concat(product.quantity > 1 ? "quantities" : "quantity", " in stock")));

              case 31:
                _context4.next = 33;
                return getCartField(withoutId, pIC);

              case 33:
                cartProductUpdate = _context4.sent;
                Object.entries(cartProductUpdate).forEach(function (_ref2) {
                  var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
                      key = _ref3[0],
                      _ = _ref3[1];

                  if (key != "quantity") {
                    delete cartProductUpdate[key];
                  }
                });
                _context4.next = 37;
                return updateCart(pIC.id, cartProductUpdate);

              case 37:
                _context4.next = 39;
                return findAllCarts("userId", userId);

              case 39:
                cartUpdates = _context4.sent;
                cartsLeft = cartUpdates.map(function (cart) {
                  return cart.dataValues;
                });
                return _context4.abrupt("return", successResponse(res, 200, "Cart Item Removed", getCartDisplayInfo(cartsLeft)));

              case 44:
                _context4.prev = 44;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", errorResponse(res, 500, _context4.t0));

              case 47:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 44]]);
      }));

      function removeCartItem(_x7, _x8) {
        return _removeCartItem.apply(this, arguments);
      }

      return removeCartItem;
    }()
  }]);
  return UserController;
}();

exports["default"] = UserController;