import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  validateIdInParam,
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

router.put("/carts/:user_id", auth, validateIdInParam, checkValid, createCart);
router.post(
  "/carts/:user_id",
  auth,
  validateIdInParam,
  checkValid,
  getCartById
);

router.put(
  "/carts/items/:item_id",
  auth,
  validateIdInParam,
  validateAddItem,
  checkValid,
  addItemToCart
);
router.delete(
  "/carts/items/:cart_id",
  auth,
  validateIdInParam,
  validateDelItem,
  checkValid,
  delItemFromCart
);
router.patch(
  "/carts/items/:item_id",
  auth,
  validateIdInParam,
  validateUpdateItem,
  checkValid,
  updateItemInCart
);

export default router;
