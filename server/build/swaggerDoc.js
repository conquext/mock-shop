"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

// import keys from "./config/keys";
var swaggerDefinition = {
  info: {
    title: "Mock-shop",
    version: "1.0.0",
    description: "Mock shop is a simple shopping server."
  },
  host: "mock-shop-1.herokuapp.com",
  basePath: "/api/v1/",
  servers: {
    url: "https://accounts.google.com/o/oauth2/v2/auth"
  },
  securityDefinitions: {
    oAuth: {
      type: "oauth2",
      flow: {
        authorizationCode: {
          authorizationUrl: "/google",
          tokenUrl: "https://www.googleapis.com/oauth2/v4/token",
          scopes: {
            read: "Grants read access",
            write: "Grants write access",
            admin: "Grants access to admin operations"
          }
        },
        clientCredentials: {
          tokenUrl: "https://www.googleapis.com/oauth2/v4/token",
          scopes: {
            admin: "Admin scope",
            user: "User scope"
          }
        }
      }
    },
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      scheme: "bearer",
      bearerFormat: "JWT",
      "in": "header"
    },
    basicauth: {
      type: "basic"
    }
  }
};
var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./src/routes/api/*.js", "./src/models/*.js", "./routes/api/*.js", "./models/*.js"]
};
var specs = (0, _swaggerJsdoc["default"])(options);
var _default = specs;
exports["default"] = _default;