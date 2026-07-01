import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

/*
|--------------------------------------------------------------------------
| File Filter (shared)
|--------------------------------------------------------------------------
*/

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error("Only JPG, JPEG, PNG and WEBP images are allowed."),
      false
    );
  }

  cb(null, true);
};

/*
|--------------------------------------------------------------------------
| Upload Factory – creates a multer instance for a given Cloudinary folder
|--------------------------------------------------------------------------
*/

export const createUploader = (folder = "products") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder: `sanmati-stationers/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      resource_type: "image",
      public_id: `${Date.now()}-${file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-")}`,
      transformation: [
        {
          width: 1200,
          crop: "limit",
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    }),
  });

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
      files: 6,
    },
  });
};

/*
|--------------------------------------------------------------------------
| Default export – products uploader (backwards compatible)
|--------------------------------------------------------------------------
*/

const upload = createUploader("products");

export default upload;