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

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "School Stationery",
        "Office Supplies",
        "Printing Services",
        "Furniture",
      ],
    },

    subCategory: {
      type: String,
      trim: true,
      default: "",
    },

    brand: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    specifications: {
      type: String,
      default: "",
    },

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

    bestSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;