"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _api = _interopRequireDefault(require("./api"));

var router = (0, _express.Router)();
var API_VERSION = "/api/v1";
router.use(API_VERSION, _api["default"]);
var _default = router;
exports["default"] = _default;