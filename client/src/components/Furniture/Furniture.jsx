import "./Furniture.css";
import furnitureData from "./FurnitureData";
import FurnitureCard from "./FurnitureCard";

const Furniture = () => {
  const {
    banner,
    heading,
    description,
    categories,
    products,
  } = furnitureData;

  return (
    <section className="furniture-page">

      {/* Hero Banner */}

      <div className="furniture-banner">

        <img
          src={banner}
          alt={heading}
        />

        <div className="furniture-banner-overlay">

          <div className="furniture-banner-content">

            <span>Premium School & Office Furniture</span>

            <h1>{heading}</h1>

            <p>{description}</p>

          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="furniture-container">

        {/* Categories */}

        <div className="furniture-categories">

          {categories.map((category, index) => (

            <span
              key={index}
              className="furniture-category-chip"
            >
              {category}
            </span>

          ))}

        </div>

        {/* Product Grid */}

        <div className="furniture-grid">

          {products.map((product) => (

            <FurnitureCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

        {/* WhatsApp CTA */}

        <div className="furniture-cta">

          <h2>
            Looking for Furniture in Bulk?
          </h2>

          <p>
            We supply premium-quality school and office furniture for
            educational institutions, coaching centres, offices and
            businesses. Contact us today for competitive pricing and
            customized solutions.
          </p>

          <a
            href="https://wa.me/919999999999?text=Hello%20Sanmati%20Stationers,%20I%20am%20looking%20for%20School%20%26%20Office%20Furniture."
            target="_blank"
            rel="noopener noreferrer"
            className="furniture-cta-btn"
          >
            Chat on WhatsApp
          </a>

        </div>

      </div>

    </section>
  );
};

export default Furniture;