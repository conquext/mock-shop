import dotEnv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import allRoutes from "express-list-endpoints";
import passport from "passport";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import Log from "debug";
import routes from "./routes";
import specs from "./swaggerDoc";
import Response from "./utils/response";
import passportSetup from "./services/passport";
import stringParser from "./middlewares/stringParser";

const {
  errorResponse,
  successResponse,
  methodNotAllowed,
  pageNotFound
} = Response;

const serverLog = Log("server");

const isProduction = process.env.NODE_ENV === "production";

// Create global app object
const app = express();

const swaggerOptions = {
  customSiteTitle: "My Service",
  customCss: ".swagger-ui .topbar { display: none }"
};

// swagger config middlewares
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: false, swaggerOptions })
);
app.enable("trust proxy");

// Configure dotEnv
dotEnv.config();

// parse req body data in json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(routes);

// app.use(methodOverride());
app.use(express.static(`${__dirname}/public`));
app.use(stringParser);

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    serverLog(err.stack);
    errorResponse(res, err.status || 500, err);
  });
}

// catch undefined routes
const endpoints = allRoutes(app);
const endPointsPaths = [];
for (let i = 0; i < endpoints.length; i++) {
  endPointsPaths[i] = endpoints[i].path;
}

const sendError = (req, res) => {
  try {
    if (endPointsPaths.includes(req.path)) {
      return methodNotAllowed(req, res);
    } else {
      return pageNotFound(req, res);
    }
  } catch (err) {
    return errorResponse(res, 500, err);
  }
};

app.get("/", (_, res) => {
  successResponse(res, 200, "Welcome to Mock shop", { apis: endPointsPaths });
});

app.all("*", (req, res) => {
  sendError(req, res);
});

// finally, let's start our server...
const { PORT = 3200 } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
