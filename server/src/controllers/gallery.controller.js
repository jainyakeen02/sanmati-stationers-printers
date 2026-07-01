import Gallery from "../models/Gallery.js";
import asyncHandler from "../utils/asyncHandler.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

export const getGallery = asyncHandler(async (req, res) => {
  const filter = req.user?.role === "admin" ? {} : { isActive: true };
  const gallery = await Gallery.find(filter).sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: gallery.length, data: gallery });
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const { title, category, isActive } = req.body;

  if (!title || !req.file) {
    res.status(400);
    throw new Error("Title and image are required.");
  }

  const item = await Gallery.create({
    title,
    category,
    isActive,
    image: {
      url: req.file.path,
      public_id: req.file.filename,
    },
  });

  res.status(201).json({ success: true, message: "Gallery item created successfully.", data: item });
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Gallery item not found.");
  }

  const { title, category, isActive } = req.body;
  item.title = title ?? item.title;
  item.category = category ?? item.category;

  if (isActive !== undefined) {
    item.isActive = isActive === true || isActive === "true";
  }

  if (req.file) {
    await deleteFromCloudinary(item.image.public_id);
    item.image = {
      url: req.file.path,
      public_id: req.file.filename,
    };
  }

  await item.save();

  res.status(200).json({ success: true, message: "Gallery item updated successfully.", data: item });
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error("Gallery item not found.");
  }

  await deleteFromCloudinary(item.image.public_id);
  await item.deleteOne();

  res.status(200).json({ success: true, message: "Gallery item deleted successfully." });
});
