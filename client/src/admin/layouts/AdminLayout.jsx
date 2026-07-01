import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="admin-main">

        <Navbar />

        <div className="admin-content">

          <Outlet />

        </div>

      </div>

    </div>
  );
};

export default AdminLayout;