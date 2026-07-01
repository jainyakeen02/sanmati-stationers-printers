import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from "../controllers/testimonial.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

const optionalProtect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    return protect(req, res, next);
  }
  return next();
};

router.get("/", optionalProtect, getTestimonials);
router.post("/", protect, authorize("admin"), createTestimonial);
router.put("/:id", protect, authorize("admin"), updateTestimonial);
router.delete("/:id", protect, authorize("admin"), deleteTestimonial);

export default router;
