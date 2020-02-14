"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = _interopRequireDefault(require("../models/index"));

var User = _index["default"].User,
    Login = _index["default"].Login;

var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    (0, _classCallCheck2["default"])(this, UserService);
  }

  (0, _createClass2["default"])(UserService, null, [{
    key: "addUser",
    value: function () {
      var _addUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(newUser) {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return User.create(newUser);

              case 3:
                user = _context.sent;
                return _context.abrupt("return", (user === null || user === void 0 ? void 0 : user.dataValues) || user);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function addUser(_x) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "addLogin",
    value: function () {
      var _addLogin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(email, userlogged) {
        var userToLogin, createdLoginUser;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return User.findOne({
                  where: {
                    email: email
                  }
                });

              case 3:
                userToLogin = _context2.sent;

                if (!userToLogin) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 7;
                return Login.create(userlogged);

              case 7:
                createdLoginUser = _context2.sent;
                return _context2.abrupt("return", (createdLoginUser === null || createdLoginUser === void 0 ? void 0 : createdLoginUser.dataValues) || createdLoginUser);

              case 9:
                return _context2.abrupt("return", null);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 12]]);
      }));

      function addLogin(_x2, _x3) {
        return _addLogin.apply(this, arguments);
      }

      return addLogin;
    }()
  }, {
    key: "findUserInUsersDb",
    value: function () {
      var _findUserInUsersDb = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(email) {
        var loggedUser;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return User.findOne({
                  where: {
                    email: email
                  }
                });

              case 3:
                loggedUser = _context3.sent;
                return _context3.abrupt("return", (loggedUser === null || loggedUser === void 0 ? void 0 : loggedUser.dataValues) || loggedUser);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _context3.t0.message);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function findUserInUsersDb(_x4) {
        return _findUserInUsersDb.apply(this, arguments);
      }

      return findUserInUsersDb;
    }()
  }, {
    key: "findUserInLoginsDb",
    value: function () {
      var _findUserInLoginsDb = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(email) {
        var lastLogin;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return Login.findOne({
                  where: {
                    email: email
                  }
                });

              case 3:
                lastLogin = _context4.sent;
                return _context4.abrupt("return", (lastLogin === null || lastLogin === void 0 ? void 0 : lastLogin.dataValues) || lastLogin);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", _context4.t0.message);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function findUserInLoginsDb(_x5) {
        return _findUserInLoginsDb.apply(this, arguments);
      }

      return findUserInLoginsDb;
    }()
  }, {
    key: "addUserInLogins",
    value: function () {
      var _addUserInLogins = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(addUser) {
        var user;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return Login.create(addUser);

              case 3:
                user = _context5.sent;
                return _context5.abrupt("return", (user === null || user === void 0 ? void 0 : user.dataValues) || user);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", _context5.t0.message);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 7]]);
      }));

      function addUserInLogins(_x6) {
        return _addUserInLogins.apply(this, arguments);
      }

      return addUserInLogins;
    }()
  }, {
    key: "updateLogins",
    value: function () {
      var _updateLogins = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(email, loginData) {
        var login;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return Login.update(loginData, {
                  where: {
                    email: email
                  }
                });

              case 3:
                login = _context6.sent;
                return _context6.abrupt("return", (login === null || login === void 0 ? void 0 : login.dataValues) || login);

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", _context6.t0.message);

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 7]]);
      }));

      function updateLogins(_x7, _x8) {
        return _updateLogins.apply(this, arguments);
      }

      return updateLogins;
    }()
  }, {
    key: "findUserById",
    value: function () {
      var _findUserById = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(id) {
        var user;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return User.findOne({
                  where: {
                    id: id
                  }
                });

              case 3:
                user = _context7.sent;
                return _context7.abrupt("return", user.dataValues || user);

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](0);
                throw _context7.t0;

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 7]]);
      }));

      function findUserById(_x9) {
        return _findUserById.apply(this, arguments);
      }

      return findUserById;
    }()
  }]);
  return UserService;
}();

exports["default"] = UserService;