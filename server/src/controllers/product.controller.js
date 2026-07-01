import Product from "../models/Product.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

/*
|--------------------------------------------------------------------------
| Get All Products
|--------------------------------------------------------------------------
*/

export const getProducts = async (req, res) => {
  try {
    const { category, featured, bestSeller } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (featured === "true") {
      filter.featured = true;
    }

    if (bestSeller === "true") {
      filter.bestSeller = true;
    }

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Product
|--------------------------------------------------------------------------
*/

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Create Product
|--------------------------------------------------------------------------
*/

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      brand,
      description,
      specifications,
      featured,
      bestSeller,
    } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Name, Category and Description are required.",
      });
    }

    if (!req.files?.mainImage) {
      return res.status(400).json({
        success: false,
        message: "Main image is required.",
      });
    }

    const mainImage = {
      url: req.files.mainImage[0].path,
      public_id: req.files.mainImage[0].filename,
    };

    let galleryImages = [];

    if (
      req.files.galleryImages &&
      req.files.galleryImages.length > 0
    ) {
      galleryImages = req.files.galleryImages.map((image) => ({
        url: image.path,
        public_id: image.filename,
      }));
    }

    const product = await Product.create({
      name,
      category,
      subCategory,
      brand,
      description,
      specifications,
      featured:
        featured === true || featured === "true",
      bestSeller:
        bestSeller === true || bestSeller === "true",
      mainImage,
      galleryImages,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const {
      name,
      category,
      subCategory,
      brand,
      description,
      specifications,
      featured,
      bestSeller,
    } = req.body;

    product.name = name ?? product.name;
    product.category = category ?? product.category;
    product.subCategory =
      subCategory ?? product.subCategory;

    product.brand = brand ?? product.brand;

    product.description =
      description ?? product.description;

    product.specifications =
      specifications ?? product.specifications;

    if (featured !== undefined) {
      product.featured =
        featured === true || featured === "true";
    }

    if (bestSeller !== undefined) {
      product.bestSeller =
        bestSeller === true ||
        bestSeller === "true";
    }

    /*
    =======================================================
    Main Image Replace
    =======================================================
    */

    if (
      req.files?.mainImage &&
      req.files.mainImage.length > 0
    ) {
      await deleteFromCloudinary(
        product.mainImage.public_id
      );

      product.mainImage = {
        url: req.files.mainImage[0].path,
        public_id: req.files.mainImage[0].filename,
      };
    }
        /*
    =======================================================
    Gallery Images Replace
    =======================================================
    */

    if (
      req.files?.galleryImages &&
      req.files.galleryImages.length > 0
    ) {
      // Delete Old Gallery Images
      for (const image of product.galleryImages) {
        await deleteFromCloudinary(image.public_id);
      }

      // Add New Gallery Images
      product.galleryImages = req.files.galleryImages.map((image) => ({
        url: image.path,
        public_id: image.filename,
      }));
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Product
|--------------------------------------------------------------------------
*/

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    /*
    =======================================================
    Delete Main Image
    =======================================================
    */

    if (product.mainImage?.public_id) {
      await deleteFromCloudinary(
        product.mainImage.public_id
      );
    }

    /*
    =======================================================
    Delete Gallery Images
    =======================================================
    */

    if (
      product.galleryImages &&
      product.galleryImages.length > 0
    ) {
      for (const image of product.galleryImages) {
        await deleteFromCloudinary(image.public_id);
      }
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product.",
    });
  }
};