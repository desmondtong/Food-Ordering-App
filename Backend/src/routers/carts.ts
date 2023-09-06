import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  validateAddItem,
  validateDelItem,
  validateUpdateItem,
} from "../validators/carts";
import {
  createCart,
  getCartById,
  addItemToCart,
  delItemFromCart,
  updateItemInCart,
} from "../controllers/carts";

router.put("/carts/:user_id", auth, createCart);
router.post("/carts/:user_id", auth, getCartById);

router.put(
  "/carts/items/:item_id",
  auth,
  validateAddItem,
  checkValid,
  addItemToCart
);
router.delete(
  "/carts/items/:item_id",
  auth,
  validateDelItem,
  checkValid,
  delItemFromCart
);
router.patch(
  "/carts/items/:item_id",
  auth,
  validateUpdateItem,
  checkValid,
  updateItemInCart
);

export default router;
