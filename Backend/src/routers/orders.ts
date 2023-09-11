import express from "express";
const router = express.Router();

import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  validateIdInParam,
  validateCreateOrder,
  validateUpdateOrder,
  validateCreateItemsOrders,
  validateGetItemById,
  validateGetItemByOrderId
} from "../validators/orders";
import {
  createOrder,
  updateOrder,
  createItemsOrders,
  getItemsOrdersByOrderId,
  getItemsOrdersByVendorId,
  getItemsOrdersByUserId,
  getActiveOrderByUserId,
  getActiveOrdersByVendorId,
} from "../controllers/orders";

router.put(
  "/orders/:user_id",
  auth,
  validateIdInParam,
  validateCreateOrder,
  checkValid,
  createOrder
);
router.patch(
  "/orders/:order_id",
  auth,
  validateIdInParam,
  validateUpdateOrder,
  checkValid,
  updateOrder
);

router.put(
  "/orders/items/:order_id",
  auth,
  validateIdInParam,
  validateCreateItemsOrders,
  checkValid,
  createItemsOrders
);
router.post(
  "/orders/items/order_id",
  auth,
  validateGetItemByOrderId,
  checkValid,
  getItemsOrdersByOrderId
);
router.post(
  "/orders/items/vendor_id",
  auth,
  validateGetItemById,
  checkValid,
  getItemsOrdersByVendorId
);
router.post(
  "/orders/items/user_id",
  auth,
  validateGetItemById,
  checkValid,
  getItemsOrdersByUserId
);
router.post(
  "/orders/items/active/user_id",
  auth,
  validateGetItemById,
  checkValid,
  getActiveOrderByUserId
);
router.post(
  "/orders/items/active/vendor_id",
  auth,
  validateGetItemById,
  checkValid,
  getActiveOrdersByVendorId
);

export default router;
