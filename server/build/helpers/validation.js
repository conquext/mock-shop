"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _faker = _interopRequireDefault(require("faker"));

var Validation =
/*#__PURE__*/
function () {
  function Validation() {
    (0, _classCallCheck2["default"])(this, Validation);
  }

  (0, _createClass2["default"])(Validation, null, [{
    key: "isEmpty",
    value: function isEmpty(value) {
      return value === null || value === undefined || (0, _typeof2["default"])(value) === "object" && Object.keys(value).length === 0 || typeof value === "string" && value.trim().length === 0;
    }
  }, {
    key: "isValidEmail",
    value: function isValidEmail(email) {
      var re = /^\S+@\S+[\.][0-9a-z]+$/;
      return re.test(email);
    }
  }, {
    key: "isValidName",
    value: function isValidName(name) {
      var re = /^[A-Za-z]+$/;
      return name.length > 3 && re.test(name);
    }
  }, {
    key: "isValidSentence",
    value: function isValidSentence(sentence) {
      sentence = sentence.toLowerCase();
      var re = /^[A-Za-z][a-z\s]+$/;
      return re.test(sentence);
    }
  }, {
    key: "isValidProductName",
    value: function isValidProductName(name) {
      return name.length > 2 && name.length < 10 && Validation.isValidSentence(name);
    }
  }, {
    key: "isValidUsername",
    value: function isValidUsername(username) {
      return username.length > 2;
    }
  }, {
    key: "isValidInt",
    value: function isValidInt(number) {
      var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
      return !isNaN(number) && /^[0-9]+$/.test(number) && number >= min && number <= max;
    }
  }, {
    key: "isValidPassword",
    value: function isValidPassword(password) {
      return password.length > 3;
    }
  }, {
    key: "isValidDecimal",
    value: function isValidDecimal(number) {
      return !/^\s*$/.test(number) && !isNaN(number) && number > 0;
    }
  }, {
    key: "isValidProductDescription",
    value: function isValidProductDescription(pdesc) {
      return Validation.isValidSentence && pdesc.length > 5;
    }
  }, {
    key: "validateSignup",
    value: function validateSignup(userData) {
      var errors = {};

      if (!userData.username) {
        userData.username = _faker["default"].internet.userName(); // errors.username = "Username is required";
      } else if (!Validation.isValidUsername(userData.username)) {
        errors.username = "Username must contain at least 3 characters";
      }

      if (!userData.firstName) {
        errors.firstName = "First Name is required";
      } else if (!Validation.isValidName(userData.firstName)) {
        errors.firstName = "First Name is invalid or less 4 characters";
      }

      if (!userData.lastName) {
        errors.lastName = "Last Name is required";
      } else if (!Validation.isValidName(userData.lastName)) {
        errors.lastName = "Last Name is invalid or less than 4 characters";
      }

      if (!userData.email) {
        errors.email = "Email is required";
      } else if (!Validation.isValidEmail(userData.email)) {
        errors.email = "Email is invalid";
      }

      if (!userData.password) {
        errors.password = "Password is required";
      } else if (!Validation.isValidPassword(userData.password)) {
        errors.password = "Password must contain at least 4 characters";
      }

      return {
        errors: errors,
        isValid: Validation.isEmpty(errors)
      };
    }
  }, {
    key: "validateLogin",
    value: function validateLogin(userData) {
      var errors = {};

      if (!userData.email) {
        errors.email = "Email is required";
      } else if (!Validation.isValidEmail(userData.email)) {
        errors.email = "Email is invalid";
      }

      if (!userData.password) {
        errors.password = "Password is required";
      } else if (!Validation.isValidPassword(userData.password)) {
        errors.password = "Password must contain at least 4 characters";
      }

      return {
        errors: errors,
        isValid: Validation.isEmpty(errors)
      };
    }
  }, {
    key: "validateForgotPassword",
    value: function validateForgotPassword(userData) {
      var errors = {};

      if (!userData.email) {
        errors.email = "Email is required";
      } else if (!Validation.isValidEmail(userData.email)) {
        errors.email = "Email is invalid";
      }

      return {
        errors: errors,
        isValid: Validation.isEmpty(errors)
      };
    }
  }, {
    key: "validateResetPassword",
    value: function validateResetPassword(userData) {
      var errors = {};

      if (!userData.password) {
        errors.password = "New password is required";
      } else if (!Validation.isValidPassword(userData.password)) {
        errors.password = "Password is invalid";
      }

      if (!userData.confirmPassword) {
        errors.confirmPassword = "Confirm your password";
      }

      if (userData.password !== userData.confirmPassword) {
        errors.confirmPassword = "Passwords must match";
      }

      return {
        errors: errors,
        isValid: Validation.isEmpty(errors)
      };
    }
  }, {
    key: "validateProduct",
    value: function validateProduct(productData) {
      var errors = {};

      if (!productData.productName) {
        errors.productName = "Product name is required";
      } else if (!Validation.isValidProductName(productData.productName)) {
        errors.productName = "Product name must be greater than 2, less than 15 and contain no special characters";
      }

      if (!productData.description) {
        errors.description = "Product description is required";
      } else if (!Validation.isValidProductDescription(productData.description)) {
        errors.description = "Description must be greater than 5 and contains no special characters";
      }

      if (!productData.category) {
        errors.category = "Product category is required";
      } else if (!Validation.isValidProductName(productData.category)) {
        errors.category = "Category must be greater than 2, less than 15 and contain no special characters";
      }

      if (!productData.price) {
        errors.price = "Product price is required";
      } else if (!Validation.isValidDecimal(productData.price)) {
        errors.price = "Price is invalid";
      }

      if (!productData.quantity) {
        errors.quantity = "Quantity is required";
      } else if (!Validation.isValidInt(productData.quantity)) {
        errors.quantity = "Quantity must me an integer";
      }

      return {
        errors: errors,
        isValid: Validation.isEmpty(errors)
      };
    }
  }, {
    key: "validateProductUpdate",
    value: function validateProductUpdate(productData) {
      var errors = {};
      var knownKeys = {
        productName: function productName(val) {
          return Validation.isValidProductName(val) ? "" : errors.productName = "Product name must be greater than 2, less than 15 and contain no special characters";
        },
        description: function description(val) {
          return Validation.isValidProductDescription(val) ? "" : errors.description = "Description must be greater than 5 and contains no special characters";
        },
        category: function category(val) {
          return Validation.isValidProductName(val) ? "" : errors.category = "Category must be greater than 2, less than 15 and contain no special characters";
        },
        price: function price(val) {
          return Validation.isValidDecimal(val) ? "" : errors.price = "Price is invalid";
        },
        quantity: function quantity(val) {
          return Validation.isValidInt(val) ? "" : errors.quantity = "Quantity must me an integer";
        },
        inStock: function inStock(val) {
          return val.toString() === "true" || val.toString() === "false" ? "" : errors.inStock = "Instock must me either true or false";
        }
      };
      Object.entries(productData).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        if (Object.prototype.hasOwnProperty.call(knownKeys, key)) {
          knownKeys[key](value);
        }
      });
      return {
        errors: errors,
        isValid: Validation.isEmpty(errors)
      };
    }
  }, {
    key: "validateCartAdd",
    value: function validateCartAdd(cartItem) {
      var errors = {};

      if (!cartItem.productId) {
        errors.productId = "Product Id is required";
      } else if (!isNaN(cartItem.productId)) {
        errors.productId = "Product Id is invalid";
      }

      if (!cartItem.quantity) {
        // errors.quantity = "Product quantity is required";
        cartItem.quantity = 1;
      } else if (!Validation.isValidInt(cartItem.quantity)) {
        errors.quantity = "Qauntity must be an integer";
      }

      return {
        errors: errors,
        isValid: Validation.isEmpty(errors)
      };
    }
  }]);
  return Validation;
}();

exports["default"] = Validation;