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

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _keys = _interopRequireDefault(require("../config/keys"));

_dotenv["default"].config();

var JWTService =
/*#__PURE__*/
function () {
  function JWTService() {
    (0, _classCallCheck2["default"])(this, JWTService);
  }

  (0, _createClass2["default"])(JWTService, null, [{
    key: "jwtSignUser",
    value: function () {
      var _jwtSignUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(payload) {
        var exp,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                exp = _args.length > 1 && _args[1] !== undefined ? _args[1] : "1h";
                _context.next = 3;
                return _jsonwebtoken["default"].sign(payload, _keys["default"].secretOrPrivateKey, {
                  expiresIn: exp
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function jwtSignUser(_x) {
        return _jwtSignUser.apply(this, arguments);
      }

      return jwtSignUser;
    }()
  }, {
    key: "jwtDecode",
    value: function () {
      var _jwtDecode = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(token) {
        var decoded;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _jsonwebtoken["default"].decode(token, {
                  secret: _keys["default"].secretOrPrivateKey
                });

              case 2:
                decoded = _context2.sent;
                return _context2.abrupt("return", decoded);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function jwtDecode(_x2) {
        return _jwtDecode.apply(this, arguments);
      }

      return jwtDecode;
    }()
  }, {
    key: "setAuthToken",
    value: function setAuthToken(token) {
      if (token) {
        // Apply to every request
        _axios["default"].defaults.headers.common["Authorization"] = token;
      } else {
        // Delete Auth header
        delete _axios["default"].defaults.headers.common["Authorization"];
      }
    }
  }]);
  return JWTService;
}();

exports["default"] = JWTService;