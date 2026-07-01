import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import "./Header.css";

import logo from "../../assets/images/logo.png";
import { businessInfo } from "../../data/siteConfig";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Products", href: "/#products" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={sticky ? "header sticky" : "header"}>
      <div className="container navbar">
        <Link className="logo" to="/" aria-label={`${businessInfo.name} home`}>
          <img src={logo} alt="" />
          <div>
            <h2>{businessInfo.shortName}</h2>
            <h3>Stationers & Printers</h3>
          </div>
        </Link>

        <nav className={menuOpen ? "nav active" : "nav"} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-buttons">
          <a href={businessInfo.phoneHref} className="call-btn">
            Call Now
          </a>
          <a
            href={businessInfo.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

export default Header;
