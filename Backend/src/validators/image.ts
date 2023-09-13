import { body, param } from "express-validator";

const validateIdInParam = [
  param("vendor_id", "invalid id").optional().isLength({ min: 36, max: 36 }),
  param("item_id", "invalid id").optional().isLength({ min: 36, max: 36 }),
];

const validateUpdateImage = [
  body("image_url", "image url is required").optional().notEmpty().isString(),
];

export { validateIdInParam, validateUpdateImage };
