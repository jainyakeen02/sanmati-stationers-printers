import express from "express";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get All Categories
router.get("/", getCategories);

// Get Single Category
router.get("/:id", getCategoryById);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Create Category
router.post(
  "/",
  protect,
  authorize("admin"),
  createCategory
);

// Update Category
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateCategory
);

// Delete Category
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCategory
);

export default router;