/**
 * ============================================================
 *  Admin Seeder Script
 *  Usage:  node src/seed/createAdmin.js
 * ============================================================
 *
 *  Creates the first admin user in the MongoDB database.
 *  Edit the credentials below before running.
 *
 *  NOTE: Run this ONCE. After the admin is created, use the
 *        login endpoint instead. Do NOT expose this file
 *        publicly or commit credentials to version control.
 * ============================================================
 */

import mongoose from "mongoose";
import dotenv   from "dotenv";
import dns      from "dns";
import path     from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

dns.setServers(["8.8.8.8", "1.1.1.1"]);

/* ──────────────────────────────────────────────
   Admin credentials – change these before running
   ────────────────────────────────────────────── */
const ADMIN_NAME     = "Sanmati Admin";
const ADMIN_EMAIL    = "admin@sanmatistationers.com";
const ADMIN_PASSWORD = "Admin@2026";          // min 6 chars

/* ──────────────────────────────────────────────
   Run
   ────────────────────────────────────────────── */
async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    // Dynamically import the model (ESM)
    const { default: User } = await import("../models/User.js");

    const exists = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

    if (exists) {
      console.log("⚠️  Admin already exists:", exists.email);
      process.exit(0);
    }

    const admin = new User({
      name:     ADMIN_NAME,
      email:    ADMIN_EMAIL.toLowerCase(),
      password: ADMIN_PASSWORD,
      role:     "admin",
    });

    await admin.save();

    console.log("🎉 Admin created successfully!");
    console.log("   Name  :", admin.name);
    console.log("   Email :", admin.email);
    console.log("   Role  :", admin.role);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder failed:", error.message);
    process.exit(1);
  }
}

seed();
