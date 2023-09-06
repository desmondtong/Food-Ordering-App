import express from "express";
const router = express.Router();

import { createOrder, updateOrder, createItemsOrders } from "../controllers/orders";

router.put("/orders/:user_id", createOrder);
router.patch("/orders/:order_id", updateOrder);

router.put("/orders/items/:order_id", createItemsOrders);

export default router;
