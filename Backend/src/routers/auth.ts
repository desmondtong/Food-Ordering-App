import express from "express";
const router = express.Router();

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
import { auth } from "../middleware/auth";
// const {
//   validateRegistrationData,
//   validateLoginData,
//   validateRefreshToken,
//   validateUpdateProfile,
// } = require("../validators/auth");

// const checkValid = require("../middleware/checkValid");

router.get("/accounts", auth, getAllAccount);
router.get("/accounts/:id", auth, getAccountById);
// router.put("/register", validateRegistrationData, checkValid, register);
router.put("/register", register);
// router.post("/login", validateLoginData, checkValid, login);
router.post("/login", login);
router.post("/refresh", refresh);
// router.post("/refresh", validateRefreshToken, checkValid, refresh);
router.patch("/update/profile/:id", auth, updateProfile);
// router.patch("/update/:id", validateUpdateProfile, updateProfile);
router.delete("/delete/:id", auth, deleteAccount);
router.patch("/update/vendor/:id", auth, updateVendorOperatings);

export default router;
