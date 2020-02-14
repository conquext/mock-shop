import Response from "../utils/response";
import Validation from "../helpers/validation";
import ProductUtils from "../utils/product";

const { getUpdatableProductField } = ProductUtils;

const { errorResponse } = Response;
const {
  validateLogin,
  validateSignup,
  validateForgotPassword,
  validateResetPassword,
  validateProduct,
  validateProductUpdate,
  validateCartAdd
} = Validation;

export default class ValidationMiddleware {
  static loginCheck(req, res, next) {
    try {
      const { errors, isValid } = validateLogin(req.body);
      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
  static signupCheck(req, res, next) {
    try {
      const { errors, isValid } = validateSignup(req.body);
      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
  static forgotPasswordCheck(req, res, next) {
    try {
      const { errors, isValid } = validateForgotPassword(req.body);
      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
  static resetPasswordCheck(req, res, next) {
    try {
      const { errors, isValid } = validateResetPassword(req.body);
      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
  static productCheck(req, res, next) {
    try {
      const { errors, isValid } = validateProduct(req.body);
      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }

      next();
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
  static updateProductCheck(req, res, next) {
    try {
      const { errors, isValid } = validateProductUpdate(
        getUpdatableProductField(req.body)
      );
      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
  static cartAddCheck(req, res, next) {
    try {
      const { errors, isValid } = validateCartAdd(req.body);
      // Check validation
      if (!isValid) {
        return errorResponse(res, 400, errors);
      }
      next();
    } catch (error) {
      return errorResponse(res, 500, error);
    }
  }
}
