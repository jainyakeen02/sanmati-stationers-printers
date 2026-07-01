import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaQuoteLeft,
  FaChevronDown,
  FaMapMarkedAlt,
} from "react-icons/fa";
import "./HomeSections.css";

import {
  businessInfo,
  faqs,
  featuredProducts,
  galleryItems,
  portfolioItems,
  testimonials,
  whyChooseUs,
} from "../../data/siteConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function ProductShowcase() {
  return (
    <section className="section showcase-section" id="products">
      <div className="container">
        <div className="section-heading">
          <span>Product Showcase</span>
          <h2>
            Reliable Products for <span>Schools, Offices and Businesses</span>
          </h2>
          <p>
            Explore the core categories Sanmati Stationers & Printers supports
            through in-store guidance, bulk inquiry and direct contact.
          </p>
        </div>

        <div className="showcase-grid">
          {featuredProducts.map((item) => (
            <motion.article
              className="showcase-card"
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35 }}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrintingPortfolio() {
  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container portfolio-layout">
        <div>
          <span className="eyebrow">Printing Portfolio</span>
          <h2>Professional print work for everyday and special requirements.</h2>
          <p>
            From daily documents to custom event material, the store supports
            practical printing jobs with clear communication and dependable
            turnaround.
          </p>
          <a href="#contact" className="portfolio-link">
            Request a printing quote
          </a>
        </div>

        <div className="portfolio-list">
          {portfolioItems.map((item) => (
            <div key={item}>
              <FaCheckCircle />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <div className="section-heading">
          <span>Gallery</span>
          <h2>
            A Clear Look at <span>What We Support</span>
          </h2>
          <p>
            A promotional gallery for stationery, printing, office supplies and
            furniture categories.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <figure key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <figcaption>{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="section why-section">
      <div className="container why-layout">
        <div>
          <span className="eyebrow">Why Choose Us</span>
          <h2>Premium service built around practical local business needs.</h2>
        </div>
        <div className="why-grid">
          {whyChooseUs.map((item, index) => (
            <article key={item}>
              <strong>0{index + 1}</strong>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section testimonial-section" id="testimonials">
      <div className="container">
        <div className="section-heading">
          <span>Testimonials</span>
          <h2>
            Trusted by <span>Local Customers</span>
          </h2>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name}>
              <FaQuoteLeft />
              <p>{item.quote}</p>
              <h3>{item.name}</h3>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2>Quick answers before you send an inquiry.</h2>
          <p>
            This is a promotional business website. For exact availability,
            pricing or bulk requirements, contact the store directly.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <article className={active === index ? "active" : ""} key={item.question}>
              <button type="button" onClick={() => setActive(active === index ? -1 : index)}>
                <span>{item.question}</span>
                <FaChevronDown />
              </button>
              {active === index && <p>{item.answer}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GoogleMap() {
  return (
    <section className="map-section" aria-label="Google Maps location">
      <div className="container map-shell">
        <div>
          <FaMapMarkedAlt />
          <h2>Visit Sanmati Stationers & Printers</h2>
          <p>{businessInfo.address}</p>
        </div>
        <iframe
          title="Sanmati Stationers & Printers location"
          src={businessInfo.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
