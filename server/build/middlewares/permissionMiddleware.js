"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _response = _interopRequireDefault(require("../utils/response"));

var errorResponse = _response["default"].errorResponse;

var PermissionsMiddleware =
/*#__PURE__*/
function () {
  function PermissionsMiddleware() {
    (0, _classCallCheck2["default"])(this, PermissionsMiddleware);
  }

  (0, _createClass2["default"])(PermissionsMiddleware, null, [{
    key: "requireAdmin",
    value: function requireAdmin(req, res, next) {
      try {
        var _req$user;

        if (!(req === null || req === void 0 ? void 0 : (_req$user = req.user) === null || _req$user === void 0 ? void 0 : _req$user.isAdmin)) {
          return errorResponse(res, 403, "Unauthorized");
        }

        next();
      } catch (err) {
        return errorResponse(res, 500, err);
      }
    }
  }, {
    key: "requireOwnerAuth",
    value: function requireOwnerAuth(req, res, next) {
      try {
        var _req$user2, _req$user3, _req$params;

        if ((req === null || req === void 0 ? void 0 : (_req$user2 = req.user) === null || _req$user2 === void 0 ? void 0 : _req$user2.id.toString()) && (req === null || req === void 0 ? void 0 : (_req$user3 = req.user) === null || _req$user3 === void 0 ? void 0 : _req$user3.id.toString()) !== (req === null || req === void 0 ? void 0 : (_req$params = req.params) === null || _req$params === void 0 ? void 0 : _req$params.userId.toString())) {
          return errorResponse(res, 403, "Unauthorized");
        }

        next();
      } catch (err) {
        return errorResponse(res, 500, err);
      }
    }
  }]);
  return PermissionsMiddleware;
}();

exports["default"] = PermissionsMiddleware;