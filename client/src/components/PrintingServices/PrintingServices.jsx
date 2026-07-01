import "./PrintingServices.css";
import printingServicesData from "./PrintingServicesData";
import PrintingServicesCard from "./PrintingServicesCard";

const PrintingServices = () => {
  const {
    banner,
    heading,
    description,
    categories,
    services,
  } = printingServicesData;

  return (
    <section className="printing-services-page">

      {/* Hero Banner */}

      <div className="printing-banner">

        <img
          src={banner}
          alt={heading}
        />

        <div className="printing-banner-overlay">

          <div className="printing-banner-content">

            <span>Professional Printing Solutions</span>

            <h1>{heading}</h1>

            <p>{description}</p>

          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="printing-container">

        {/* Categories */}

        <div className="printing-categories">

          {categories.map((category, index) => (

            <span
              key={index}
              className="printing-category-chip"
            >
              {category}
            </span>

          ))}

        </div>

        {/* Services Grid */}

        <div className="printing-grid">

          {services.map((service) => (

            <PrintingServicesCard
              key={service.id}
              service={service}
            />

          ))}

        </div>

        {/* WhatsApp CTA */}

        <div className="printing-cta">

          <h2>
            Need Custom Printing?
          </h2>

          <p>
            We provide high-quality printing for schools,
            businesses, coaching institutes and individuals.
            Contact us today for the best prices and quick delivery.
          </p>

          <a
            href="https://wa.me/919999999999?text=Hello%20Sanmati%20Stationers,%20I%20need%20Printing%20Services."
            target="_blank"
            rel="noopener noreferrer"
            className="printing-cta-btn"
          >
            Chat on WhatsApp
          </a>

        </div>

      </div>

    </section>
  );
};

export default PrintingServices;