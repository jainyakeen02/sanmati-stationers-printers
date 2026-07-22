import "./OfficeSupplies.css";

const OfficeSuppliesCard = ({ product }) => {
  return (
    <div className="office-product-card">
      <div className="office-product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>

      <div className="office-product-content">
        <span className="office-category">{product.category}</span>

        <h3>{product.name}</h3>

        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default OfficeSuppliesCard;