import "./Services.css";
import servicesData from "./servicesData";

import {
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Services() {

  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="services section" id="services">

      <div className="container">

        {/* Section Heading */}

        <div className="section-heading">

          <span>OUR SERVICES</span>

          <h2>
            Everything You Need
            <br />
            <span>Under One Roof</span>
          </h2>

          <p>
            Sanmati Stationers & Printers provides complete stationery,
            printing solutions and furniture for schools, offices,
            coaching institutes and businesses.
          </p>

        </div>

        {/* Services Grid */}

        <div className="services-grid">

          {servicesData.map((service) => (

            <div
              className="service-card"
              key={service.id}
              onClick={() => handleNavigation(service.route)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleNavigation(service.route);
                }
              }}
            >

              {/* Image */}

              <div className="service-image">

                <img
                  src={service.image}
                  alt={service.title}
                />

              </div>

              {/* Content */}

              <div className="service-content">

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <ul>

                  {service.features.map((item, index) => (

                    <li key={index}>

                      <FaCheckCircle />

                      {item}

                    </li>

                  ))}

                </ul>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNavigation(service.route);
                  }}
                >
                  {service.button}
                  <FaArrowRight />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Services;
