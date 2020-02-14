"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressListEndpoints = _interopRequireDefault(require("express-list-endpoints"));

var _passport = _interopRequireDefault(require("passport"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _debug = _interopRequireDefault(require("debug"));

var _routes = _interopRequireDefault(require("./routes"));

var _swaggerDoc = _interopRequireDefault(require("../swaggerDoc"));

var _response = _interopRequireDefault(require("./utils/response"));

var _passport2 = _interopRequireDefault(require("./services/passport"));

var _stringParser = _interopRequireDefault(require("./middlewares/stringParser"));

var errorResponse = _response["default"].errorResponse,
    successResponse = _response["default"].successResponse,
    methodNotAllowed = _response["default"].methodNotAllowed,
    pageNotFound = _response["default"].pageNotFound;
var serverLog = (0, _debug["default"])("server");
var isProduction = process.env.NODE_ENV === "production"; // Create global app object

var app = (0, _express["default"])();
var swaggerOptions = {
  customSiteTitle: "My Service",
  customCss: ".swagger-ui .topbar { display: none }"
}; // swagger config middlewares

app.use("/docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerDoc["default"], {
  explorer: false,
  swaggerOptions: swaggerOptions
}));
app.enable("trust proxy"); // Configure dotEnv

_dotenv["default"].config(); // parse req body data in json


app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); // passport initialization

app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use((0, _cors["default"])());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(_routes["default"]); // app.use(methodOverride());

app.use(_express["default"]["static"]("".concat(__dirname, "/public")));
app.use(_stringParser["default"]); // / error handlers
// development error handler
// will print stacktrace

if (!isProduction) {
  app.use(function (err, req, res, next) {
    serverLog(err.stack);
    errorResponse(res, err.status || 500, err);
  });
} // catch undefined routes


var endpoints = (0, _expressListEndpoints["default"])(app);
var endPointsPaths = [];

for (var i = 0; i < endpoints.length; i++) {
  endPointsPaths[i] = endpoints[i].path;
}

var sendError = function sendError(req, res) {
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

app.get("/", function (_, res) {
  successResponse(res, 200, "Welcome to Mock shop", {
    apis: endPointsPaths
  });
});
app.all("*", function (req, res) {
  sendError(req, res);
}); // finally, let's start our server...

var _process$env$PORT = process.env.PORT,
    PORT = _process$env$PORT === void 0 ? 3200 : _process$env$PORT;
app.listen(PORT, function () {
  console.log("Listening on port ".concat(PORT));
});
var _default = app;
exports["default"] = _default;