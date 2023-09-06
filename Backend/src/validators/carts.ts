import { body, param } from "express-validator";

const validateIdInParam = [
  param("cart_id", "invalid id").optional().isLength({ min: 36, max: 36 }),
  param("item_id", "invalid id").optional().isLength({ min: 36, max: 36 }),
];

const validateAddItem = [
  body("cart_id", "cart id is required")
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
  body("item_price", "item price is required and should be decimal")
    .notEmpty()
    .isDecimal(),
  body("quantity_ordered", "quantity ordered is required and should be integer")
    .notEmpty()
    .isInt(),
  body("user_note", "user_note is required").optional().notEmpty().isString(),
];

const validateDelItem = [
  body("cart_id", "cart id is required")
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
];

const validateUpdateItem = [
  body("quantity_ordered", "quantity ordered is required and should be integer")
    .notEmpty()
    .isInt(),
  body("cart_id", "cart id is required")
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
];

export {
  validateIdInParam,
  validateAddItem,
  validateDelItem,
  validateUpdateItem,
};
