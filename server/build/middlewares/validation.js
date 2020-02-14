"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _response = _interopRequireDefault(require("../utils/response"));

var _validation = _interopRequireDefault(require("../helpers/validation"));

var _product = _interopRequireDefault(require("../utils/product"));

var getUpdatableProductField = _product["default"].getUpdatableProductField;
var errorResponse = _response["default"].errorResponse;
var validateLogin = _validation["default"].validateLogin,
    validateSignup = _validation["default"].validateSignup,
    validateForgotPassword = _validation["default"].validateForgotPassword,
    validateResetPassword = _validation["default"].validateResetPassword,
    validateProduct = _validation["default"].validateProduct,
    validateProductUpdate = _validation["default"].validateProductUpdate,
    validateCartAdd = _validation["default"].validateCartAdd;

var ValidationMiddleware =
/*#__PURE__*/
function () {
  function ValidationMiddleware() {
    (0, _classCallCheck2["default"])(this, ValidationMiddleware);
  }

  (0, _createClass2["default"])(ValidationMiddleware, null, [{
    key: "loginCheck",
    value: function loginCheck(req, res, next) {
      try {
        var _validateLogin = validateLogin(req.body),
            errors = _validateLogin.errors,
            isValid = _validateLogin.isValid; // Check validation


        if (!isValid) {
          return errorResponse(res, 400, errors);
        }

        next();
      } catch (error) {
        return errorResponse(res, 500, error);
      }
    }
  }, {
    key: "signupCheck",
    value: function signupCheck(req, res, next) {
      try {
        var _validateSignup = validateSignup(req.body),
            errors = _validateSignup.errors,
            isValid = _validateSignup.isValid; // Check validation


        if (!isValid) {
          return errorResponse(res, 400, errors);
        }

        next();
      } catch (error) {
        return errorResponse(res, 500, error);
      }
    }
  }, {
    key: "forgotPasswordCheck",
    value: function forgotPasswordCheck(req, res, next) {
      try {
        var _validateForgotPasswo = validateForgotPassword(req.body),
            errors = _validateForgotPasswo.errors,
            isValid = _validateForgotPasswo.isValid; // Check validation


        if (!isValid) {
          return errorResponse(res, 400, errors);
        }

        next();
      } catch (error) {
        return errorResponse(res, 500, error);
      }
    }
  }, {
    key: "resetPasswordCheck",
    value: function resetPasswordCheck(req, res, next) {
      try {
        var _validateResetPasswor = validateResetPassword(req.body),
            errors = _validateResetPasswor.errors,
            isValid = _validateResetPasswor.isValid; // Check validation


        if (!isValid) {
          return errorResponse(res, 400, errors);
        }

        next();
      } catch (error) {
        return errorResponse(res, 500, error);
      }
    }
  }, {
    key: "productCheck",
    value: function productCheck(req, res, next) {
      try {
        var _validateProduct = validateProduct(req.body),
            errors = _validateProduct.errors,
            isValid = _validateProduct.isValid; // Check validation


        if (!isValid) {
          return errorResponse(res, 400, errors);
        }

        next();
      } catch (error) {
        return errorResponse(res, 500, error);
      }
    }
  }, {
    key: "updateProductCheck",
    value: function updateProductCheck(req, res, next) {
      try {
        var _validateProductUpdat = validateProductUpdate(getUpdatableProductField(req.body)),
            errors = _validateProductUpdat.errors,
            isValid = _validateProductUpdat.isValid; // Check validation


        if (!isValid) {
          return errorResponse(res, 400, errors);
        }

        next();
      } catch (error) {
        return errorResponse(res, 500, error);
      }
    }
  }, {
    key: "cartAddCheck",
    value: function cartAddCheck(req, res, next) {
      try {
        var _validateCartAdd = validateCartAdd(req.body),
            errors = _validateCartAdd.errors,
            isValid = _validateCartAdd.isValid; // Check validation


        if (!isValid) {
          return errorResponse(res, 400, errors);
        }

        next();
      } catch (error) {
        return errorResponse(res, 500, error);
      }
    }
  }]);
  return ValidationMiddleware;
}();

exports["default"] = ValidationMiddleware;