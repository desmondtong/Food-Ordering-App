import { body } from "express-validator";

const validateAddItem = [
  body("cart_id", "cart id is required").notEmpty().isString(),
  body("item_price", "item price is required and should be decimal")
    .notEmpty()
    .isDecimal(),
  body("quantity_ordered", "quantity ordered is required and should be integer")
    .notEmpty()
    .isInt(),
  body("user_note", "user_note is required").optional().notEmpty().isString(),
];

const validateDelItem = [
  body("cart_id", "cart id is required").notEmpty().isString(),
];

const validateUpdateItem = [
  body("quantity_ordered", "quantity ordered is required and should be integer")
    .notEmpty()
    .isInt(),
  body("cart_id", "cart id is required").notEmpty().isString(),
];

export { validateAddItem, validateDelItem, validateUpdateItem };
