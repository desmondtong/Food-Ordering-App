import { body } from "express-validator";

const validateRegistrationData = [
  //users table
  body("role", "role is required").notEmpty().isUppercase(),
  body("email", "email is required").notEmpty(),
  body("email", "valid email is required").isEmail(),
  body("password", "password is invalid")
    .notEmpty()
    .isLength({ min: 8, max: 50 }),
  body("contact", "contact number is required")
    .notEmpty()
    .isLength({ min: 6, max: 6 }),

  //addresses table
  body("address", "address is required").optional().notEmpty(),
  body("postal_code", "postal code is required")
    .optional()
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .isPostalCode("SG"),

  //user_details table
  body("first_name", "first name is required").optional().notEmpty(),
  body("last_name", "last_name is required").optional().notEmpty(),

  //vendor_details table
  body("category", "category is required").optional().notEmpty().isUppercase(),
  body("store_name", "store name is required").optional().notEmpty(),
];

const validateLoginData = [
  body("email", "email is invalid").notEmpty().isEmail(),
  body("password", "password is required").notEmpty(),
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
    .isLength({ min: 6, max: 6 }),

  //addresses table
  body("address", "address is required").optional().notEmpty(),
  body("postal_code", "postal code is required")
    .optional()
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .isPostalCode("SG"),

  //user_details table
  body("first_name", "first name is required").optional().notEmpty(),
  body("last_name", "last_name is required").optional().notEmpty(),

  //vendor_details table
  body("category", "category is required").optional().notEmpty().isUppercase(),
  body("store_name", "store name is required").optional().notEmpty(),
  body("description", "description is required").optional().notEmpty(),
];

const validateUpdateOperatings = [
  body("opening_day", "opening day is required").notEmpty().isUppercase(),
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
