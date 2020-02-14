import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import userServices from "./user";
import { compareHash } from "../helpers/hash";

import keys from "../config/keys";
import models from "../models";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

const { User } = models;
const { addUser, findUserInUsersDb, findUserInLoginsDb } = userServices;

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({
    where: { id }
  });
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
      callbackURL: keys.callbackURL,
      passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        const { _json: userDetails } = profile;
        const { email } = userDetails;
        const existingUser = await User.findOne({
          where: { email },
          raw: true
        });
        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = {
          username: userDetails.given_name,
          firstName: userDetails.given_name,
          lastName: userDetails.family_name,
          email: userDetails.email,
          role: "user"
        };

        const user = await addUser(newUser);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrPrivateKey;

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      if (jwt_payload.id) {
        return done(null, jwt_payload);
      }
      return done(null, false);
    } catch (error) {
      return done(null, false);
    }
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async function(email, password, cb) {
      try {
        const user = await findUserInUsersDb(email);
        if (!user) {
          return cb(null, false, { message: "No user found." });
        }
        const loggedUser = await findUserInLoginsDb(user.email);
        if (loggedUser) {
          const correctPassword = await compareHash(
            loggedUser.password,
            password
          );
          if (!correctPassword) {
            return cb(null, false, { message: "Incorrect password." });
          }
        }

        return cb(null, user, { message: "User Found" });
      } catch (error) {
        return done(null, false);
      }
    }
  )
);
