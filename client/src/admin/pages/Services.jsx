import { useEffect, useMemo, useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdSearch } from "react-icons/md";
import { toast } from "react-toastify";

import ServiceForm from "../components/ServiceForm";
import DeleteModal from "../components/DeleteModal";

import { serviceAPI } from "../services/api";

import "../styles/Services.css";

const Services = () => {
  /* =========================================
      STATES
  ========================================= */
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [search, setSearch] = useState("");

  /* Delete Modal */
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  /* =========================================
      FETCH SERVICES
  ========================================= */
  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await serviceAPI.getAll();
      setServices(data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load services."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  /* =========================================
      FILTER SERVICES
  ========================================= */
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      return service.name?.toLowerCase().includes(search.toLowerCase());
    });
  }, [services, search]);

  /* =========================================
      MODAL ACTIONS
  ========================================= */
  const openAddModal = () => {
    setSelectedService(null);
    setIsOpen(true);
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsOpen(false);
  };

  /* =========================================
      SAVE SERVICE
  ========================================= */
  const saveService = async (formData) => {
    try {
      setSaving(true);
      if (selectedService) {
        await serviceAPI.update(selectedService._id, formData);
        toast.success("Service updated successfully.");
      } else {
        await serviceAPI.create(formData);
        toast.success("Service added successfully.");
      }
      closeModal();
      fetchServices();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save service."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
      DELETE SERVICE
  ========================================= */
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await serviceAPI.delete(deleteId);
      toast.success("Service deactivated successfully.");
      closeDeleteModal();
      fetchServices();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to deactivate service."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="services-page">
        {/* ================= Header ================= */}
        <div className="page-header">
          <div>
            <h2>Services</h2>
            <p>Manage printing and custom shop services offered on the website.</p>
          </div>
          <button className="add-btn" onClick={openAddModal}>
            <MdAdd />
            Add Service
          </button>
        </div>

        {/* ================= Toolbar ================= */}
        <div className="toolbar">
          <div className="search-box">
            <MdSearch />
            <input
              type="text"
              placeholder="Search Service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ================= Table ================= */}
        <div className="table-card">
          {loading ? (
            <div className="empty-table">Loading Services...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Features</th>
                  <th>Featured</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-table">
                      No Services Found
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service) => (
                    <tr key={service._id}>
                      {/* Image */}
                      <td>
                        <img
                          src={service.mainImage?.url}
                          alt={service.name}
                          className="service-thumb"
                        />
                      </td>

                      {/* Name */}
                      <td className="service-name-td">{service.name}</td>

                      {/* Category */}
                      <td>{service.category}</td>

                      {/* Features */}
                      <td className="features-list-td">
                        {service.features && service.features.length > 0 ? (
                          <span className="features-count-badge">
                            {service.features.length} Features
                          </span>
                        ) : (
                          <span className="no-features-badge">None</span>
                        )}
                      </td>

                      {/* Featured */}
                      <td>
                        <span
                          className={
                            service.featured ? "badge featured" : "badge"
                          }
                        >
                          {service.featured ? "Featured" : "Normal"}
                        </span>
                      </td>

                      {/* Active Status */}
                      <td>
                        <span
                          className={
                            service.isActive ? "badge active-status" : "badge inactive-status"
                          }
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <button
                          className="edit-btn"
                          onClick={() => openEditModal(service)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => openDeleteModal(service._id)}
                          disabled={!service.isActive}
                          title={service.isActive ? "Deactivate Service" : "Already Inactive"}
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
          SERVICE FORM
      ====================================== */}
      <ServiceForm
        isOpen={isOpen}
        onClose={closeModal}
        onSubmit={saveService}
        initialData={selectedService || {}}
        loading={saving}
      />

      {/* ======================================
          DELETE MODAL
      ====================================== */}
      <DeleteModal
        isOpen={deleteModalOpen}
        title="Deactivate Service"
        message="Are you sure you want to deactivate this service? It will be hidden from the website catalog."
        loading={deleteLoading}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Services;
