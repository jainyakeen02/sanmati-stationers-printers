import express from "express";
import { getSettings, updateSettings } from "../controllers/setting.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/", protect, authorize("admin"), updateSettings);

export default router;
