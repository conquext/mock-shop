"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../models/index"));

var Cart = _index["default"].Cart;

var CartUtils =
/*#__PURE__*/
function () {
  function CartUtils() {
    (0, _classCallCheck2["default"])(this, CartUtils);
  }

  (0, _createClass2["default"])(CartUtils, null, [{
    key: "createCart",
    value: function () {
      var _createCart = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(cartData) {
        var newCart;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Cart.create(cartData);

              case 3:
                newCart = _context.sent;
                return _context.abrupt("return", newCart);

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

      function createCart(_x) {
        return _createCart.apply(this, arguments);
      }

      return createCart;
    }()
  }, {
    key: "findOrCreateCart",
    value: function () {
      var _findOrCreateCart = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(cartData) {
        var newCart;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Cart.findOrCreate({
                  where: {
                    id: cartData.id
                  }
                });

              case 3:
                newCart = _context2.sent;
                return _context2.abrupt("return", newCart);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function findOrCreateCart(_x2) {
        return _findOrCreateCart.apply(this, arguments);
      }

      return findOrCreateCart;
    }()
  }, {
    key: "updateCart",
    value: function () {
      var _updateCart = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(id, updates) {
        var cartToUpdate, cart;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return CartUtils.findCart("id", id);

              case 3:
                cartToUpdate = _context3.sent;

                if (!cartToUpdate) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 7;
                return Cart.update(updates, {
                  where: {
                    id: id
                  },
                  attributes: {
                    exclude: ["id"]
                  },
                  returning: true
                });

              case 7:
                cart = _context3.sent;
                return _context3.abrupt("return", cart);

              case 9:
                return _context3.abrupt("return", null);

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 12]]);
      }));

      function updateCart(_x3, _x4) {
        return _updateCart.apply(this, arguments);
      }

      return updateCart;
    }()
  }, {
    key: "findCart",
    value: function () {
      var _findCart = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(key, value) {
        var cart;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Cart.findOne({
                  where: (0, _defineProperty2["default"])({}, key, value)
                });

              case 3:
                cart = _context4.sent;
                return _context4.abrupt("return", cart);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function findCart(_x5, _x6) {
        return _findCart.apply(this, arguments);
      }

      return findCart;
    }()
  }, {
    key: "findAllCarts",
    value: function () {
      var _findAllCarts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(key, value) {
        var cart;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;

                if (!(!key && !value)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return cart.findAll({
                  raw: true
                });

              case 4:
                cart = _context5.sent;
                _context5.next = 17;
                break;

              case 7:
                if (!value) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 10;
                return Cart.findAll({
                  where: (0, _defineProperty2["default"])({}, key, value)
                });

              case 10:
                cart = _context5.sent;
                _context5.next = 17;
                break;

              case 13:
                if (!(Object.keys(key).length > 0)) {
                  _context5.next = 17;
                  break;
                }

                _context5.next = 16;
                return Cart.findAll({
                  where: key
                });

              case 16:
                cart = _context5.sent;

              case 17:
                return _context5.abrupt("return", cart);

              case 20:
                _context5.prev = 20;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 23:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 20]]);
      }));

      function findAllCarts(_x7, _x8) {
        return _findAllCarts.apply(this, arguments);
      }

      return findAllCarts;
    }()
  }, {
    key: "getCartField",
    value: function () {
      var _getCartField = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(withoutId, body) {
        var data, acceptedFields;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                data = {};
                acceptedFields = ["id", "userId", "price", "quantity"];
                if (withoutId) acceptedFields = acceptedFields.filter(function (field) {
                  return field !== "id";
                });
                Object.entries(body).forEach(function (_ref) {
                  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                      key = _ref2[0],
                      value = _ref2[1];

                  if (acceptedFields.includes(key)) {
                    data[key] = value;
                  }
                });
                return _context6.abrupt("return", data);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getCartField(_x9, _x10) {
        return _getCartField.apply(this, arguments);
      }

      return getCartField;
    }()
  }, {
    key: "getCartDisplayInfo",
    value: function getCartDisplayInfo(body, includeTotal) {
      try {
        var data = [];
        var acceptedFields = ["productId", "price", "quantity", "updatedAt"];
        body.forEach(function (b, i) {
          var tempObj = {};
          Object.entries(b).forEach(function (_ref3) {
            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                key = _ref4[0],
                value = _ref4[1];

            if (acceptedFields.includes(key)) {
              tempObj[key] = value;
            }
          });
          data.push(tempObj);
        });

        if (includeTotal) {
          var totalInfo = {};
          totalInfo["itemsInCart"] = data.length;
          totalInfo["totalPrice"] = data.reduce(function (acc, cur) {
            return acc + cur.price * cur.quantity;
          }, 0);
          data.push(totalInfo);
        }

        return data;
      } catch (err) {
        throw error;
      }
    }
  }]);
  return CartUtils;
}();

exports["default"] = CartUtils;