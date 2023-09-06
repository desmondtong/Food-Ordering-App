import express from "express";
const router = express.Router();

import {
  createOrder,
  updateOrder,
  createItemsOrders,
  getItemsOrdersByOrderId,
  getItemsOrdersByVendorId,
  getItemsOrdersByUserId,
} from "../controllers/orders";

router.put("/orders/:user_id", createOrder);
router.patch("/orders/:order_id", updateOrder);

router.put("/orders/items/:order_id", createItemsOrders);
router.post("/orders/items/order_id", getItemsOrdersByOrderId);
router.post("/orders/items/vendor_id", getItemsOrdersByVendorId);
router.post("/orders/items/user_id", getItemsOrdersByUserId);

export default router;
