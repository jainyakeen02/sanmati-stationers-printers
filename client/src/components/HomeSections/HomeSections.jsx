import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaChevronDown,
  FaMapMarkedAlt,
} from "react-icons/fa";
import "./HomeSections.css";

import {
  businessInfo,
  faqs,
  portfolioItems,
  whyChooseUs,
} from "../../data/siteConfig";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};


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
