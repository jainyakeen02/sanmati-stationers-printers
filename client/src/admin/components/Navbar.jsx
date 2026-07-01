import { useLocation } from "react-router-dom";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";

import "../styles/Navbar.css";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/products":  "Products",
  "/admin/services":  "Services",
  "/admin/contacts":  "Contact Queries",
};

const Navbar = () => {
  const admin    = JSON.parse(localStorage.getItem("admin"));
  const location = useLocation();

  const pageTitle = pageTitles[location.pathname] || "Admin Panel";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day:     "numeric",
    month:   "long",
    year:    "numeric",
  });

  return (
    <header className="admin-navbar">
      {/* Left */}
      <div className="navbar-left">
        <button className="menu-btn" aria-label="Toggle sidebar">
          <HiOutlineBars3BottomLeft />
        </button>

        <div>
          <h2>{pageTitle}</h2>
          <p>{today}</p>
        </div>
      </div>

      {/* Right */}
      <div className="navbar-right">
        <button className="notification-btn" aria-label="Notifications">
          <IoNotificationsOutline />
          <span className="notification-dot"></span>
        </button>

        <div className="admin-profile">
          <FaUserCircle />
          <div>
            <h4>{admin?.name || "Admin"}</h4>
            <span>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;