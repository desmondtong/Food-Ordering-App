import express from "express";
const router = express.Router();

import { createOrder } from "../controllers/orders";

router.get("/orders/:user_id", createOrder);

export default router;
