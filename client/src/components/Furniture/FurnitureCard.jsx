import "./Furniture.css";

const FurnitureCard = ({ product }) => {
  return (
    <div className="furniture-card">
      <div className="furniture-card-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="furniture-card-content">
        <span className="furniture-category">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>

        <a
          href={`https://wa.me/919999999999?text=Hello%20Sanmati%20Stationers,%20I%20am%20interested%20in%20${encodeURIComponent(
            product.name
          )}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="furniture-btn"
        >
          Enquire Now
        </a>
      </div>
    </div>
  );
};

export default FurnitureCard;