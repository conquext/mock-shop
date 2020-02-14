import jwt from "jsonwebtoken";
import axios from "axios";
import dotenv from "dotenv";
import keys from "../config/keys";

dotenv.config();

export default class JWTService {
  static async jwtSignUser(payload, exp = "1h") {
    return await jwt.sign(payload, keys.secretOrPrivateKey, {
      expiresIn: exp
    });
  }

  static async jwtDecode(token) {
    const decoded = await jwt.decode(token, {
      secret: keys.secretOrPrivateKey
    });
    return decoded;
    // return await jwt.verify(token, keys.secretOrPrivateKey);
  }

  static setAuthToken(token) {
    if (token) {
      // Apply to every request
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete Auth header
      delete axios.defaults.headers.common["Authorization"];
    }
  }
}
