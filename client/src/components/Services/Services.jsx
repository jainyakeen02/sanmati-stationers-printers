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

          <span style={{ fontSize: "1.25rem", fontWeight: "bolder" }}>OUR SERVICES</span>

          <h2>
            Everything You Need
            <br />
            <span style={{ fontSize: "1.25rem" , fontWeight: "bold"}}>Under One Roof</span>
          </h2>

          <p className="services-description">
            From premium <strong>school stationery</strong> and{" "}
            <strong>office essentials</strong> to{" "}
            <strong>high-quality printing</strong> and{" "}
            <strong>durable furniture</strong>, we deliver everything you need under one
            roof with trusted service, quality products, and customer-first support.
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
