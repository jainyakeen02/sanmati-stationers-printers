import { useEffect, useState } from "react";
import { MdClose, MdCloudUpload, MdAdd, MdDelete } from "react-icons/md";
import "../styles/ServiceForm.css";

const ServiceForm = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Printing Services",
    description: "",
    featured: false,
    isActive: true,
  });

  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  const [mainImage, setMainImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const [mainPreview, setMainPreview] = useState("");
  const [galleryPreview, setGalleryPreview] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      name: initialData.name || "",
      category: initialData.category || "Printing Services",
      description: initialData.description || "",
      featured: initialData.featured || false,
      isActive: initialData.isActive !== false,
    });

    setFeatures(initialData.features || []);
    setNewFeature("");

    setMainPreview(initialData.mainImage?.url || "");
    setGalleryPreview(initialData.galleryImages?.map((img) => img.url) || []);
    setMainImage(null);
    setGalleryImages([]);
  }, [initialData, isOpen]);

  const changeHandler = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures((prev) => [...prev, newFeature.trim()]);
    setNewFeature("");
  };

  const removeFeature = (indexToRemove) => {
    setFeatures((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const mainImageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  const galleryHandler = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages(files);
    setGalleryPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append features array
    data.append("features", JSON.stringify(features));

    if (mainImage) {
      data.append("mainImage", mainImage);
    }

    galleryImages.forEach((image) => {
      data.append("galleryImages", image);
    });

    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="service-modal">
      <div className="service-form-card">
        <div className="form-header">
          <h2>{initialData._id ? "Edit Service" : "Add Service"}</h2>
          <button type="button" onClick={onClose}>
            <MdClose />
          </button>
        </div>

        <form onSubmit={submitHandler} className="service-form">
          <div className="form-grid">
            {/* Left Side Inputs */}
            <div className="form-left-col">
              <div className="input-field">
                <label>Service Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={changeHandler}
                  placeholder="e.g. Digital Printing"
                  required
                />
              </div>

              <div className="input-field">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={changeHandler}
                  required
                >
                  <option value="Printing Services">Printing Services</option>
                </select>
              </div>

              <div className="input-field">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={changeHandler}
                  placeholder="Describe your service in detail..."
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Dynamic Features List */}
              <div className="features-section">
                <label>Service Features / Highlights</label>
                <div className="feature-input-group">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="e.g. High-quality paper options"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <button type="button" onClick={addFeature} className="add-feature-btn">
                    <MdAdd /> Add
                  </button>
                </div>

                <div className="features-list">
                  {features.length === 0 ? (
                    <p className="no-features-text">No features added yet. Add some to show on the website.</p>
                  ) : (
                    features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <span>{feature}</span>
                        <button type="button" onClick={() => removeFeature(idx)} className="delete-feature-btn">
                          <MdDelete />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={changeHandler}
                  />
                  <span>Show in Featured Services</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={changeHandler}
                  />
                  <span>Active (Visible on website)</span>
                </label>
              </div>
            </div>

            {/* Right Side Images */}
            <div className="form-right-col">
              {/* Main Image */}
              <div className="image-upload-box">
                <label>Main Image *</label>
                <div className="image-uploader">
                  <input
                    type="file"
                    accept="image/*"
                    id="mainImage-input"
                    onChange={mainImageHandler}
                    required={!initialData._id}
                  />
                  <label htmlFor="mainImage-input" className="uploader-label">
                    {mainPreview ? (
                      <img src={mainPreview} alt="Main Preview" className="preview-img" />
                    ) : (
                      <div className="upload-placeholder">
                        <MdCloudUpload />
                        <span>Upload Main Image</span>
                        <p>JPG, PNG, JPEG or WEBP (Max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="image-upload-box">
                <label>Gallery Images (Max 5)</label>
                <div className="image-uploader">
                  <input
                    type="file"
                    accept="image/*"
                    id="gallery-input"
                    multiple
                    onChange={galleryHandler}
                  />
                  <label htmlFor="gallery-input" className="uploader-label">
                    <div className="upload-placeholder">
                      <MdCloudUpload />
                      <span>Upload Gallery Images</span>
                      <p>Select multiple images</p>
                    </div>
                  </label>
                </div>

                {galleryPreview.length > 0 && (
                  <div className="gallery-previews-grid">
                    {galleryPreview.map((url, index) => (
                      <div className="gallery-preview-item" key={index}>
                        <img src={url} alt={`Gallery Preview ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
