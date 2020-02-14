"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Response =
/*#__PURE__*/
function () {
  function Response() {
    (0, _classCallCheck2["default"])(this, Response);
  }

  (0, _createClass2["default"])(Response, null, [{
    key: "errorResponse",
    value: function errorResponse(res, statusCode, err) {
      return res.status(statusCode).json({
        status: "error",
        error: err
      });
    }
  }, {
    key: "successResponse",
    value: function successResponse(res, statusCode, msg, data) {
      var resp = {
        status: "success",
        message: msg
      };
      data ? resp.data = data : "";
      return res.status(statusCode).json(resp);
    }
  }, {
    key: "methodNotAllowed",
    value: function methodNotAllowed(_, res) {
      var err = ["Method Not Allowed"];
      Response.errorResponse(res, 405, err[0]);
    }
  }, {
    key: "pageNotFound",
    value: function pageNotFound(_, res) {
      var err = ["Page Not Found"];
      Response.errorResponse(res, 404, err[0]);
    }
  }]);
  return Response;
}();

exports["default"] = Response;