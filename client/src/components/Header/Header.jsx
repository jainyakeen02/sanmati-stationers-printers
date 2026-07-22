import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";
import "./Header.css";

import logo from "../../assets/images/logo.png";
import { businessInfo } from "../../data/siteConfig";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={sticky ? "header sticky" : "header"}>
      <div className="container navbar">
        {/* ================= Logo ================= */}

        <Link
          className="logo"
          to="/"
          aria-label={`${businessInfo.name} Home`}
          onClick={closeMenu}
        >
          <img src={logo} alt={businessInfo.name} />

          <div className="logo-text">
            <h2>{businessInfo.shortName}</h2>
            <h3>Stationers & Printers</h3>
          </div>
        </Link>

        {/* ================= Navigation ================= */}

        <nav
          className={menuOpen ? "nav active" : "nav"}
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}

          {/* Mobile Buttons */}

          <div className="mobile-buttons">
            <a
              href={businessInfo.phoneHref}
              className="call-btn"
              onClick={closeMenu}
            >
              <FaPhoneAlt />
              <span>Call Now</span>
            </a>

            <a
              href={businessInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
              onClick={closeMenu}
            >
              <FaWhatsapp />
              <span>WhatsApp</span>
            </a>
          </div>
        </nav>

        {/* ================= Desktop Buttons ================= */}

        <div className="nav-buttons">
          <a href={businessInfo.phoneHref} className="call-btn">
            <FaPhoneAlt />
            <span>Call Now</span>
          </a>

          <a
            href={businessInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* ================= Mobile Quick Actions ================= */}

        <div className="mobile-actions">
          <a
            href={businessInfo.phoneHref}
            className="mobile-icon-btn phone"
            aria-label="Call"
          >
            <FaPhoneAlt />
          </a>

          <a
            href={businessInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mobile-icon-btn whatsapp"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={menuOpen}
            type="button"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;