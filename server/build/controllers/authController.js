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

var _moment = _interopRequireDefault(require("moment"));

var _crypto = _interopRequireDefault(require("crypto"));

var _passport = _interopRequireDefault(require("passport"));

var _response = _interopRequireDefault(require("../utils/response"));

var _user = _interopRequireDefault(require("../utils/user"));

var _models = _interopRequireDefault(require("../models"));

var _user2 = _interopRequireDefault(require("../services/user"));

var _jwt = _interopRequireDefault(require("../services/jwt"));

var _hash = require("../helpers/hash");

var Login = _models["default"].Login,
    Reset = _models["default"].Reset;
var errorResponse = _response["default"].errorResponse,
    successResponse = _response["default"].successResponse;
var findUserInUsersDb = _user2["default"].findUserInUsersDb,
    findUserInLoginsDb = _user2["default"].findUserInLoginsDb,
    findUserById = _user2["default"].findUserById;
var getUserSignupData = _user["default"].getUserSignupData,
    jwtPayload = _user["default"].jwtPayload;
var jwtSignUser = _jwt["default"].jwtSignUser,
    setAuthToken = _jwt["default"].setAuthToken;

var AuthController =
/*#__PURE__*/
function () {
  function AuthController() {
    (0, _classCallCheck2["default"])(this, AuthController);
  }

  (0, _createClass2["default"])(AuthController, null, [{
    key: "signup",

    /**
     * @description Register a new user
     * @static
     * @param {*} req
     * @param {*} res
     * @returns Promise {AuthController} A new user
     * @memberof AuthController
     */
    value: function () {
      var _signup = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var userData, existingUser, hashedPassword, newUserData, newUser, id, email, loginData, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userData = getUserSignupData(req.body);
                _context.next = 4;
                return findUserInUsersDb(userData.email);

              case 4:
                existingUser = _context.sent;

                if (!existingUser) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", errorResponse(res, 409, "User is already registered"));

              case 7:
                _context.next = 9;
                return (0, _hash.hash)(userData.password);

              case 9:
                hashedPassword = _context.sent;
                newUserData = userData; // initially we are discouraged to include password in user's field
                // but requirement rules
                // !delete newUserData.password;

                newUserData.password = hashedPassword;
                _context.next = 14;
                return _user2["default"].addUser(newUserData);

              case 14:
                newUser = _context.sent;
                id = newUser.id, email = newUser.email;
                loginData = {
                  email: email,
                  userId: id,
                  password: hashedPassword,
                  lastLogin: new Date()
                };
                _context.next = 19;
                return _user2["default"].addLogin(email, loginData);

              case 19:
                _context.next = 21;
                return jwtSignUser(jwtPayload(newUser));

              case 21:
                token = _context.sent;
                _context.next = 24;
                return setAuthToken("Bearer ".concat(token));

              case 24:
                return _context.abrupt("return", successResponse(res, 201, "Successfully signed up", {
                  token: "Bearer ".concat(token)
                }));

              case 27:
                _context.prev = 27;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", errorResponse(res, 500, _context.t0));

              case 30:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 27]]);
      }));

      function signup(_x, _x2) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
    /** Login User !Deprecated
     * @description Logins a user
     * @static
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     * @returns {string} loginUsers
     */

  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var _req$body, email, password, user, loggedUser, correctPassword, loginData, token;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, email = _req$body.email, password = _req$body.password;

                if (req.body.email) {
                  email = email.trim();
                }

                if (req.body.password) {
                  password = password.trim();
                }

                _context2.next = 6;
                return findUserInUsersDb(email);

              case 6:
                user = _context2.sent;

                if (user) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", errorResponse(res, 401, "Email or password incorrect"));

              case 9:
                _context2.next = 11;
                return findUserInLoginsDb(email);

              case 11:
                loggedUser = _context2.sent;

                if (!loggedUser) {
                  _context2.next = 27;
                  break;
                }

                _context2.next = 15;
                return (0, _hash.compareHash)(loggedUser.password, password);

              case 15:
                correctPassword = _context2.sent;

                if (correctPassword) {
                  _context2.next = 18;
                  break;
                }

                return _context2.abrupt("return", errorResponse(res, 401, "Email or password incorrect"));

              case 18:
                loginData = {
                  lastLogin: new Date()
                };
                _context2.next = 21;
                return jwtSignUser(jwtPayload(user));

              case 21:
                token = _context2.sent;
                _context2.next = 24;
                return setAuthToken("Bearer ".concat(token));

              case 24:
                _context2.next = 26;
                return _user2["default"].updateLogins(email, loginData);

              case 26:
                return _context2.abrupt("return", successResponse(res, 200, "Welcome back, your login was successful", "Bearer ".concat(token)));

              case 27:
                return _context2.abrupt("return", errorResponse(res, 401, "Email or password incorrect"));

              case 30:
                _context2.prev = 30;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", errorResponse(res, 500, _context2.t0));

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 30]]);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /** Logs in a User with JWT
     * @description Logins a user
     * @static
     * @param {object} req - HTTP Request
     * @param {object} res - HTTP Response
     * @returns {string} loginUsers
     */

  }, {
    key: "loginWithJWT",
    value: function () {
      var _loginWithJWT = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;

                _passport["default"].authenticate("local", {
                  session: false
                }, function (err, user, info) {
                  if (err || !user) {
                    return errorResponse(res, 400, "Email or password incorrect");
                  }

                  req.login(user, {
                    session: false
                  },
                  /*#__PURE__*/
                  function () {
                    var _ref = (0, _asyncToGenerator2["default"])(
                    /*#__PURE__*/
                    _regenerator["default"].mark(function _callee3(err) {
                      var loginData, token;
                      return _regenerator["default"].wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (err) {
                                errorResponse(res, 500, err);
                              }

                              loginData = {
                                lastLogin: new Date()
                              }; // generate a signed json web token with the contents of user object and return it in the response

                              _context3.next = 4;
                              return jwtSignUser(jwtPayload(user));

                            case 4:
                              token = _context3.sent;
                              _context3.next = 7;
                              return _user2["default"].updateLogins(user.email, loginData);

                            case 7:
                              _context3.next = 9;
                              return setAuthToken("Bearer ".concat(token));

                            case 9:
                              return _context3.abrupt("return", successResponse(res, 200, "LoggedIn Successfully", "Bearer ".concat(token)));

                            case 10:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3);
                    }));

                    return function (_x7) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                })(req, res);

                _context4.next = 7;
                break;

              case 4:
                _context4.prev = 4;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", errorResponse(res, 500, _context4.t0));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 4]]);
      }));

      function loginWithJWT(_x5, _x6) {
        return _loginWithJWT.apply(this, arguments);
      }

      return loginWithJWT;
    }()
    /**
     *@description The google login method
     * @static
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} User
     * @memberof AuthController
     */

  }, {
    key: "googleLogin",
    value: function () {
      var _googleLogin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(req, res, next) {
        var err, _ref2, id, username, firstName, lastName, email, createdAt;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;

                if (req.user) {
                  _context5.next = 4;
                  break;
                }

                err = "Please sign in with your google account.";
                return _context5.abrupt("return", errorResponse(res, 400, err));

              case 4:
                _ref2 = req.user.dataValues || req.user, id = _ref2.id, username = _ref2.username, firstName = _ref2.firstName, lastName = _ref2.lastName, email = _ref2.email, createdAt = _ref2.createdAt;
                res.redirect("/api/v1/products"); // return (
                //   successResponse(
                //     res,
                //     200,
                //     "success",
                //     (data = { id, username, firstName, lastName, email, createdAt })
                //   ) && res.redirect("/api/v1/users")
                // );

                _context5.next = 11;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", errorResponse(res, 500, _context5.t0));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 8]]);
      }));

      function googleLogin(_x8, _x9, _x10) {
        return _googleLogin.apply(this, arguments);
      }

      return googleLogin;
    }()
    /**
     * @description Generate link to reset a user password
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {AuthController} A reset link for new password
     * @memberof AuthController
     * @type {object} return an object
     */

  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(req, res) {
        var email, user, newReset, resetToken;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                email = req.body.email; // Find user by email

                _context6.next = 4;
                return findUserInUsersDb(email);

              case 4:
                user = _context6.sent;

                if (user) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt("return", errorResponse(res, 500, "Error in sending email"));

              case 7:
                newReset = new Reset({
                  email: user.email,
                  userId: user.id,
                  resetToken: "",
                  expireTime: _moment["default"].utc().add(process.env.TOKENEXPIRY || 18000, "seconds").toLocaleString()
                }); // Generate Reset token

                _context6.next = 10;
                return _crypto["default"].randomBytes(32).toString("hex");

              case 10:
                resetToken = _context6.sent;
                _context6.next = 13;
                return (0, _hash.hash)(resetToken);

              case 13:
                newReset.dataValues.resetToken = _context6.sent;
                _context6.next = 16;
                return Reset.destroy({
                  where: {
                    email: newReset.dataValues.email
                  }
                });

              case 16:
                _context6.next = 18;
                return newReset.save();

              case 18:
                if (resetToken) {
                  _context6.next = 20;
                  break;
                }

                return _context6.abrupt("return", errorResponse(res, 500, "Error in generating token"));

              case 20:
                return _context6.abrupt("return", successResponse(res, 201, "Reset token generated", {
                  resetToken: resetToken,
                  email: newReset.email,
                  resetId: newReset.id,
                  userId: user.id
                }));

              case 23:
                _context6.prev = 23;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", errorResponse(res, 500, _context6.t0));

              case 26:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 23]]);
      }));

      function forgotPassword(_x11, _x12) {
        return _forgotPassword.apply(this, arguments);
      }

      return forgotPassword;
    }()
    /**
     * @description Reset a user password
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {AuthController} A new password record
     * @memberof AuthController
     * @returns {object} Success or failure response on adding a specific user
     */

  }, {
    key: "resetPassword",
    value: function () {
      var _resetPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(req, res) {
        var userId, resetToken, password, user, userRequestReset, _userRequestReset, expireTime, tokenExpireTime, validReset, hashed;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                userId = req.params.userId;
                resetToken = req.query.token;
                password = req.body.password; // Find user by user id

                _context7.next = 6;
                return findUserById(userId);

              case 6:
                user = _context7.sent;

                if (!user) {
                  _context7.next = 13;
                  break;
                }

                _context7.next = 10;
                return Reset.findOne({
                  where: {
                    userId: user.id
                  }
                });

              case 10:
                userRequestReset = _context7.sent;
                _context7.next = 14;
                break;

              case 13:
                null;

              case 14:
                if (!(user && userRequestReset)) {
                  _context7.next = 33;
                  break;
                }

                // Check if reset token is not expired
                _userRequestReset = userRequestReset, expireTime = _userRequestReset.expireTime;
                tokenExpireTime = _moment["default"].utc(expireTime); // If reset link is valid and not expired

                _context7.t0 = (0, _moment["default"])().isBefore(tokenExpireTime);

                if (!_context7.t0) {
                  _context7.next = 22;
                  break;
                }

                _context7.next = 21;
                return (0, _hash.compareHash)(userRequestReset.resetToken, resetToken);

              case 21:
                _context7.t0 = _context7.sent;

              case 22:
                validReset = _context7.t0;

                if (!validReset) {
                  _context7.next = 32;
                  break;
                }

                _context7.next = 26;
                return (0, _hash.hash)(password);

              case 26:
                hashed = _context7.sent;
                _context7.next = 29;
                return Login.update({
                  password: hashed,
                  lastLogin: new Date()
                }, {
                  where: {
                    email: userRequestReset.email
                  }
                });

              case 29:
                _context7.next = 31;
                return Reset.destroy({
                  where: {
                    email: userRequestReset.email
                  }
                });

              case 31:
                return _context7.abrupt("return", successResponse(res, 200, "Password updated successfully"));

              case 32:
                return _context7.abrupt("return", errorResponse(res, 400, "Invalid or expired reset token"));

              case 33:
                return _context7.abrupt("return", errorResponse(res, 400, "Invalid or expired reset token"));

              case 36:
                _context7.prev = 36;
                _context7.t1 = _context7["catch"](0);
                return _context7.abrupt("return", errorResponse(res, 500, _context7.t1));

              case 39:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 36]]);
      }));

      function resetPassword(_x13, _x14) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
  }]);
  return AuthController;
}();

exports["default"] = AuthController;