"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth"));

var _users = _interopRequireDefault(require("./users"));

var _products = _interopRequireDefault(require("./products"));

var _passport = _interopRequireDefault(require("passport"));

var router = (0, _express.Router)();
router.use("/auth/", _auth["default"]);
router.use("/users/", _passport["default"].authenticate("jwt", {
  session: false
}), _users["default"]);
router.use("/products/", _passport["default"].authenticate("jwt", {
  session: false
}), _products["default"]);
var _default = router;
exports["default"] = _default;