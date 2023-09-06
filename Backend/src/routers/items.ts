import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  validateIdInParam,
  validateAddCategory,
  validateAddItem,
  validateUpdateItem,
} from "../validators/items";
import {
  addItem,
  addCategory,
  getCategoriesByVendor,
  getAllItemByVendor,
  getItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/items";
import { validate } from "uuid";

router.get(
  "/items/categories/:vendor_id",
  auth,
  validateIdInParam,
  checkValid,
  getCategoriesByVendor
);
router.put(
  "/items/categories/:item_id",
  auth,
  validateIdInParam,
  validateAddCategory,
  checkValid,
  addCategory
);

router.get(
  "/items/:vendor_id",
  auth,
  validateIdInParam,
  checkValid,
  getAllItemByVendor
);
router.put("/items/:vendor_id", auth, validateAddItem, checkValid, addItem);
router.post(
  "/items/:item_id",
  auth,
  validateIdInParam,
  checkValid,
  getItemById
);
router.patch(
  "/items/:item_id",
  auth,
  validateIdInParam,
  validateUpdateItem,
  checkValid,
  updateItemById
);
router.delete(
  "/items/:item_id",
  auth,
  validateIdInParam,
  checkValid,
  deleteItemById
);

export default router;
