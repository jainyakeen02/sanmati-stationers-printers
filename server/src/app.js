import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import faqRoutes from "./routes/faq.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import settingRoutes from "./routes/setting.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/error.middleware.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON Requests
app.use(express.json());

// Parse URL Encoded Requests
app.use(express.urlencoded({ extended: true }));



/*
|--------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sanmati Stationers & Printers API is running successfully.",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/testimonials", testimonialRoutes);

/*
|--------------------------------------------------------------------------
| Error Handling Middlewares
|--------------------------------------------------------------------------
*/

// Handle Invalid Routes
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
