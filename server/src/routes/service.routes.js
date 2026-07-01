import express from "express";

import {
  createService,
  getServices,
  getServiceBySlug,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

// Optional auth: sets req.user if a valid token is provided, but doesn't block the request
const optionalProtect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer ")) {
    protect(req, res, next);
  } else {
    next();
  }
};

import { createUploader } from "../middleware/upload.middleware.js";

const router = express.Router();

// Services-specific uploader → Cloudinary folder: sanmati-stationers/services
const uploadService = createUploader("services");

/**
 * @route   GET /api/services
 * @desc    Get All Services (active only public, all for admin)
 * @access  Public
 */
router.get("/", optionalProtect, getServices);

/**
 * @route   POST /api/services
 * @desc    Create Service
 * @access  Private (Admin)
 */
router.post(
  "/",
  protect,
  authorize("admin"),
  uploadService.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 5,
    },
  ]),
  createService
);

/**
 * @route   GET /api/services/:slug
 * @desc    Get Service By Slug
 * @access  Public
 */
router.get("/:slug", getServiceBySlug);

/**
 * @route   PUT /api/services/:id
 * @desc    Update Service
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  protect,
  authorize("admin"),
  uploadService.fields([
    {
      name: "mainImage",
      maxCount: 1,
    },
    {
      name: "galleryImages",
      maxCount: 5,
    },
  ]),
  updateService
);

/**
 * @route   DELETE /api/services/:id
 * @desc    Delete Service
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteService
);

export default router;