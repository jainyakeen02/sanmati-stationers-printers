import { useEffect, useMemo, useState } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdSearch,
} from "react-icons/md";
import { toast } from "react-toastify";

import ProductForm from "../components/ProductForm";
import DeleteModal from "../components/DeleteModal";

import { productAPI } from "../services/api";

import "../styles/Products.css";

const Products = () => {
  /* =========================================
      STATES
  ========================================= */

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] =
    useState("All");

  /* Delete Modal */

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState(null);

  /* =========================================
      FETCH PRODUCTS
  ========================================= */

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } =
        await productAPI.getAll();

      setProducts(data.products || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =========================================
      FILTER PRODUCTS
  ========================================= */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch =
        product.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All"
          ? true
          : product.category === category;

      return (
        searchMatch && categoryMatch
      );
    });
  }, [
    products,
    search,
    category,
  ]);

  /* =========================================
      OPEN ADD MODAL
  ========================================= */

  const openAddModal = () => {
    setSelectedProduct(null);
    setIsOpen(true);
  };

  /* =========================================
      OPEN EDIT MODAL
  ========================================= */

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  /* =========================================
      CLOSE PRODUCT MODAL
  ========================================= */

  const closeModal = () => {
    setSelectedProduct(null);
    setIsOpen(false);
  };

  /* =========================================
      SAVE PRODUCT
  ========================================= */

  const saveProduct = async (
    formData
  ) => {
    try {
      setSaving(true);

      if (selectedProduct) {
        await productAPI.update(
          selectedProduct._id,
          formData
        );

        toast.success(
          "Product updated successfully."
        );
      } else {
        await productAPI.create(
          formData
        );

        toast.success(
          "Product added successfully."
        );
      }

      closeModal();

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
      DELETE MODAL
  ========================================= */

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setDeleteModalOpen(false);
  };

  /* =========================================
      DELETE PRODUCT
  ========================================= */

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await productAPI.delete(deleteId);

      toast.success(
        "Product deleted successfully."
      );

      closeDeleteModal();

      fetchProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="products-page">

        {/* ================= Header ================= */}

        <div className="page-header">

          <div>

            <h2>Products</h2>

            <p>
              Manage all products from
              one place.
            </p>

          </div>

          <button
            className="add-btn"
            onClick={openAddModal}
          >
            <MdAdd />

            Add Product

          </button>

        </div>

        {/* ================= Toolbar ================= */}

        <div className="toolbar">

          <div className="search-box">

            <MdSearch />

            <input
              type="text"
              placeholder="Search Product..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >

            <option>All</option>

            <option>
              School Stationery
            </option>

            <option>
              Office Supplies
            </option>

            <option>
              Printing Services
            </option>

            <option>
              Furniture
            </option>

          </select>

        </div>

        {/* ================= Table ================= */}

        <div className="table-card">

          {loading ? (

            <div className="empty-table">

              Loading Products...

            </div>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>Image</th>

                  <th>Name</th>

                  <th>Category</th>

                  <th>Brand</th>

                  <th>Featured</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>
                                {filteredProducts.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="empty-table"
                    >
                      No Products Found
                    </td>

                  </tr>

                ) : (

                  filteredProducts.map((product) => (

                    <tr key={product._id}>

                      {/* Image */}

                      <td>

                        <img
                          src={
                            product.mainImage?.url
                          }
                          alt={product.name}
                          className="product-image"
                        />

                      </td>

                      {/* Name */}

                      <td>{product.name}</td>

                      {/* Category */}

                      <td>{product.category}</td>

                      {/* Brand */}

                      <td>
                        {product.brand || "-"}
                      </td>

                      {/* Featured */}

                      <td>

                        <span
                          className={
                            product.featured
                              ? "badge featured"
                              : "badge"
                          }
                        >

                          {product.featured
                            ? "Featured"
                            : "Normal"}

                        </span>

                      </td>

                      {/* Actions */}

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            openEditModal(product)
                          }
                        >

                          <MdEdit />

                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            openDeleteModal(
                              product._id
                            )
                          }
                        >

                          <MdDelete />

                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {/* ======================================
          PRODUCT FORM
      ====================================== */}

      <ProductForm
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={saveProduct}
        initialData={
          selectedProduct || {}
        }
        loading={saving}
      />

      {/* ======================================
          DELETE MODAL
      ====================================== */}

      <DeleteModal
        isOpen={deleteModalOpen}
        title="Delete Product"
        message="Are you sure you want to permanently delete this product? This action cannot be undone."
        loading={deleteLoading}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />

    </>
  );
};

export default Products;