import Service from "../models/Service.js";
import asyncHandler from "../utils/asyncHandler.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

/**
 * @desc    Create Service
 * @route   POST /api/services
 * @access  Private (Admin)
 */
export const createService = asyncHandler(async (req, res) => {
  const { name, category, description, features, featured } = req.body;

  if (!name || !description) {
    res.status(400);
    throw new Error("Name and description are required.");
  }

  if (!req.files?.mainImage) {
    res.status(400);
    throw new Error("Main image is required.");
  }

  const mainImage = {
    url: req.files.mainImage[0].path,
    public_id: req.files.mainImage[0].filename,
  };

  let galleryImages = [];
  if (req.files.galleryImages && req.files.galleryImages.length > 0) {
    galleryImages = req.files.galleryImages.map((image) => ({
      url: image.path,
      public_id: image.filename,
    }));
  }

  // Parse features list
  let parsedFeatures = [];
  if (features) {
    if (typeof features === "string") {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        parsedFeatures = features.split(",").map(f => f.trim()).filter(Boolean);
      }
    } else if (Array.isArray(features)) {
      parsedFeatures = features;
    }
  }

  const service = await Service.create({
    name,
    category: category || "Printing Services",
    description,
    features: parsedFeatures,
    featured: featured === true || featured === "true",
    mainImage,
    galleryImages,
  });

  res.status(201).json({
    success: true,
    message: "Service created successfully.",
    data: service,
  });
});

/**
 * @desc    Get All Services
 * @route   GET /api/services
 * @access  Public (+ all records when admin token provided)
 */
export const getServices = asyncHandler(async (req, res) => {
  // If a valid admin token is present (via protect middleware), show all;
  // otherwise only show active ones for the public website.
  const showAll = req.user && req.user.role === "admin";
  const filter  = showAll ? {} : { isActive: true };

  const services = await Service.find(filter).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services,
  });
});

/**
 * @desc    Get Service By ID
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.slug);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  res.status(200).json({
    success: true,
    data: service,
  });
});

/**
 * @desc    Update Service
 * @route   PUT /api/services/:id
 * @access  Private (Admin)
 */
export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  const { name, category, description, features, featured, isActive } = req.body;

  service.name = name ?? service.name;
  service.category = category ?? service.category;
  service.description = description ?? service.description;

  if (features !== undefined) {
    let parsedFeatures = [];
    if (typeof features === "string") {
      try {
        parsedFeatures = JSON.parse(features);
      } catch (e) {
        parsedFeatures = features.split(",").map(f => f.trim()).filter(Boolean);
      }
    } else if (Array.isArray(features)) {
      parsedFeatures = features;
    }
    service.features = parsedFeatures;
  }

  if (featured !== undefined) {
    service.featured = featured === true || featured === "true";
  }

  if (isActive !== undefined) {
    service.isActive = isActive === true || isActive === "true";
  }

  // Handle Main Image Update
  if (req.files?.mainImage && req.files.mainImage.length > 0) {
    if (service.mainImage?.public_id) {
      await deleteFromCloudinary(service.mainImage.public_id);
    }
    service.mainImage = {
      url: req.files.mainImage[0].path,
      public_id: req.files.mainImage[0].filename,
    };
  }

  // Handle Gallery Images Update
  if (req.files?.galleryImages && req.files.galleryImages.length > 0) {
    // Delete old ones
    if (service.galleryImages && service.galleryImages.length > 0) {
      for (const img of service.galleryImages) {
        await deleteFromCloudinary(img.public_id);
      }
    }
    service.galleryImages = req.files.galleryImages.map((image) => ({
      url: image.path,
      public_id: image.filename,
    }));
  }

  await service.save();

  res.status(200).json({
    success: true,
    message: "Service updated successfully.",
    data: service,
  });
});

/**
 * @desc    Delete Service (Soft Delete)
 * @route   DELETE /api/services/:id
 * @access  Private (Admin)
 */
export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error("Service not found.");
  }

  // Set inactive instead of complete deletion to preserve records (soft delete)
  service.isActive = false;
  await service.save();

  res.status(200).json({
    success: true,
    message: "Service deactivated successfully.",
  });
});