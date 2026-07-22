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
      </div>
    </div>
  );
};

export default FurnitureCard;
