import express from "express";
const router = express.Router();

import { auth, authVendor } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  validateIdInParam,
  validateCreateOrder,
  validateUpdateOrder,
  validateCreateItemsOrders,
  validateGetItemById,
  validateGetItemByOrderId,
} from "../validators/orders";
import {
  createOrder,
  updateOrder,
  createItemsOrders,
  getItemsOrdersByOrderId,
  getItemsOrdersByVendorId,
  getItemsOrdersByUserId,
  getLastOrderByUserId,
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
  validateGetItemByOrderId,
  checkValid,
  getItemsOrdersByOrderId
);
router.post(
  "/orders/items/vendor_id",
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
  getLastOrderByUserId
);
router.post(
  "/orders/items/active/vendor_id",
  authVendor,
  validateGetItemById,
  checkValid,
  getActiveOrdersByVendorId
);

export default router;
