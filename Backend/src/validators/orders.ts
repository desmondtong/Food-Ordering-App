import { body, param } from "express-validator";

const validateIdInParam = [
  param("order_id", "invalid id").optional().isLength({ min: 36, max: 36 }),
  param("user_id", "invalid id").optional().isLength({ min: 36, max: 36 }),
];

const validateCreateOrder = [
  body("vendor_id", "vendor id is required")
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
  body("total_price", "total price is required").notEmpty().isDecimal(),
];

const validateUpdateOrder = [
  body("status", "status is required")
    .optional()
    .notEmpty()
    .isString()
    .isUppercase(),
  body("rating", "rating is required").optional().notEmpty().isFloat(),
  body("review", "review is required").optional().isString(),
  body("isActive", "isActive status is required").optional().isBoolean(),
];

const validateCreateItemsOrders = [
  body("cart_id", "cart id is required")
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
];

const validateGetItemById = [
  body("order_id", "order id is required")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
  body("vendor_id", "vendor id is required")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
  body("user_id", "user id is required")
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 36, max: 36 }),
];

const validateGetItemByOrderId = [
  body().isArray().withMessage("Input should be an array"),
  body("*")
    .isString()
    .isLength({ min: 36, max: 36 })
    .withMessage("Each item should be a string"),
];

export {
  validateIdInParam,
  validateCreateOrder,
  validateUpdateOrder,
  validateCreateItemsOrders,
  validateGetItemById,
  validateGetItemByOrderId,
};
