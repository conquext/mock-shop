import swaggerJsdoc from "swagger-jsdoc";
import keys from "./src/config/keys";

const swaggerDefinition = {
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
      in: "header"
    },
    basicauth: {
      type: "basic"
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/api/*.js", "./src/models/*.js"]
};

const specs = swaggerJsdoc(options);

export default specs;
