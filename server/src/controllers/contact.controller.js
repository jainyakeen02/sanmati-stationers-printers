import Contact from "../models/Contact.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Create a Contact Query (Public)
 * @route   POST /api/contacts
 * @access  Public
 */
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email and message are required.");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
  });

  res.status(201).json({
    success: true,
    message: "Your message has been sent successfully. We will get back to you soon!",
    data: contact,
  });
});

/**
 * @desc    Get All Contact Queries (Admin)
 * @route   GET /api/contacts
 * @access  Private (Admin)
 */
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

/**
 * @desc    Delete a Contact Query (Admin)
 * @route   DELETE /api/contacts/:id
 * @access  Private (Admin)
 */
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact query not found.");
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    message: "Contact query deleted successfully.",
  });
});
