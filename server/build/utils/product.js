"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../models/index"));

var Product = _index["default"].Product;

var ProductUtils =
/*#__PURE__*/
function () {
  function ProductUtils() {
    (0, _classCallCheck2["default"])(this, ProductUtils);
  }

  (0, _createClass2["default"])(ProductUtils, null, [{
    key: "getProductField",
    value: function getProductField(body) {
      var data = {};
      var acceptedFields = ["id", "name", "description", "category", "imageUrl", "price", "quantity", "inStock"];
      Object.entries(body).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (acceptedFields.includes(key)) {
          data[key] = value;
        }
      });
      return data;
    }
  }, {
    key: "getUpdatableProductField",
    value: function getUpdatableProductField(body) {
      var data = ProductUtils.getProductField(body);
      data === null || data === void 0 ? true : delete data.id;
      return data;
    }
  }, {
    key: "addProduct",
    value: function () {
      var _addProduct = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(productData) {
        var product;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Product.create(productData);

              case 3:
                product = _context.sent;
                return _context.abrupt("return", (product === null || product === void 0 ? void 0 : product.dataValues) || product);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function addProduct(_x) {
        return _addProduct.apply(this, arguments);
      }

      return addProduct;
    }()
  }, {
    key: "updateProduct",
    value: function () {
      var _updateProduct = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(id, updates) {
        var productToUpdate, product;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return ProductUtils.findProduct("id", id);

              case 3:
                productToUpdate = _context2.sent;

                if (!productToUpdate) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 7;
                return Product.update(updates, {
                  where: {
                    id: id
                  },
                  attributes: {
                    exclude: ["id"]
                  },
                  returning: true
                });

              case 7:
                product = _context2.sent;
                return _context2.abrupt("return", (product === null || product === void 0 ? void 0 : product.dataValues) || product);

              case 9:
                return _context2.abrupt("return", null);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 12]]);
      }));

      function updateProduct(_x2, _x3) {
        return _updateProduct.apply(this, arguments);
      }

      return updateProduct;
    }()
  }, {
    key: "findProduct",
    value: function () {
      var _findProduct = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(key, value) {
        var product, _product;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (!(key || value)) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 4;
                return Product.findOne({
                  where: (0, _defineProperty2["default"])({}, key, value)
                });

              case 4:
                product = _context3.sent;
                _context3.next = 10;
                break;

              case 7:
                _context3.next = 9;
                return Product.findAll({
                  raw: true
                });

              case 9:
                product = _context3.sent;

              case 10:
                return _context3.abrupt("return", ((_product = product) === null || _product === void 0 ? void 0 : _product.dataValues) || product);

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 13]]);
      }));

      function findProduct(_x4, _x5) {
        return _findProduct.apply(this, arguments);
      }

      return findProduct;
    }()
  }, {
    key: "inStock",
    value: function () {
      var _inStock = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(productOrkey, productId) {
        var product;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (productId) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", productOrkey.inStock);

              case 2:
                product = ProductUtils.findProduct(productOrkey, value);

                if (product.inStock) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", false);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function inStock(_x6, _x7) {
        return _inStock.apply(this, arguments);
      }

      return inStock;
    }()
  }]);
  return ProductUtils;
}();

exports["default"] = ProductUtils;