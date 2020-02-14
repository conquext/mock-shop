import faker from "faker";

export default class Validation {
  static isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  }

  static isValidEmail(email) {
    const re = /^\S+@\S+[\.][0-9a-z]+$/;
    return re.test(email);
  }

  static isValidName(name) {
    const re = /^[A-Za-z]+$/;
    return name.length > 3 && re.test(name);
  }

  static isValidSentence(sentence) {
    sentence = sentence.toLowerCase();
    const re = /^[A-Za-z][a-z\s]+$/;
    return re.test(sentence);
  }

  static isValidProductName(name) {
    return (
      name.length > 2 && name.length < 10 && Validation.isValidSentence(name)
    );
  }

  static isValidUsername(username) {
    return username.length > 2;
  }

  static isValidInt(number, min = 1, max = Infinity) {
    return (
      !isNaN(number) &&
      /^[0-9]+$/.test(number) &&
      number >= min &&
      number <= max
    );
  }

  static isValidPassword(password) {
    return password.length > 3;
  }

  static isValidDecimal(number) {
    return !/^\s*$/.test(number) && !isNaN(number) && number > 0;
  }

  static isValidProductDescription(pdesc) {
    return Validation.isValidSentence && pdesc.length > 5;
  }

  static validateSignup(userData) {
    const errors = {};

    if (!userData.username) {
      userData.username = faker.internet.userName();
      // errors.username = "Username is required";
    } else if (!Validation.isValidUsername(userData.username)) {
      errors.username = "Username must contain at least 3 characters";
    }

    if (!userData.firstName) {
      errors.firstName = "First Name is required";
    } else if (!Validation.isValidName(userData.firstName)) {
      errors.firstName = "First Name is invalid or less 4 characters";
    }

    if (!userData.lastName) {
      errors.lastName = "Last Name is required";
    } else if (!Validation.isValidName(userData.lastName)) {
      errors.lastName = "Last Name is invalid or less than 4 characters";
    }

    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!Validation.isValidEmail(userData.email)) {
      errors.email = "Email is invalid";
    }

    if (!userData.password) {
      errors.password = "Password is required";
    } else if (!Validation.isValidPassword(userData.password)) {
      errors.password = "Password must contain at least 4 characters";
    }

    return {
      errors,
      isValid: Validation.isEmpty(errors)
    };
  }

  static validateLogin(userData) {
    const errors = {};

    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!Validation.isValidEmail(userData.email)) {
      errors.email = "Email is invalid";
    }

    if (!userData.password) {
      errors.password = "Password is required";
    } else if (!Validation.isValidPassword(userData.password)) {
      errors.password = "Password must contain at least 4 characters";
    }

    return {
      errors,
      isValid: Validation.isEmpty(errors)
    };
  }

  static validateForgotPassword(userData) {
    const errors = {};

    if (!userData.email) {
      errors.email = "Email is required";
    } else if (!Validation.isValidEmail(userData.email)) {
      errors.email = "Email is invalid";
    }

    return {
      errors,
      isValid: Validation.isEmpty(errors)
    };
  }

  static validateResetPassword(userData) {
    const errors = {};

    if (!userData.password) {
      errors.password = "New password is required";
    } else if (!Validation.isValidPassword(userData.password)) {
      errors.password = "Password is invalid";
    }

    if (!userData.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    }
    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }

    return {
      errors,
      isValid: Validation.isEmpty(errors)
    };
  }

  static validateProduct(productData) {
    const errors = {};

    if (!productData.productName) {
      errors.productName = "Product name is required";
    } else if (!Validation.isValidProductName(productData.productName)) {
      errors.productName =
        "Product name must be greater than 2, less than 15 and contain no special characters";
    }

    if (!productData.description) {
      errors.description = "Product description is required";
    } else if (!Validation.isValidProductDescription(productData.description)) {
      errors.description =
        "Description must be greater than 5 and contains no special characters";
    }

    if (!productData.category) {
      errors.category = "Product category is required";
    } else if (!Validation.isValidProductName(productData.category)) {
      errors.category =
        "Category must be greater than 2, less than 15 and contain no special characters";
    }

    if (!productData.price) {
      errors.price = "Product price is required";
    } else if (!Validation.isValidDecimal(productData.price)) {
      errors.price = "Price is invalid";
    }

    if (!productData.quantity) {
      errors.quantity = "Quantity is required";
    } else if (!Validation.isValidInt(productData.quantity)) {
      errors.quantity = "Quantity must me an integer";
    }

    return {
      errors,
      isValid: Validation.isEmpty(errors)
    };
  }

  static validateProductUpdate(productData) {
    const errors = {};
    const knownKeys = {
      productName: val =>
        Validation.isValidProductName(val)
          ? ""
          : (errors.productName =
              "Product name must be greater than 2, less than 15 and contain no special characters"),
      description: val =>
        Validation.isValidProductDescription(val)
          ? ""
          : (errors.description =
              "Description must be greater than 5 and contains no special characters"),
      category: val =>
        Validation.isValidProductName(val)
          ? ""
          : (errors.category =
              "Category must be greater than 2, less than 15 and contain no special characters"),
      price: val =>
        Validation.isValidDecimal(val)
          ? ""
          : (errors.price = "Price is invalid"),
      quantity: val =>
        Validation.isValidInt(val)
          ? ""
          : (errors.quantity = "Quantity must me an integer"),
      inStock: val =>
        val.toString() === "true" || val.toString() === "false"
          ? ""
          : (errors.inStock = "Instock must me either true or false")
    };

    Object.entries(productData).forEach(([key, value]) => {
      if (Object.prototype.hasOwnProperty.call(knownKeys, key)) {
        knownKeys[key](value);
      }
    });

    return {
      errors,
      isValid: Validation.isEmpty(errors)
    };
  }

  static validateCartAdd(cartItem) {
    const errors = {};

    if (!cartItem.productId) {
      errors.productId = "Product Id is required";
    } else if (!isNaN(cartItem.productId)) {
      errors.productId = "Product Id is invalid";
    }

    if (!cartItem.quantity) {
      // errors.quantity = "Product quantity is required";
      cartItem.quantity = 1;
    } else if (!Validation.isValidInt(cartItem.quantity)) {
      errors.quantity = "Qauntity must be an integer";
    }

    return {
      errors,
      isValid: Validation.isEmpty(errors)
    };
  }
}
