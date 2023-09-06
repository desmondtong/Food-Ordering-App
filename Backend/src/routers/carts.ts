import express from "express";
const router = express.Router();

import {
  createCart,
  getCartById,
  addItemToCart,
  delItemFromCart,
  updateItemInCart,
} from "../controllers/carts";
import { auth } from "../middleware/auth";

router.put("/carts/:user_id", createCart);
router.post("/carts/:user_id", getCartById);

router.put("/carts/items/:item_id", addItemToCart);
router.delete("/carts/items/:item_id", delItemFromCart);
router.patch("/carts/items/:item_id", updateItemInCart);

export default router;
