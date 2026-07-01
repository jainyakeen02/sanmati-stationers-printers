import express from "express";

import {
  registerAdmin,
  loginAdmin,
  getProfile,
} from "../controllers/auth.controller.js";

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

// Development Only
router.post("/register", registerAdmin);

// Admin Login
router.post("/login", loginAdmin);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

// Logged-in Admin Profile
router.get(
  "/profile",
  protect,
  authorize("admin"),
  getProfile
);

export default router;