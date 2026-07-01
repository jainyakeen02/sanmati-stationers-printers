import "./SchoolStationery.css";

import { useState } from "react";

import stationeryData from "./stationeryData";

import {
  FaWhatsapp,
  FaCheckCircle,
} from "react-icons/fa";

function SchoolStationery() {

  const categories = [
    "All",
    "Pens",
    "Notebooks",
    "School Bags",
    "Geometry",
    "Drawing",
    "Books",
    "Water Bottle",
    "Lunch Box",
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? stationeryData
      : stationeryData.filter(
          (item) => item.category === activeCategory
        );

  return (
    <section
      className="school-stationery section"
      id="school-stationery"
    >
      <div className="container">

        {/* Heading */}

        <div className="section-heading">

          <span>SCHOOL STATIONERY</span>

          <h2>

            Everything Students
            <br />

            Need For Learning

          </h2>

          <p>

            Discover premium quality stationery products for
            schools, coaching institutes and students.

          </p>

        </div>

        {/* Category Filter */}

        <div className="category-filter">

          {categories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

        {/* Products */}

        <div className="products-grid">

          {filteredProducts.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              <div className="product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="product-content">

                <span>

                  {product.category}

                </span>

                <h3>

                  {product.name}

                </h3>

                <ul>

                  <li>

                    <FaCheckCircle />

                    Premium Quality

                  </li>

                  <li>

                    <FaCheckCircle />

                    Best Price

                  </li>

                  <li>

                    <FaCheckCircle />

                    Bulk Orders Available

                  </li>

                </ul>

                <a
                  href="https://wa.me/919982542202"
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-btn"
                >

                  <FaWhatsapp />

                  Enquire Now

                </a>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default SchoolStationery;