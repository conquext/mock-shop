"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _response = _interopRequireDefault(require("../utils/response"));

var _product = _interopRequireDefault(require("../utils/product"));

var _models = _interopRequireDefault(require("../models"));

var Product = _models["default"].Product,
    Cart = _models["default"].Cart;
var errorResponse = _response["default"].errorResponse,
    successResponse = _response["default"].successResponse;
var addProducts = _product["default"].addProduct,
    findProduct = _product["default"].findProduct,
    _updateProduct = _product["default"].updateProduct,
    getUpdatableProductField = _product["default"].getUpdatableProductField;

var ProductController =
/*#__PURE__*/
function () {
  function ProductController() {
    (0, _classCallCheck2["default"])(this, ProductController);
  }

  (0, _createClass2["default"])(ProductController, null, [{
    key: "addProduct",

    /**
     * Add a product
     * Route: POST: api/v1/products/:productId
     * @param {req} req - HTTP Request object
     * @param {res} res - HTTP Response object
     * @returns {res} A newly added product
     * @description Add a new product to database
     * @memberof ProductController
     */
    value: function () {
      var _addProduct = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var _req$body, productName, description, category, price, _req$body$quantity, quantity, _req$body$inStock, inStock, imageUrl, newProduct, existingProduct, productAdded;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, productName = _req$body.productName, description = _req$body.description, category = _req$body.category, price = _req$body.price, _req$body$quantity = _req$body.quantity, quantity = _req$body$quantity === void 0 ? 1 : _req$body$quantity, _req$body$inStock = _req$body.inStock, inStock = _req$body$inStock === void 0 ? true : _req$body$inStock, imageUrl = _req$body.imageUrl;
                newProduct = {
                  name: productName,
                  description: description,
                  category: category,
                  price: price,
                  quantity: quantity,
                  inStock: inStock,
                  imageUrl: imageUrl
                };
                console.log("hey");
                _context.next = 6;
                return findProduct("name", productName);

              case 6:
                existingProduct = _context.sent;

                if (!(existingProduct && existingProduct.description === description && existingProduct.category === category)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", errorResponse(res, 409, "Product already exists. Update product if you have more stocks"));

              case 9:
                console.log("we");
                _context.next = 12;
                return addProducts(newProduct);

              case 12:
                productAdded = _context.sent;
                console.log("hi");
                return _context.abrupt("return", successResponse(res, 200, "Product added", productAdded));

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                console.log("ye", _context.t0);
                return _context.abrupt("return", errorResponse(res, 500, _context.t0));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 17]]);
      }));

      function addProduct(_x, _x2) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }()
    /**
     * Remove a product
     * Route: DELETE: api/v1/products/:productId
     * @param {req} req - HTTP Request object
     * @param {res} res - HTTP Response object
     * @return {res} HTTP Response object
     * @description Delete a product from database
     * @memberof ProductController
     */

  }, {
    key: "deleteProduct",
    value: function () {
      var _deleteProduct = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var _productId, thisId, productFound;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _productId = req.params.productId;
                thisId = parseInt(_productId, 10);
                _context2.next = 5;
                return findProduct("id", thisId);

              case 5:
                productFound = _context2.sent;

                if (productFound) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", errorResponse(res, 404, "ProductId ".concat(_productId, " does not exist in database")));

              case 8:
                _context2.next = 10;
                return Product.destroy({
                  where: {
                    id: productFound.id
                  },
                  cascade: true,
                  include: [{
                    model: Cart
                  }]
                });

              case 10:
                return _context2.abrupt("return", successResponse(res, 200, "Product ".concat(productFound.id, " deleted successfully")));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", errorResponse(res, 500, [_context2.t0]));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));

      function deleteProduct(_x3, _x4) {
        return _deleteProduct.apply(this, arguments);
      }

      return deleteProduct;
    }()
    /**
     * Update a product
     * Route: PATCH: api/v1/products/:productId
     * @param {req} req - HTTP Request object
     * @param {res} res - HTTP Response object
     * @return {res} A product updated information
     * @description update a product in database
     * @memberof ProductController
     */

  }, {
    key: "updateProduct",
    value: function () {
      var _updateProduct2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(req, res) {
        var _productId2, thisId, productFound, newProductDetails, productUpdates;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _productId2 = req.params.productId;
                thisId = parseInt(_productId2, 10);
                _context3.next = 5;
                return findProduct("id", thisId);

              case 5:
                productFound = _context3.sent;

                if (productFound) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("return", errorResponse(res, 404, "ProductId ".concat(_productId2, " does not exist in record")));

              case 8:
                newProductDetails = getUpdatableProductField(req.body); // const newProduct = {
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

                _context3.next = 11;
                return _updateProduct(_productId2, newProductDetails);

              case 11:
                productUpdates = _context3.sent;
                return _context3.abrupt("return", successResponse(res, 200, "Product Id ".concat(_productId2, " updated"), productUpdates[1][0]));

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", errorResponse(res, 500, _context3.t0));

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 15]]);
      }));

      function updateProduct(_x5, _x6) {
        return _updateProduct2.apply(this, arguments);
      }

      return updateProduct;
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
    key: "getProduct",
    value: function () {
      var _getProduct = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var _productId3, thisId, productFound;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _productId3 = req.params.productId;
                thisId = parseInt(_productId3, 10);
                _context4.next = 5;
                return findProduct("id", thisId);

              case 5:
                productFound = _context4.sent;

                if (productFound) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return", errorResponse(res, 404, "ProductId ".concat(_productId3, " does not exist in record")));

              case 8:
                return _context4.abrupt("return", successResponse(res, 200, "Product Found", productFound));

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", errorResponse(res, 500, _context4.t0));

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }));

      function getProduct(_x7, _x8) {
        return _getProduct.apply(this, arguments);
      }

      return getProduct;
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
    key: "getAllProducts",
    value: function () {
      var _getAllProducts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res) {
        var productFound, msg;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return findProduct();

              case 3:
                productFound = _context5.sent;

                if (productFound) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt("return", errorResponse(res, 404, "ProductId ".concat(productId, " does not exist in record")));

              case 6:
                msg = productFound.length > 1 ? "Products Found" : "Product Found";
                return _context5.abrupt("return", successResponse(res, 200, msg, productFound));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", errorResponse(res, 500, _context5.t0));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 10]]);
      }));

      function getAllProducts(_x9, _x10) {
        return _getAllProducts.apply(this, arguments);
      }

      return getAllProducts;
    }()
  }]);
  return ProductController;
}();

exports["default"] = ProductController;