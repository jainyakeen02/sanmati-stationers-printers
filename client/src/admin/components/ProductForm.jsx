import { useEffect, useState } from "react";
import { MdClose, MdCloudUpload } from "react-icons/md";

import "../styles/ProductForm.css";

const categories = [
  "School Stationery",
  "Office Supplies",
  "Printing Services",
  "Furniture",
];

const ProductForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    description: "",
    specifications: "",
    featured: false,
    bestSeller: false,
  });

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [mainPreview, setMainPreview] = useState("");
  const [galleryPreview, setGalleryPreview] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      name: initialData.name || "",
      category: initialData.category || "",
      subCategory: initialData.subCategory || "",
      brand: initialData.brand || "",
      description: initialData.description || "",
      specifications:
        initialData.specifications || "",
      featured: initialData.featured || false,
      bestSeller: initialData.bestSeller || false,
    });

    setMainPreview(
      initialData.mainImage?.url || ""
    );

    setGalleryPreview(
      initialData.galleryImages?.map(
        (img) => img.url
      ) || []
    );
  }, [initialData, isOpen]);

  const changeHandler = (e) => {
    const { name, value, checked, type } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const mainImageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setMainImage(file);

    setMainPreview(
      URL.createObjectURL(file)
    );
  };

  const galleryHandler = (e) => {
    const files = Array.from(
      e.target.files
    );

    setGalleryImages(files);

    setGalleryPreview(
      files.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) =>
      data.append(key, formData[key])
    );

    if (mainImage) {
      data.append("mainImage", mainImage);
    }

    galleryImages.forEach((image) => {
      data.append(
        "galleryImages",
        image
      );
    });

    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="product-modal">

      <div className="product-form-card">

        {/* Header */}

        <div className="form-header">

          <h2>

            {initialData._id
              ? "Edit Product"
              : "Add Product"}

          </h2>

          <button
            onClick={onClose}
          >
            <MdClose />
          </button>

        </div>

        <form
          onSubmit={submitHandler}
        >

          <div className="form-grid">

            <div>

              <label>
                Product Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={changeHandler}
                required
              />

            </div>

            <div>

              <label>
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={changeHandler}
                required
              >

                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category}
                    >
                      {category}
                    </option>
                  )
                )}

              </select>

            </div>

            <div>

              <label>
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={changeHandler}
              />

            </div>

            <div>

              <label>
                Sub Category
              </label>

              <input
                type="text"
                name="subCategory"
                value={
                  formData.subCategory
                }
                onChange={changeHandler}
              />

            </div>

          </div>

          <label>
            Description *
          </label>

          <textarea
            rows="4"
            name="description"
            value={
              formData.description
            }
            onChange={changeHandler}
            required
          />

          <label>
            Specifications
          </label>

          <textarea
            rows="3"
            name="specifications"
            value={
              formData.specifications
            }
            onChange={changeHandler}
          />

          <div className="checkbox-group">

            <label>

              <input
                type="checkbox"
                name="featured"
                checked={
                  formData.featured
                }
                onChange={changeHandler}
              />

              Featured

            </label>

            <label>

              <input
                type="checkbox"
                name="bestSeller"
                checked={
                  formData.bestSeller
                }
                onChange={changeHandler}
              />

              Best Seller

            </label>

          </div>

          {/* Main Image */}

          <label>
            Main Image *
          </label>

          <div className="upload-box">

            <MdCloudUpload />

            <input
              type="file"
              accept="image/*"
              onChange={
                mainImageHandler
              }
            />

          </div>

          {mainPreview && (
            <img
              src={mainPreview}
              className="preview-image"
              alt=""
            />
          )}

          {/* Gallery */}

          <label>
            Gallery Images
          </label>

          <div className="upload-box">

            <MdCloudUpload />

            <input
              multiple
              type="file"
              accept="image/*"
              onChange={
                galleryHandler
              }
            />

          </div>

          <div className="gallery-preview">

            {galleryPreview.map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                />
              )
            )}

          </div>

          <div className="form-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ProductForm;