export default class Response {
  static errorResponse(res, statusCode, err) {
    return res.status(statusCode).json({
      status: "error",
      error: err
    });
  }

  static successResponse(res, statusCode, msg, data) {
    const resp = {
      status: "success",
      message: msg
    };

    data ? (resp.data = data) : "";
    return res.status(statusCode).json(resp);
  }

  static methodNotAllowed(_, res) {
    const err = ["Method Not Allowed"];
    Response.errorResponse(res, 405, err[0]);
  }

  static pageNotFound(_, res) {
    const err = ["Page Not Found"];
    Response.errorResponse(res, 404, err[0]);
  }
}
