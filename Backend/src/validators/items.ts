import { body, param } from "express-validator";

const validateIdInParam = [
  param("vendor_id", "invalid id").optional().isLength({ min: 36, max: 36 }),
  param("item_id", "invalid id").optional().isLength({ min: 36, max: 36 }),
];

const validateAddCategory = [
  body("category", "category is required").notEmpty().isString(),
];

const validateAddItem = [
  body("name", "name is required").notEmpty().isString(),
  body("item_price", "item price is required and should be decimal")
    .notEmpty()
    .isDecimal(),
  body("image_url", "image url is required").optional().notEmpty().isString(),
  body("description", "description is required")
    .optional()
    .isString(),
];

const validateUpdateItem = [
  body("name", "name is required").notEmpty().isString(),
  body("item_price", "item price is required and should be decimal")
    .notEmpty()
    .isDecimal(),
  body("image_url", "image url is required").optional().notEmpty().isString(),
  body("description", "description is required")
    .optional()
    .isString(),
  body("category", "category is required").notEmpty().isString(),
];

export {
  validateIdInParam,
  validateAddCategory,
  validateAddItem,
  validateUpdateItem,
};
