"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};
exports["default"] = _default;