import "./PrintingServices.css";

const PrintingServicesCard = ({ service }) => {
  return (
    <div className="printing-card">
      <div className="printing-card-image">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
        />
      </div>

      <div className="printing-card-content">
        <span className="printing-category">
          {service.category}
        </span>

        <h3>{service.name}</h3>

        <p>{service.description}</p>

        <a
          href={`https://wa.me/919999999999?text=Hello%20Sanmati%20Stationers,%20I%20am%20interested%20in%20${encodeURIComponent(
            service.name
          )}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="printing-btn"
        >
          Enquire Now
        </a>
      </div>
    </div>
  );
};

export default PrintingServicesCard;