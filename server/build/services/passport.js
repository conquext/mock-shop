"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportGoogleOauth = require("passport-google-oauth2");

var _user = _interopRequireDefault(require("./user"));

var _hash = require("../helpers/hash");

var _keys = _interopRequireDefault(require("../config/keys"));

var _models = _interopRequireDefault(require("../models"));

var JwtStrategy = require("passport-jwt").Strategy;

var ExtractJwt = require("passport-jwt").ExtractJwt;

var LocalStrategy = require("passport-local").Strategy;

var User = _models["default"].User;
var addUser = _user["default"].addUser,
    findUserInUsersDb = _user["default"].findUserInUsersDb,
    findUserInLoginsDb = _user["default"].findUserInLoginsDb;

_passport["default"].serializeUser(function (user, done) {
  return done(null, user.id);
});

_passport["default"].deserializeUser(
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(id, done) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findOne({
              where: {
                id: id
              }
            });

          case 2:
            user = _context.sent;
            return _context.abrupt("return", done(null, user));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

_passport["default"].use(new _passportGoogleOauth.Strategy({
  clientID: _keys["default"].clientID,
  clientSecret: _keys["default"].clientSecret,
  callbackURL: _keys["default"].callbackURL,
  passReqToCallback: true
},
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(request, accessToken, refreshToken, profile, done) {
    var userDetails, email, existingUser, newUser, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            userDetails = profile._json;
            email = userDetails.email;
            _context2.next = 5;
            return User.findOne({
              where: {
                email: email
              },
              raw: true
            });

          case 5:
            existingUser = _context2.sent;

            if (!existingUser) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", done(null, existingUser));

          case 8:
            newUser = {
              username: userDetails.given_name,
              firstName: userDetails.given_name,
              lastName: userDetails.family_name,
              email: userDetails.email,
              role: "user"
            };
            _context2.next = 11;
            return addUser(newUser);

          case 11:
            user = _context2.sent;
            done(null, user);
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            done(_context2.t0, null);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));

  return function (_x3, _x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}()));

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _keys["default"].secretOrPrivateKey;

_passport["default"].use(new JwtStrategy(opts,
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(jwt_payload, done) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!jwt_payload.id) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", done(null, jwt_payload));

          case 3:
            return _context3.abrupt("return", done(null, false));

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", done(null, false));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 6]]);
  }));

  return function (_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}()));

_passport["default"].use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(email, password, cb) {
    var user, loggedUser, correctPassword;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return findUserInUsersDb(email);

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", cb(null, false, {
              message: "No user found."
            }));

          case 6:
            _context4.next = 8;
            return findUserInLoginsDb(user.email);

          case 8:
            loggedUser = _context4.sent;

            if (!loggedUser) {
              _context4.next = 15;
              break;
            }

            _context4.next = 12;
            return (0, _hash.compareHash)(loggedUser.password, password);

          case 12:
            correctPassword = _context4.sent;

            if (correctPassword) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", cb(null, false, {
              message: "Incorrect password."
            }));

          case 15:
            return _context4.abrupt("return", cb(null, user, {
              message: "User Found"
            }));

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", done(null, false));

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 18]]);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}()));