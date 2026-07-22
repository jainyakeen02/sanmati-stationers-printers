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
      </div>
    </div>
  );
};

export default PrintingServicesCard;
