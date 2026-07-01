import express from "express";
import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contact.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route to submit message
router.post("/", createContact);

// Admin routes to read and delete queries
router.get("/", protect, authorize("admin"), getContacts);
router.delete("/:id", protect, authorize("admin"), deleteContact);

export default router;
