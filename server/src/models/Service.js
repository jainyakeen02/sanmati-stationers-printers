import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Printing Services",
      ],
      default: "Printing Services",
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    features: [
      {
        type: String,
        trim: true,
      },
    ],

    mainImage: {
      type: imageSchema,
      required: [true, "Main image is required"],
    },

    galleryImages: {
      type: [imageSchema],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;