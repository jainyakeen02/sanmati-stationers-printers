import express from "express";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGallery,
  updateGalleryItem,
} from "../controllers/gallery.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";
import { createUploader } from "../middleware/upload.middleware.js";

const router = express.Router();
const uploadGallery = createUploader("gallery");

const optionalProtect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    return protect(req, res, next);
  }
  return next();
};

router.get("/", optionalProtect, getGallery);
router.post("/", protect, authorize("admin"), uploadGallery.single("image"), createGalleryItem);
router.put("/:id", protect, authorize("admin"), uploadGallery.single("image"), updateGalleryItem);
router.delete("/:id", protect, authorize("admin"), deleteGalleryItem);

export default router;
