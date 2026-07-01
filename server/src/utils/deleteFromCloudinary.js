import cloudinary from "../config/cloudinary.js";

/**
 * Delete an image from Cloudinary
 * @param {string} publicId
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary Delete Error:", error.message);
  }
};

export default deleteFromCloudinary;