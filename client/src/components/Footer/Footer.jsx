import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserShield,
  FaWhatsapp,
} from "react-icons/fa";
import "./Footer.css";

import { businessInfo } from "../../data/siteConfig";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="footer-logo">
            Sanmati<span> Stationers &amp; Printers</span>
          </h2>
          <p>{businessInfo.tagline}</p>
          <div className="footer-social">
            <a href={businessInfo.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href={businessInfo.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#products">Products</a></li>
            <li><a href="/#gallery">Gallery</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>
          <ul>
            <li><Link to="/school-stationery">School Stationery</Link></li>
            <li><Link to="/office-supplies">Office Supplies</Link></li>
            <li><Link to="/printing-services">Printing Services</Link></li>
            <li><Link to="/furniture">School &amp; Office Furniture</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <ul className="footer-contact">
            <li>
              <FaPhoneAlt />
              <span>{businessInfo.phone}</span>
            </li>
            <li>
              <FaEnvelope />
              <span>{businessInfo.email}</span>
            </li>
            <li>
              <FaMapMarkerAlt />
              <span>{businessInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright 2026 {businessInfo.name}. All Rights Reserved.</p>
        {/*<Link to="/admin/login" className="admin-portal-link">*/}
         {/* <FaUserShield />*/}
          {/*Admin Panel*/}
        {/*</Link>*/}
      </div>
    </footer>
  );
};

export default Footer;
