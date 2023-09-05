import express from "express";
const router = express.Router();

import {
  createCart,
  getCartById,
  addItemToCart,
  delItemFromCart,
} from "../controllers/carts";

router.put("/carts/:user_id", createCart);
router.post("/carts/:user_id", getCartById);

router.put("/carts/items/:item_id", addItemToCart);
router.delete("/carts/items/:item_id", delItemFromCart);

export default router;
