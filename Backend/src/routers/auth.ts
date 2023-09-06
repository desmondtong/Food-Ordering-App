import express from "express";
const router = express.Router();

import {
  validateLoginData,
  validateRefreshToken,
  validateRegistrationData,
  validateUpdateProfile,
  validateUpdateOperatings,
} from "../validators/auth";
import { auth } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import {
  register,
  login,
  refresh,
  updateProfile,
  getAccountById,
  getAllAccount,
  deleteAccount,
  updateVendorOperatings,
} from "../controllers/auth";

router.get("/accounts", auth, getAllAccount);
router.get("/accounts/:id", auth, getAccountById);

router.put("/register", validateRegistrationData, checkValid, register);
router.post("/login", validateLoginData, checkValid, login);
router.post("/refresh", validateRefreshToken, checkValid, refresh);

router.patch(
  "/update/profile/:id",
  validateUpdateProfile,
  checkValid,
  auth,
  updateProfile
);
router.delete("/delete/:id", auth, deleteAccount);
router.patch(
  "/update/vendor/:id",
  validateUpdateOperatings,
  checkValid,
  auth,
  updateVendorOperatings
);

export default router;
