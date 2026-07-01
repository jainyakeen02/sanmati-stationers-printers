import "./NotFound.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="not-found">

      <div className="not-found-container">

        <span className="error-code">404</span>

        <h1>Oops! Page Not Found</h1>

        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link to="/" className="home-btn">
          <FaArrowLeft />
          Back to Home
        </Link>

      </div>

    </section>
  );
};

export default NotFound;