import { useEffect, useState } from "react";
import { FaArrowUp, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import "./FloatingActions.css";

import { businessInfo } from "../../data/siteConfig";

function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floating-actions" aria-label="Quick contact actions">
      <a href={businessInfo.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <FaWhatsapp />
      </a>
      <a href={businessInfo.phoneHref} aria-label="Call Sanmati Stationers and Printers">
        <FaPhoneAlt />
      </a>
      {visible && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

export default FloatingActions;
