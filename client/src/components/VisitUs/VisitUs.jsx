import "./VisitUs.css";
import { FaArrowRight } from "react-icons/fa";

const VisitUs = () => {
  return (
    <section className="visit-us">
      <div className="visit-container">
        <span className="visit-badge">✨ Visit Us</span>

        <h2>
          Visit <span>Sanmati Stationers & Printers</span>
        </h2>

        <p>
          Discover quality products, reliable service, and a shopping
          experience you'll love. 💙📚
        </p>

        <a href="#contact" className="visit-btn">
          Contact Us <FaArrowRight />
        </a>
      </div>
    </section>
  );
};

export default VisitUs;