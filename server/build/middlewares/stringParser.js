"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Trims every incoming string
 * @param {Object} req
 * @param {Object} res
 * @param {Callback} next
 * @returns {Callback} next middleware in the middleware chain.
 */
var stringParser = function stringParser(req, res, next) {
  var stringKeys = Object.keys(req.body);
  stringKeys.forEach(function (key) {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].trim();
    }
  });
  return next();
};

var _default = stringParser;
exports["default"] = _default;