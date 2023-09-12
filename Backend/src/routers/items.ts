import express from "express";
const router = express.Router();

import { auth, authVendor } from "../middleware/auth";
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

router.get(
  "/items/categories/:vendor_id",
  auth,
  validateIdInParam,
  checkValid,
  getCategoriesByVendor
);
router.put(
  "/items/categories/:item_id",
  authVendor,
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
router.put("/items/:vendor_id", authVendor, validateAddItem, checkValid, addItem);
router.post( // this endpoint not used
  "/items/:item_id",
  auth,
  validateIdInParam,
  checkValid,
  getItemById
);
router.patch(
  "/items/:item_id",
  authVendor,
  validateIdInParam,
  validateUpdateItem,
  checkValid,
  updateItemById
);
router.delete(
  "/items/:item_id",
  authVendor,
  validateIdInParam,
  checkValid,
  deleteItemById
);

export default router;
