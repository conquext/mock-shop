"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var UserUtils =
/*#__PURE__*/
function () {
  function UserUtils() {
    (0, _classCallCheck2["default"])(this, UserUtils);
  }

  (0, _createClass2["default"])(UserUtils, null, [{
    key: "getPublicUserFields",
    value: function getPublicUserFields(user) {
      var data = UserUtils.getReqBody(user);
      data === null || data === void 0 ? true : delete data.password;
      data === null || data === void 0 ? true : delete data.confirmPassword;
      return data;
    }
  }, {
    key: "getReqBody",
    value: function getReqBody(body) {
      var data = {};
      Object.entries(body).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        data[key] = value;
      });
      return data;
    }
  }, {
    key: "jwtPayload",
    value: function jwtPayload(user) {
      var data = {};
      data.id = user === null || user === void 0 ? void 0 : user.id, data.username = user === null || user === void 0 ? void 0 : user.username, data.email = user === null || user === void 0 ? void 0 : user.email, data.firstName = user === null || user === void 0 ? void 0 : user.firstName, data.lastName = user === null || user === void 0 ? void 0 : user.lastName, data.isAdmin = (user === null || user === void 0 ? void 0 : user.role) == "admin";
      return data;
    }
  }, {
    key: "getUserSignupData",
    value: function getUserSignupData(_req) {
      return {
        username: _req.username,
        firstName: _req.firstName,
        lastName: _req.lastName,
        email: _req.email,
        password: _req.password,
        role: _req.role,
        isAdmin: _req.isAdmin || _req.role === "admin"
      };
    }
  }]);
  return UserUtils;
}();

exports["default"] = UserUtils;