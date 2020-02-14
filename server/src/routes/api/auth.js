import express from "express";
import passport from "passport";
import authController from "../../controllers/authController";
import Validation from "../../middlewares/validation";

const { googleLogin } = authController;
const {
  login,
  signup,
  logout,
  loginWithJWT,
  forgotPassword,
  resetPassword
} = authController;

// const { loginCheck, signupCheck } = validateMiddleware;
const {
  loginCheck,
  signupCheck,
  forgotPasswordCheck,
  resetPasswordCheck
} = Validation;

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags:
 *       - Auth
 *     name: signup
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            username:
 *             type: string
 *            firstName:
 *             type: string
 *            lastName:
 *             type: string
 *            email:
 *              type: string
 *              format: email
 *            password:
 *              type: string
 *              format: password
 *            role:
 *              type: string
 *              format: ['user', 'admin']
 *            required:
 *              firstName
 *              lastName
 *              email
 *              password
 *     responses:
 *       201:
 *         description: Successfully signed up
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *       400:
 *         description: Bad request
 *       409:
 *         description: User is already registered
 *       500:
 *         description: Something went wrong. Try again
 */
router.post("/signup", signupCheck, signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *    tags:
 *     - Auth
 *    name: Login
 *    summary: Logs in a user
 *    consumes:
 *     - application/json
 *    produces:
 *     - application/json
 *    parameters:
 *       - in: body
 *         name: body
 *         description: User
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *           email:
 *            type: string
 *            format: email
 *           password:
 *            type: string
 *            format: password
 *           required:
 *            email
 *            password
 *    responses:
 *      200:
 *       description: LoggedIn Successfully
 *       schema:
 *         type: object
 *         $ref: '#/definitions/User'
 *      400:
 *       description: Bad request
 *      401:
 *       description: Email or password incorrect
 *      500:
 *       description: Something went wrong. Try again
 */
router.post("/login", loginCheck, loginWithJWT);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags:
 *       - Auth
 *     name: Google signin
 *     summary: Login through oauth2 server
 *     security:
 *       - oauth: []
 *     responses:
 *       500:
 *         description: Something went wrong. Try again
 */

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags:
 *       - Auth
 *     name: Google signin
 *     summary: Return oauth access_token
 *     security:
 *       - oauth: []
 *     responses:
 *       500:
 *         description: Something went wrong. Try again
 */

router.get("/google/callback", passport.authenticate("google"), googleLogin);

/**
 * @swagger
 * /auth/current_user:
 *   post:
 *     tags:
 *       - Auth
 *     name: current_user
 *     summary: Returns current user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: User signed up successfully
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *       400:
 *         description: Bad request
 *       403:
 *         description: Username and password don't match
 *       500:
 *         description: Something went wrong. Try again
 */
router.get(
  "/current_user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

/**
 * @swagger
 * /auth/forgot:
 *   post:
 *     tags:
 *       - Auth
 *     name: Request Password Reset
 *     summary: Generate User Password Reset / Returning JWT Token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/html
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User Email
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *              format: email
 *            required:
 *              email
 *     responses:
 *       200:
 *         description: Reset token generated.
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error in generating token
 */
router.post("/passwords/forgot", forgotPasswordCheck, forgotPassword);

/**
 * @swagger
 * /auth/reset/{userId}/{resetToken}:
 *   post:
 *    tags:
 *     - Auth
 *    name: Reset Password
 *    summary: Resets a User Password / Returns a new Password
 *    consumes:
 *     - application/json
 *    produces:
 *     - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        type: string
 *      - in: path
 *        name: resetToken
 *        required: true
 *        type: string
 *      - in: body
 *        name: body
 *        description: User
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *           password:
 *            type: string
 *            format: password
 *           confirmPassword:
 *            type: string
 *            format: password
 *           required:
 *            password
 *            confirmPassword
 *    responses:
 *      200:
 *       description: Password Reset successfully
 *      400:
 *       description: Bad request
 *      500:
 *       description: Something went wrong. Try again
 */
router.post("/passwords/reset/:userId", resetPasswordCheck, resetPassword);

export default router;
