import express from "express";
const router = express.Router();

import {
  addItem,
  addCategory,
  getCategoriesByVendor,
} from "../controllers/items";

router.get("/items/categories/:id", getCategoriesByVendor);
router.put("/items/categories/:id", addCategory);
router.put("/items/:id", addItem);

export default router;
