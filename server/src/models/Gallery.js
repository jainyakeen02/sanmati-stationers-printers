import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Gallery title is required"],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: "Store",
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
