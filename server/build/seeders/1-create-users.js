"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// const userSeed = require("../helpers/seed").userSeed;
var faker = require("faker");

var hash = require("../helpers/hash").hash;

var role = ["user", "admin"];
var password = ["password1", "password2"];
module.exports = {
  up: function () {
    var _up = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      var passwHash, users, i, user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return hash(password[0]);

            case 2:
              _context.t0 = _context.sent;
              _context.next = 5;
              return hash(password[1]);

            case 5:
              _context.t1 = _context.sent;
              passwHash = [_context.t0, _context.t1];
              users = [];

              for (i = 0; i <= 10; i++) {
                user = {};
                user.username = "username".concat(i);
                user.firstName = faker.name.firstName() || "Firstname".concat(i);
                user.lastName = faker.name.lastName() || "Lastname".concat(i);
                user.email = "email".concat(i, "@email.com");
                user.password = passwHash[i % 2];
                user.isAdmin = role[i % 2] === "admin";
                user.role = role[i % 2];
                user.createdAt = new Date();
                user.updatedAt = new Date();
                users.push(user);
              }

              return _context.abrupt("return", queryInterface.bulkInsert("users", users));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function up(_x, _x2) {
      return _up.apply(this, arguments);
    }

    return up;
  }(),
  down: function down(queryInterface) {
    return queryInterface.bulkDelete("users", null, {});
  }
};