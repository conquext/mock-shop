require("dotenv").config();

const keys = {};

keys.cookieKey = process.env.COOKIE_KEY;
keys.secretOrPrivateKey = keys.cookieKey;
keys.apiURL = "";

if (process.env.NODE_ENV === "production") {
  keys.clientID = process.env.CLIENTID_PROD;
  keys.clientSecret = process.env.CLIENTSECRET_PROD;
  keys.callbackURL = process.env.GOOGLE_CALLBACK_URL_PROD;
} else {
  keys.clientID = process.env.CLIENTID_TEST;
  keys.clientSecret = process.env.CLIENTSECRET_TEST;
  keys.callbackURL = process.env.GOOGLE_CALLBACK_URL_TEST;
}

export default keys;
