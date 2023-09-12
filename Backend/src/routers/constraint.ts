import express from "express";
const router = express.Router();

import {
  getOpeningDays,
  getCategories,
  getStatuses,
} from "../controllers/constraint";
import { authVendor } from "../middleware/auth";

router.get("/openingdays", getOpeningDays);
router.get("/categories", getCategories);
router.get("/statuses", getStatuses);

export default router;
