import express from "express";
const router = express.Router();

// const {
//   seedAuth,
//   register,
//   getAccountById,
//   getAllAccount,
//   login,
//   refresh,
//   updateProfile,
// } = require("../controllers/auth");
import {
  register,
  login,
  refresh,
  updateProfile,
  getAccountById,
  getAllAccount,
  deleteAccount,
} from "../controllers/auth";

// const { auth } = require("../middleware/auth");
// const {
//   validateRegistrationData,
//   validateLoginData,
//   validateRefreshToken,
//   validateUpdateProfile,
// } = require("../validators/auth");

// const checkValid = require("../middleware/checkValid");

// router.get("/seed", seedAuth);
router.get("/accounts", getAllAccount);
router.get("/accounts/:id", getAccountById);
// router.put("/register", validateRegistrationData, checkValid, register);
router.put("/register", register);
// router.post("/login", validateLoginData, checkValid, login);
router.post("/login", login);
router.post("/refresh", refresh);
// router.post("/refresh", validateRefreshToken, checkValid, refresh);
router.patch("/update/:id", updateProfile);
// router.patch("/update/:id", validateUpdateProfile, updateProfile);
router.delete("/delete/:id", deleteAccount);

export default router;
