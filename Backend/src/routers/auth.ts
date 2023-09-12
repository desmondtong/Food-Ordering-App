import express from "express";
const router = express.Router();

import {
  validateIdInParam,
  validateLoginData,
  validateRefreshToken,
  validateRegistrationData,
  validateUpdateProfile,
  validateUpdateOperatings,
} from "../validators/auth";
import { auth, authVendor } from "../middleware/auth";
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
  getAllVendor,
} from "../controllers/auth";

router.get("/accounts", auth, getAllAccount);
router.get("/accounts/vendor", auth, getAllVendor);
router.get(
  "/accounts/:id",
  auth,
  validateIdInParam,
  checkValid,
  getAccountById
);

router.put("/register", validateRegistrationData, checkValid, register);
router.post("/login", validateLoginData, checkValid, login);
router.post("/refresh", validateRefreshToken, checkValid, refresh);

router.patch(
  "/update/profile/:id",
  auth,
  validateIdInParam,
  validateUpdateProfile,
  checkValid,
  updateProfile
);
router.delete(
  "/delete/:id",
  auth,
  validateIdInParam,
  checkValid,
  deleteAccount
);
router.patch(
  "/update/vendor/:id",
  authVendor,
  validateIdInParam,
  validateUpdateOperatings,
  checkValid,
  updateVendorOperatings
);

export default router;
