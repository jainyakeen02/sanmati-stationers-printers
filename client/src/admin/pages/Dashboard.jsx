import { useEffect, useState } from "react";
import {
  MdInventory2,
  MdMiscellaneousServices,
  MdContactMail,
  MdStar,
} from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { toast } from "react-toastify";
import { dashboardAPI } from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const admin = JSON.parse(localStorage.getItem("admin")) || {};

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      products: 0,
      services: 0,
      contacts: 0,
      featured: 0,
    },
    recentProducts: [],
    recentContacts: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await dashboardAPI.getStats();
        if (data.success) {
          setDashboardData(data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load dashboard stats."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      title: "Products",
      value: dashboardData.stats.products,
      icon: <MdInventory2 />,
      color: "blue",
    },
    {
      title: "Services",
      value: dashboardData.stats.services,
      icon: <MdMiscellaneousServices />,
      color: "green",
    },
    {
      title: "Contact Queries",
      value: dashboardData.stats.contacts,
      icon: <MdContactMail />,
      color: "orange",
    },
    {
      title: "Featured Items",
      value: dashboardData.stats.featured,
      icon: <MdStar />,
      color: "red",
    },
  ];

  return (
    <div className="dashboard">
      {/* Welcome Banner */}
      <div className="welcome-card">
        <div>
          <h2>
            Welcome Back,
            <span> {admin?.name || "Admin"} 👋</span>
          </h2>
          <p>
            Manage your products, services and customer enquiries from one place.
          </p>
        </div>
        <div className="welcome-icon">
          <FaArrowTrendUp />
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className={`stat-card ${item.color}`} key={index}>
            <div className="stat-icon">{item.icon}</div>
            <div>
              <h3>{loading ? "..." : item.value}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="dashboard-grid">
        {/* Recent Products */}
        <div className="dashboard-card">
          <h3>Recent Products</h3>
          {loading ? (
            <div className="empty-state">Loading...</div>
          ) : dashboardData.recentProducts.length === 0 ? (
            <div className="empty-state">No Products Added Yet</div>
          ) : (
            <div className="recent-list">
              {dashboardData.recentProducts.map((product) => (
                <div className="recent-item" key={product._id}>
                  <img
                    src={product.mainImage?.url}
                    alt={product.name}
                    className="recent-item-img"
                  />
                  <div className="recent-item-info">
                    <h4>{product.name}</h4>
                    <p>{product.category}</p>
                  </div>
                  {product.featured && (
                    <span className="badge featured">Featured</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Queries */}
        <div className="dashboard-card">
          <h3>Recent Contact Queries</h3>
          {loading ? (
            <div className="empty-state">Loading...</div>
          ) : dashboardData.recentContacts.length === 0 ? (
            <div className="empty-state">No Contact Queries</div>
          ) : (
            <div className="recent-list">
              {dashboardData.recentContacts.map((contact) => (
                <div className="recent-item" key={contact._id}>
                  <div className="recent-item-info">
                    <h4>{contact.name}</h4>
                    <p className="query-sub">Subject: {contact.subject || "No Subject"}</p>
                    <p className="query-msg">"{contact.message.substring(0, 60)}{contact.message.length > 60 ? "..." : ""}"</p>
                  </div>
                  <span className="query-date">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;