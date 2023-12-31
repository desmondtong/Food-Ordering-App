import { body, param } from "express-validator";

const validateIdInParam = [
  param("id", "invalid id").isLength({ min: 36, max: 36 }),
];

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
    .isLength({ min: 8, max: 8 }),

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
    .isLength({ min: 8, max: 8 }),

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
  body("rating", "rating is required").optional().notEmpty().isFloat(),
  body("image_url", "image url is required").optional().notEmpty().isString(),
];

const validateUpdateOperatings = [
  body().isArray().withMessage("Input should be an array"),
  body("*").isObject().withMessage("Each item should be an object"),

  // apply checking to each item within the array, *.
  body("*.opening_day", "opening day is required")
    .notEmpty()
    .isUppercase()
    .isString(),
  body("*.opening_time", "opening time is required")
    .notEmpty()
    .isTime({ hourFormat: "hour24" }),
  body("*.closing_time", "closing time is required")
    .notEmpty()
    .isTime({ hourFormat: "hour24" }),
];

const validateAddFavourite = [
  body("user_id", "user id is required")
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
  body("fav_vendor_id", "fav vendor id is required")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
];

export {
  validateIdInParam,
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
  validateUpdateProfile,
  validateUpdateOperatings,
  validateAddFavourite,
};
