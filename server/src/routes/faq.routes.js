import express from "express";
import {
  createFAQ,
  deleteFAQ,
  getFAQs,
  updateFAQ,
} from "../controllers/faq.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

const optionalProtect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) {
    return protect(req, res, next);
  }
  return next();
};

router.get("/", optionalProtect, getFAQs);
router.post("/", protect, authorize("admin"), createFAQ);
router.put("/:id", protect, authorize("admin"), updateFAQ);
router.delete("/:id", protect, authorize("admin"), deleteFAQ);

export default router;
