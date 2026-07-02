import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

import "./Contact.css";
import { businessInfo } from "../../data/siteConfig";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in Name, Email and Message.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (
      formData.phone &&
      !/^[0-9+\-\s()]{7,20}$/.test(formData.phone)
    ) {
      toast.error("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("EmailJS environment variables are missing.");
      return;
    }

    try {
      setLoading(true);

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim() || "Website Inquiry",
          message: formData.message.trim(),
          time: new Date().toLocaleString("en-IN"),
        },
        publicKey
      );

      toast.success("Message sent successfully.");

      setFormData(initialFormData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };
    return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <span className="contact-tag">Contact Us</span>

          <h2>
            Let's Connect With
            <span> {businessInfo.name}</span>
          </h2>

          <p>
            Whether you need school stationery, office supplies,
            printing services or furniture, contact us for quotations,
            bulk orders and customized solutions.
          </p>

          <div className="contact-card">
            <FaPhoneAlt />
            <div>
              <h4>Phone</h4>
              <p>{businessInfo.phone}</p>
            </div>
          </div>

          <div className="contact-card">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>{businessInfo.email}</p>
            </div>
          </div>

          <div className="contact-card">
            <FaMapMarkerAlt />
            <div>
              <h4>Address</h4>
              <p>{businessInfo.address}</p>
            </div>
          </div>

          <div className="contact-card">
            <FaClock />
            <div>
              <h4>Working Hours</h4>
              <p>{businessInfo.hours}</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h3>Send Us a Message</h3>

          <form onSubmit={handleSubmit} noValidate>
            <label>
              <span>Full Name *</span>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>

            <label>
              <span>Email Address *</span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <label>
              <span>Phone Number</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
              />
            </label>

            <label>
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Message *</span>
              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <div className="contact-actions">
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
                disabled={loading}
              >
                Reset
              </button>
            </div>
          </form>

          <a
            href={businessInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;