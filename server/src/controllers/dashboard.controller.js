import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Contact from "../models/Contact.js";
import FAQ from "../models/FAQ.js";
import Gallery from "../models/Gallery.js";
import Testimonial from "../models/Testimonial.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Get Admin Dashboard Stats (Admin Only)
 * @route   GET /api/dashboard
 * @access  Private (Admin)
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  // Count counts
  const totalProducts = await Product.countDocuments();
  const totalServices = await Service.countDocuments({ isActive: true });
  const totalContacts = await Contact.countDocuments();
  const totalGallery = await Gallery.countDocuments({ isActive: true });
  const totalFAQs = await FAQ.countDocuments({ isActive: true });
  const totalTestimonials = await Testimonial.countDocuments({ isActive: true });

  // Featured count
  const featuredProducts = await Product.countDocuments({ featured: true });
  const featuredServices = await Service.countDocuments({ featured: true, isActive: true });
  const totalFeatured = featuredProducts + featuredServices;

  // Recent data
  const recentProducts = await Product.find()
    .sort({ createdAt: -1 })
    .limit(5);

  const recentContacts = await Contact.find()
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json({
    success: true,
    data: {
      stats: {
        products: totalProducts,
        services: totalServices,
        contacts: totalContacts,
        featured: totalFeatured,
        gallery: totalGallery,
        faqs: totalFAQs,
        testimonials: totalTestimonials,
      },
      recentProducts,
      recentContacts,
    },
  });
});
