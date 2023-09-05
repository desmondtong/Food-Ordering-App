import express from "express";
const router = express.Router();

import { createCart, getCartById, addItemToCart } from "../controllers/carts";

router.put("/carts/:user_id", createCart);
router.post("/carts/:user_id", getCartById);

router.put("/carts/items/:item_id", addItemToCart);

export default router;
