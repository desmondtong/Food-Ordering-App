import express from "express";
const router = express.Router();

import { createCart } from "../controllers/carts";

router.put("/carts/:user_id", createCart);

export default router;
