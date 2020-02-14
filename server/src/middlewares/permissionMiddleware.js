import Response from "../utils/response";

const { errorResponse } = Response;

export default class PermissionsMiddleware {
  static requireAdmin(req, res, next) {
    try {
      if (!req?.user?.isAdmin) {
        return errorResponse(res, 403, "Unauthorized");
      }
      next();
    } catch (err) {
      return errorResponse(res, 500, err);
    }
  }

  static requireOwnerAuth(req, res, next) {
    try {
      if (
        req?.user?.id.toString() &&
        req?.user?.id.toString() !== req?.params?.userId.toString()
      ) {
        return errorResponse(res, 403, "Unauthorized");
      }
      next();
    } catch (err) {
      return errorResponse(res, 500, err);
    }
  }
}
