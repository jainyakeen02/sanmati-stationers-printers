import { MdDeleteForever } from "react-icons/md";

import "../styles/DeleteModal.css";

const DeleteModal = ({
  isOpen,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  loading = false,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">

      <div className="delete-modal">

        {/* Icon */}

        <div className="delete-icon">

          <MdDeleteForever />

        </div>

        {/* Content */}

        <h2>{title}</h2>

        <p>{message}</p>

        {/* Buttons */}

        <div className="delete-actions">

          <button
            className="cancel-delete-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-btn"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteModal;