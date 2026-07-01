import FAQ from "../models/FAQ.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getFAQs = asyncHandler(async (req, res) => {
  const filter = req.user?.role === "admin" ? {} : { isActive: true };
  const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: -1 });

  res.status(200).json({ success: true, count: faqs.length, data: faqs });
});

export const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, order, isActive } = req.body;

  if (!question || !answer) {
    res.status(400);
    throw new Error("Question and answer are required.");
  }

  const faq = await FAQ.create({ question, answer, order, isActive });

  res.status(201).json({ success: true, message: "FAQ created successfully.", data: faq });
});

export const updateFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found.");
  }

  res.status(200).json({ success: true, message: "FAQ updated successfully.", data: faq });
});

export const deleteFAQ = asyncHandler(async (req, res) => {
  const faq = await FAQ.findByIdAndDelete(req.params.id);

  if (!faq) {
    res.status(404);
    throw new Error("FAQ not found.");
  }

  res.status(200).json({ success: true, message: "FAQ deleted successfully." });
});
