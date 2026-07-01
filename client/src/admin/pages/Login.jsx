import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/logo.png";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.user));

      navigate("/admin/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      {/* ================= LEFT PANEL ================= */}

      <div className="login-left">
        <div className="login-overlay">
          <img
            src={logo}
            alt="Sanmati Logo"
            className="login-logo"
          />

          <h1>SANMATI</h1>

          <h3>STATIONERS & PRINTERS</h3>

          <p>
            Manage your complete stationery business
            from one powerful admin dashboard.
          </p>

          <div className="login-features">
            <div className="feature">
              <span>✓</span>
              <div>
                <h4>Secure Login</h4>
                <p>Your admin account is protected.</p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>
              <div>
                <h4>Product Management</h4>
                <p>Add, Edit & Delete Products Easily.</p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>
              <div>
                <h4>Services Management</h4>
                <p>Manage Printing Services Anytime.</p>
              </div>
            </div>

            <div className="feature">
              <span>✓</span>
              <div>
                <h4>Business Dashboard</h4>
                <p>Everything at one place.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}

      <div className="login-right">
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          <h2>
            Welcome <span>Back!</span>
          </h2>

          <p>
            Login to your admin account to continue
          </p>

          {/* Email */}

          <div className="input-group">
            <FiMail />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}

          <div className="input-group">
            <FiLock />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {/* Remember */}

          <div className="login-options">
            <label>

              <input type="checkbox" />

              Remember Me

            </label>

            <button
              type="button"
              className="forgot-btn"
            >
              Forgot Password?
            </button>
          </div>

          {/* Button */}

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

          <div className="copyright">
            © 2026 Sanmati Stationers &
            Printers
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;