import moment from "moment";
import crypto from "crypto";
import passport from "passport";
import Response from "../utils/response";
import userUtils from "../utils/user";
import db from "../models";
import userService from "../services/user";
import JWT from "../services/jwt";
import { hash, compareHash } from "../helpers/hash";

const { Login, Reset } = db;
const { errorResponse, successResponse } = Response;
const { findUserInUsersDb, findUserInLoginsDb, findUserById } = userService;
const { getUserSignupData, jwtPayload } = userUtils;
const { jwtSignUser, setAuthToken } = JWT;

export default class AuthController {
  /**
   * @description Register a new user
   * @static
   * @param {*} req
   * @param {*} res
   * @returns Promise {AuthController} A new user
   * @memberof AuthController
   */
  static async signup(req, res) {
    try {
      const userData = getUserSignupData(req.body);

      const existingUser = await findUserInUsersDb(userData.email);
      if (existingUser) {
        return errorResponse(res, 409, "User is already registered");
      }

      const hashedPassword = await hash(userData.password);
      const newUserData = userData;
      // initially we are discouraged to include password in user's field
      // but requirement rules

      // !delete newUserData.password;
      newUserData.password = hashedPassword;

      let newUser = await userService.addUser(newUserData);
      const { id, email } = newUser;
      const loginData = {
        email,
        userId: id,
        password: hashedPassword,
        lastLogin: new Date()
      };

      await userService.addLogin(email, loginData);
      const token = await jwtSignUser(jwtPayload(newUser));
      await setAuthToken(`Bearer ${token}`);

      return successResponse(res, 201, "Successfully signed up", {
        token: `Bearer ${token}`
      });

      // res.redirect("/api/v1/products");
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  /** Login User !Deprecated
   * @description Logins a user
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {string} loginUsers
   */
  static async login(req, res) {
    try {
      let { email, password } = req.body;
      if (req.body.email) {
        email = email.trim();
      }
      if (req.body.password) {
        password = password.trim();
      }

      const user = await findUserInUsersDb(email);
      if (!user) {
        return errorResponse(res, 401, "Email or password incorrect");
      }

      const loggedUser = await findUserInLoginsDb(email);

      if (loggedUser) {
        const correctPassword = await compareHash(
          loggedUser.password,
          password
        );
        if (!correctPassword) {
          return errorResponse(res, 401, "Email or password incorrect");
        }
        const loginData = {
          lastLogin: new Date()
        };

        const token = await jwtSignUser(jwtPayload(user));
        await setAuthToken(`Bearer ${token}`);

        await userService.updateLogins(email, loginData);
        return successResponse(
          res,
          200,
          "Welcome back, your login was successful",
          `Bearer ${token}`
        );
      }
      return errorResponse(res, 401, "Email or password incorrect");
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  /** Logs in a User with JWT
   * @description Logins a user
   * @static
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @returns {string} loginUsers
   */
  static async loginWithJWT(req, res) {
    try {
      passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
          return errorResponse(res, 400, "Email or password incorrect");
        }
        req.login(user, { session: false }, async err => {
          if (err) {
            errorResponse(res, 500, err);
          }

          const loginData = {
            lastLogin: new Date()
          };

          // generate a signed json web token with the contents of user object and return it in the response
          const token = await jwtSignUser(jwtPayload(user));
          await userService.updateLogins(user.email, loginData);
          await setAuthToken(`Bearer ${token}`);

          return successResponse(
            res,
            200,
            "LoggedIn Successfully",
            `Bearer ${token}`
          );
        });
      })(req, res);
    } catch (e) {
      return errorResponse(res, 500, e);
    }
  }

  /**
   *@description The google login method
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} User
   * @memberof AuthController
   */
  static async googleLogin(req, res, next) {
    try {
      if (!req.user) {
        const err = "Please sign in with your google account.";
        return errorResponse(res, 400, err);
      }
      const { id, username, firstName, lastName, email, createdAt } =
        req.user.dataValues || req.user;

      res.redirect("/api/v1/products");

      // return (
      //   successResponse(
      //     res,
      //     200,
      //     "success",
      //     (data = { id, username, firstName, lastName, email, createdAt })
      //   ) && res.redirect("/api/v1/users")
      // );
    } catch (err) {
      return errorResponse(res, 500, err);
    }
  }

  /**
   * @description Generate link to reset a user password
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {AuthController} A reset link for new password
   * @memberof AuthController
   * @type {object} return an object
   */
  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      // Find user by email
      const user = await findUserInUsersDb(email);

      // Check for user
      if (!user) {
        return errorResponse(res, 500, "Error in sending email");
      }
      const newReset = new Reset({
        email: user.email,
        userId: user.id,
        resetToken: "",
        expireTime: moment
          .utc()
          .add(process.env.TOKENEXPIRY || 18000, "seconds")
          .toLocaleString()
      });

      // Generate Reset token
      const resetToken = await crypto.randomBytes(32).toString("hex");
      newReset.dataValues.resetToken = await hash(resetToken);

      // Remove all reset token for this user if it exists
      await Reset.destroy({
        where: { email: newReset.dataValues.email }
      });

      await newReset.save();
      // Send reset link to user email
      if (!resetToken) {
        return errorResponse(res, 500, "Error in generating token");
      }
      return successResponse(res, 201, "Reset token generated", {
        resetToken,
        email: newReset.email,
        resetId: newReset.id,
        userId: user.id
      });
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }

  /**
   * @description Reset a user password
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {AuthController} A new password record
   * @memberof AuthController
   * @returns {object} Success or failure response on adding a specific user
   */
  static async resetPassword(req, res) {
    try {
      const { userId } = req.params;
      const resetToken = req.query.token;
      const { password } = req.body;

      // Find user by user id
      const user = await findUserById(userId);
      let userRequestReset;

      // Find user reset request by email
      user
        ? (userRequestReset = await Reset.findOne({
            where: { userId: user.id }
          }))
        : null;

      // Check if user has requested password reset
      if (user && userRequestReset) {
        // Check if reset token is not expired
        const { expireTime } = userRequestReset;
        const tokenExpireTime = moment.utc(expireTime);

        // If reset link is valid and not expired
        const validReset =
          moment().isBefore(tokenExpireTime) &&
          (await compareHash(userRequestReset.resetToken, resetToken));

        if (validReset) {
          // Store hash of new password in login
          const hashed = await hash(password);
          await Login.update(
            {
              password: hashed,
              lastLogin: new Date()
            },
            { where: { email: userRequestReset.email } }
          );
          // Delete reset request from database
          await Reset.destroy({
            where: { email: userRequestReset.email }
          });
          return successResponse(res, 200, "Password updated successfully");
        }
        return errorResponse(res, 400, "Invalid or expired reset token");
      }
      return errorResponse(res, 400, "Invalid or expired reset token");
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
