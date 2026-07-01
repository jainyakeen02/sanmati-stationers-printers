import "./OfficeSupplies.css";
import officeSuppliesData from "./OfficeSuppliesData";
import OfficeSuppliesCard from "./OfficeSuppliesCard";

const OfficeSupplies = () => {
  const { banner, heading, description, categories, products } =
    officeSuppliesData;

  return (
    <section id="office-supplies" className="office-supplies-section">
      {/* Banner */}
      <div className="office-banner">
        <img src={banner} alt={heading} />

        <div className="office-banner-overlay">
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="office-container">
        {/* Categories */}
        <div className="office-categories">
          {categories.map((category, index) => (
            <span key={index} className="office-category-chip">
              {category}
            </span>
          ))}
        </div>

        {/* Product Grid */}
        <div className="office-products-grid">
          {products.map((product) => (
            <OfficeSuppliesCard key={product.id} product={product} />
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="office-whatsapp">
          <h3>Can't find what you're looking for?</h3>

          <p>
            Contact us on WhatsApp for bulk orders, custom requirements, and
            the latest office supply catalogue.
          </p>

          <a
            href="https://wa.me/919999999999?text=Hello%20Sanmati%20Stationers,%20I%20want%20to%20know%20more%20about%20your%20Office%20Supplies."
            target="_blank"
            rel="noopener noreferrer"
            className="office-whatsapp-btn"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default OfficeSupplies;