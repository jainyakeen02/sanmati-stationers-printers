import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import "./Hero.css";

import { businessInfo, heroStats } from "../../data/siteConfig";

const heroPoints = [
  "School Stationery",
  "Office Supplies",
  "Printing Services",
  "School & Office Furniture",
];

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="hero-badge">Trusted Since 2015</span>

          <h1>
            Everything You Need For
            <span> School, Office </span>
            & Printing
          </h1>

          <p>
            {businessInfo.name} is your trusted destination for complete school
            stationery, office supplies, professional printing services and
            school or office furniture.
          </p>

          <div className="hero-points">
            {heroPoints.map((point) => (
              <div key={point}>
                <FaCheckCircle />
                {point}
              </div>
            ))}
          </div>

          <div className="hero-buttons">
            <a href="#contact" className="primary-btn">
              Send Inquiry
              <FaArrowRight />
            </a>
            <a
              href={businessInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: .96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12 }}
        >
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&auto=format&fit=crop&q=80"
            alt="Premium office stationery and printing workspace"
          />
        </motion.div>
      </div>

      <div className="hero-stats container" aria-label="Business highlights">
        {heroStats.map((stat) => (
          <div key={stat.label}>
            <h2>{stat.value}</h2>
            <h3>{stat.label}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
