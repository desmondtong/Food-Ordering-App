import { body } from "express-validator";

const validateRegistrationData = [
  //users table
  body("role", "role is required").notEmpty().isString().isUppercase(),
  body("email", "email is required").notEmpty(),
  body("email", "valid email is required").isEmail(),
  body("password", "password is invalid")
    .notEmpty()
    .isString()
    .isLength({ min: 8, max: 50 }),
  body("contact", "contact number is required")
    .notEmpty()
    .isInt()
    .isLength({ min: 6, max: 6 }),

  //addresses table
  body("address", "address is required").optional().notEmpty().isString(),
  body("postal_code", "postal code is required")
    .optional()
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .isPostalCode("SG"),

  //user_details table
  body("first_name", "first name is required").optional().notEmpty().isString(),
  body("last_name", "last_name is required").optional().notEmpty().isString(),

  //vendor_details table
  body("category", "category is required")
    .optional()
    .notEmpty()
    .isString()
    .isUppercase(),
  body("store_name", "store name is required").optional().notEmpty().isString(),
];

const validateLoginData = [
  body("email", "email is invalid").notEmpty().isEmail(),
  body("password", "password is required").notEmpty().isString(),
];

const validateRefreshToken = [
  body("refresh", "refresh token is invalid")
    .not()
    .isEmpty()
    .isLength({ min: 1 }),
];

const validateUpdateProfile = [
  //users table
  body("contact", "contact number is required")
    .optional()
    .notEmpty()
    .isInt()
    .isLength({ min: 6, max: 6 }),

  //addresses table
  body("address", "address is required").optional().notEmpty().isString(),
  body("postal_code", "postal code is required")
    .optional()
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .isPostalCode("SG"),

  //user_details table
  body("first_name", "first name is required").optional().notEmpty().isString(),
  body("last_name", "last_name is required").optional().notEmpty().isString(),

  //vendor_details table
  body("category", "category is required")
    .optional()
    .notEmpty()
    .isString()
    .isUppercase(),
  body("store_name", "store name is required").optional().notEmpty().isString(),
  body("description", "description is required")
    .optional()
    .notEmpty()
    .isString(),
];

const validateUpdateOperatings = [
  body("opening_day", "opening day is required")
    .notEmpty()
    .isString()
    .isUppercase(),
  body("opening_time", "opening_time is required")
    .notEmpty()
    .isTime({ hourFormat: "hour24" }),
  body("opening_time", "opening_time is required")
    .notEmpty()
    .isTime({ hourFormat: "hour24" }),
];

export {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
  validateUpdateProfile,
  validateUpdateOperatings,
};
