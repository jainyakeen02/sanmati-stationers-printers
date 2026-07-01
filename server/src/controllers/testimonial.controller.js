import Testimonial from "../models/Testimonial.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getTestimonials = asyncHandler(async (req, res) => {
  const filter = req.user?.role === "admin" ? {} : { isActive: true };
  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: testimonials.length,
    data: testimonials,
  });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, role, quote, rating, isActive } = req.body;

  if (!name || !quote) {
    res.status(400);
    throw new Error("Name and quote are required.");
  }

  const testimonial = await Testimonial.create({ name, role, quote, rating, isActive });

  res.status(201).json({
    success: true,
    message: "Testimonial created successfully.",
    data: testimonial,
  });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found.");
  }

  res.status(200).json({
    success: true,
    message: "Testimonial updated successfully.",
    data: testimonial,
  });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found.");
  }

  res.status(200).json({ success: true, message: "Testimonial deleted successfully." });
});
