import express from "express";
const router = express.Router();

import {
  addItem,
  addCategory,
  getCategoriesByVendor,
  getAllItemByVendor,
  getItemById
} from "../controllers/items";

router.get("/items/categories/:vendor_id", getCategoriesByVendor);
router.put("/items/categories/:item_id", addCategory);
router.get("/items/:vendor_id", getAllItemByVendor);
router.put("/items/:vendor_id", addItem);
router.post("/items/:item_id", getItemById);

export default router;
