const validateProduct = (req, res, next) => {
  const {
    name,
    slug,
    category,
    description,
    price,
    stock,
  } = req.body;

  // Product Name
  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Product name is required.",
    });
  }

  // Slug
  if (!slug || slug.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Product slug is required.",
    });
  }

  // Category
  if (!category) {
    return res.status(400).json({
      success: false,
      message: "Product category is required.",
    });
  }

  // Description
  if (!description || description.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Product description is required.",
    });
  }

  // Price
  if (price !== undefined && Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: "Price cannot be negative.",
    });
  }

  // Stock
  if (stock !== undefined && Number(stock) < 0) {
    return res.status(400).json({
      success: false,
      message: "Stock cannot be negative.",
    });
  }

  next();
};

export default validateProduct;