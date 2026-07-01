import Category from "../models/Category.js";

/*
|--------------------------------------------------------------------------
| Get All Categories
|--------------------------------------------------------------------------
*/

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Get Single Category
|--------------------------------------------------------------------------
*/

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category.",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const exists = await Category.findOne({
      name: name.trim(),
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    console.error("Create Category Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    category.name = req.body.name ?? category.name;
    category.description =
      req.body.description ?? category.description;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      category,
    });
  } catch (error) {
    console.error("Update Category Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Category Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete category.",
    });
  }
};