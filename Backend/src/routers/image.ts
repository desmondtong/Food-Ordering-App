import express from "express";
import multer from "multer";
const router = express.Router();

import { authVendor } from "../middleware/auth";
import { validation as checkValid } from "../middleware/checkValid";
import { validateIdInParam, validateUpdateImage } from "../validators/image";
import { uploadItemImage, displayImage } from "../controllers/image";

//functions to store images in memory until uploaded
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //string should be name of input

router.post(
  "/image/:item_id",
  authVendor,
  validateIdInParam,
  validateUpdateImage,
  checkValid,
  upload.single("image"), // image div id/name at frontend must be same as this
  uploadItemImage
);

router.post(
  "/image",
  authVendor,
  upload.single("image"), // image div id/name at frontend must be same as this
  displayImage
);

export default router;
