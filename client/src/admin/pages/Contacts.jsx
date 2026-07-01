import { useEffect, useState } from "react";
import { MdDelete, MdEmail, MdPhone, MdClose } from "react-icons/md";
import { toast } from "react-toastify";

import DeleteModal from "../components/DeleteModal";
import { contactAPI } from "../services/api";

import "../styles/Contacts.css";

const Contacts = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  // View query detail modal
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Delete query modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const { data } = await contactAPI.getAll();
      setQueries(data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load contact queries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const openDetailModal = (query) => {
    setSelectedQuery(query);
    setDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedQuery(null);
    setDetailModalOpen(false);
  };

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
      await contactAPI.delete(deleteId);
      toast.success("Query deleted successfully.");
      closeDeleteModal();
      // If we deleted the query that is currently open in detail modal, close it
      if (selectedQuery && selectedQuery._id === deleteId) {
        closeDetailModal();
      }
      fetchQueries();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete query."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="contacts-page">
        {/* ================= Header ================= */}
        <div className="page-header">
          <div>
            <h2>Contact Queries</h2>
            <p>Manage and respond to enquiries submitted by visitors on the contact form.</p>
          </div>
        </div>

        {/* ================= Table ================= */}
        <div className="table-card">
          {loading ? (
            <div className="empty-table">Loading Queries...</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {queries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="empty-table">
                      No Contact Queries Found
                    </td>
                  </tr>
                ) : (
                  queries.map((query) => (
                    <tr key={query._id} className="query-row">
                      {/* Name */}
                      <td className="query-name-td">{query.name}</td>

                      {/* Email */}
                      <td>{query.email}</td>

                      {/* Phone */}
                      <td>{query.phone || "-"}</td>

                      {/* Subject */}
                      <td className="query-subject-td">{query.subject || "No Subject"}</td>

                      {/* Date */}
                      <td>{new Date(query.createdAt).toLocaleDateString()}</td>

                      {/* Actions */}
                      <td>
                        <button
                          className="view-query-btn"
                          onClick={() => openDetailModal(query)}
                        >
                          View Message
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => openDeleteModal(query._id)}
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
          QUERY DETAIL MODAL
      ====================================== */}
      {detailModalOpen && selectedQuery && (
        <div className="query-modal">
          <div className="query-detail-card">
            <div className="form-header">
              <h2>Query Detail</h2>
              <button type="button" onClick={closeDetailModal}>
                <MdClose />
              </button>
            </div>

            <div className="query-meta-grid">
              <div className="meta-item">
                <span className="meta-label">Customer Name</span>
                <span className="meta-value">{selectedQuery.name}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Submitted On</span>
                <span className="meta-value">
                  {new Date(selectedQuery.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Email Address</span>
                <a href={`mailto:${selectedQuery.email}`} className="meta-value link">
                  <MdEmail /> {selectedQuery.email}
                </a>
              </div>
              <div className="meta-item">
                <span className="meta-label">Phone Number</span>
                {selectedQuery.phone ? (
                  <a href={`tel:${selectedQuery.phone}`} className="meta-value link">
                    <MdPhone /> {selectedQuery.phone}
                  </a>
                ) : (
                  <span className="meta-value">-</span>
                )}
              </div>
            </div>

            <div className="query-subject-box">
              <h3>Subject: {selectedQuery.subject || "No Subject"}</h3>
            </div>

            <div className="query-message-box">
              <span className="meta-label">Message</span>
              <div className="message-content">
                {selectedQuery.message}
              </div>
            </div>

            <div className="query-actions">
              <button
                type="button"
                className="delete-query-action-btn"
                onClick={() => openDeleteModal(selectedQuery._id)}
              >
                Delete Query
              </button>
              <a
                href={`mailto:${selectedQuery.email}?subject=Re: ${selectedQuery.subject || "Sanmati Stationers enquiry"}`}
                className="reply-query-btn"
              >
                <MdEmail /> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ======================================
          DELETE MODAL
      ====================================== */}
      <DeleteModal
        isOpen={deleteModalOpen}
        title="Delete Query"
        message="Are you sure you want to permanently delete this contact query? This action cannot be undone."
        loading={deleteLoading}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Contacts;
