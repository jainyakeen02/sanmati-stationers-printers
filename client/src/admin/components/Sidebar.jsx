import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdInventory2,
  MdMiscellaneousServices,
  MdContactMail,
  MdWeb,
  MdLogout,
} from "react-icons/md";

import logo from "../../assets/logo.png";

import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  return (
    <aside className="sidebar">
      {/* ================= Logo ================= */}

      <div className="sidebar-logo">
        <img src={logo} alt="Sanmati Logo" />

        <div>
          <h2>Sanmati</h2>
          <p>Admin Panel</p>
        </div>
      </div>

      {/* ================= Menu ================= */}

      <nav className="sidebar-menu">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <MdInventory2 />
          <span>Products</span>
        </NavLink>

        <NavLink
          to="/admin/services"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <MdMiscellaneousServices />
          <span>Services</span>
        </NavLink>

        <NavLink
          to="/admin/contacts"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <MdContactMail />
          <span>Contact Queries</span>
        </NavLink>

        <NavLink
          to="/admin/content"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          <MdWeb />
          <span>Content</span>
        </NavLink>

      </nav>

      {/* ================= Footer ================= */}

      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={logoutHandler}
        >
          <MdLogout />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
