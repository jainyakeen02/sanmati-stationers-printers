import "./About.css";
import {
  FaAward,
  FaUsers,
  FaBuilding,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="about-section">

      <div className="about-container">

        {/* Left Content */}

        <div className="about-content">

          <span className="about-tag">
            ABOUT SANMATI STATIONERS & PRINTERS
          </span>

          <h2>
            Your Trusted Partner for
            <span> Stationery, Printing & Furniture</span>
          </h2>

          <p>
            Sanmati Stationers & Printers has been serving schools,
            colleges, offices, coaching institutes and businesses with
            premium quality stationery products, professional printing
            services and durable furniture solutions. Our commitment to
            quality, timely delivery and customer satisfaction has made us
            a trusted name in the industry.
          </p>

          <div className="about-features">

            <div className="about-feature">

              <FaCheckCircle />

              <span>Premium Quality Products</span>

            </div>

            <div className="about-feature">

              <FaCheckCircle />

              <span>Affordable Pricing</span>

            </div>

            <div className="about-feature">

              <FaCheckCircle />

              <span>Fast Printing Services</span>

            </div>

            <div className="about-feature">

              <FaCheckCircle />

              <span>Bulk Order Support</span>

            </div>

          </div>

        </div>

        {/* Right Stats */}

        <div className="about-stats">

          <div className="stat-card">

            <FaUsers />

            <h3>Serving</h3>

            <p>Community With Pride</p>

          </div>

          <div className="stat-card">

            <FaBuilding />

            <h3>Complete</h3>

            <p>Solutions for Schools & Offices</p>

          </div>

          <div className="stat-card">

            <FaAward />

            <h3>10+</h3>

            <p>Years of Excellence</p>

          </div>

          <div className="stat-card">

            <FaHandshake />

            <h3>100%</h3>

            <p>Customer Satisfaction</p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;