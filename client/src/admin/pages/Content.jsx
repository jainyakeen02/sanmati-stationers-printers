import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  faqAPI,
  galleryAPI,
  settingsAPI,
  testimonialAPI,
} from "../services/api";
import "../styles/Content.css";

const emptyFaq = { question: "", answer: "", order: 0, isActive: true };
const emptyTestimonial = { name: "", role: "", quote: "", rating: 5, isActive: true };
const emptyGallery = { title: "", category: "Store", image: null, isActive: true };

const defaultSettings = {
  hero: { title: "", subtitle: "", badge: "" },
  about: { title: "", description: "" },
  announcement: { enabled: true, items: [] },
  business: { phone: "", whatsapp: "", email: "", address: "", hours: "", mapEmbedUrl: "" },
  footer: { tagline: "", facebook: "", instagram: "" },
};

function Content() {
  const [activeTab, setActiveTab] = useState("settings");
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(defaultSettings);
  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [faqForm, setFaqForm] = useState(emptyFaq);
  const [testimonialForm, setTestimonialForm] = useState(emptyTestimonial);
  const [galleryForm, setGalleryForm] = useState(emptyGallery);

  const loadContent = async () => {
    setLoading(true);
    try {
      const [settingsRes, faqRes, testimonialRes, galleryRes] = await Promise.all([
        settingsAPI.get(),
        faqAPI.getAll(),
        testimonialAPI.getAll(),
        galleryAPI.getAll(),
      ]);

      setSettings({ ...defaultSettings, ...settingsRes.data.data });
      setFaqs(faqRes.data.data || []);
      setTestimonials(testimonialRes.data.data || []);
      setGallery(galleryRes.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load content.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const updateNestedSetting = (group, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [key]: value,
      },
    }));
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    try {
      await settingsAPI.update(settings);
      toast.success("Settings saved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save settings.");
    }
  };

  const createFaq = async (event) => {
    event.preventDefault();
    try {
      await faqAPI.create(faqForm);
      setFaqForm(emptyFaq);
      toast.success("FAQ added.");
      loadContent();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add FAQ.");
    }
  };

  const createTestimonial = async (event) => {
    event.preventDefault();
    try {
      await testimonialAPI.create(testimonialForm);
      setTestimonialForm(emptyTestimonial);
      toast.success("Testimonial added.");
      loadContent();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add testimonial.");
    }
  };

  const createGallery = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", galleryForm.title);
      formData.append("category", galleryForm.category);
      formData.append("isActive", galleryForm.isActive);
      if (galleryForm.image) {
        formData.append("image", galleryForm.image);
      }

      await galleryAPI.create(formData);
      setGalleryForm(emptyGallery);
      toast.success("Gallery item added.");
      loadContent();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add gallery item.");
    }
  };

  const deleteItem = async (api, id, label) => {
    try {
      await api.delete(id);
      toast.success(`${label} deleted.`);
      loadContent();
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to delete ${label.toLowerCase()}.`);
    }
  };

  if (loading) {
    return <div className="admin-content-page">Loading content...</div>;
  }

  return (
    <div className="admin-content-page">
      <div className="content-header">
        <div>
          <span>Website Management</span>
          <h1>Content & Settings</h1>
        </div>
        <div className="content-tabs">
          {["settings", "faqs", "testimonials", "gallery"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "settings" && (
        <form className="content-panel content-form" onSubmit={saveSettings}>
          <h2>Business Information</h2>
          <div className="content-grid">
            {["phone", "whatsapp", "email", "address", "hours", "mapEmbedUrl"].map((key) => (
              <label key={key}>
                <span>{key}</span>
                <input
                  value={settings.business?.[key] || ""}
                  onChange={(event) => updateNestedSetting("business", key, event.target.value)}
                />
              </label>
            ))}
          </div>

          <h2>Hero, About & Footer</h2>
          <div className="content-grid">
            <label>
              <span>Hero title</span>
              <input
                value={settings.hero?.title || ""}
                onChange={(event) => updateNestedSetting("hero", "title", event.target.value)}
              />
            </label>
            <label>
              <span>Hero subtitle</span>
              <input
                value={settings.hero?.subtitle || ""}
                onChange={(event) => updateNestedSetting("hero", "subtitle", event.target.value)}
              />
            </label>
            <label>
              <span>Footer tagline</span>
              <input
                value={settings.footer?.tagline || ""}
                onChange={(event) => updateNestedSetting("footer", "tagline", event.target.value)}
              />
            </label>
            <label>
              <span>About description</span>
              <textarea
                value={settings.about?.description || ""}
                onChange={(event) => updateNestedSetting("about", "description", event.target.value)}
              />
            </label>
          </div>
          <button type="submit">Save Settings</button>
        </form>
      )}

      {activeTab === "faqs" && (
        <div className="content-panel">
          <form className="content-form compact" onSubmit={createFaq}>
            <input
              placeholder="Question"
              value={faqForm.question}
              onChange={(event) => setFaqForm((prev) => ({ ...prev, question: event.target.value }))}
              required
            />
            <textarea
              placeholder="Answer"
              value={faqForm.answer}
              onChange={(event) => setFaqForm((prev) => ({ ...prev, answer: event.target.value }))}
              required
            />
            <button type="submit">Add FAQ</button>
          </form>
          <ContentList items={faqs} titleKey="question" onDelete={(id) => deleteItem(faqAPI, id, "FAQ")} />
        </div>
      )}

      {activeTab === "testimonials" && (
        <div className="content-panel">
          <form className="content-form compact" onSubmit={createTestimonial}>
            <input
              placeholder="Name"
              value={testimonialForm.name}
              onChange={(event) => setTestimonialForm((prev) => ({ ...prev, name: event.target.value }))}
              required
            />
            <input
              placeholder="Role / Location"
              value={testimonialForm.role}
              onChange={(event) => setTestimonialForm((prev) => ({ ...prev, role: event.target.value }))}
            />
            <textarea
              placeholder="Quote"
              value={testimonialForm.quote}
              onChange={(event) => setTestimonialForm((prev) => ({ ...prev, quote: event.target.value }))}
              required
            />
            <button type="submit">Add Testimonial</button>
          </form>
          <ContentList items={testimonials} titleKey="name" onDelete={(id) => deleteItem(testimonialAPI, id, "Testimonial")} />
        </div>
      )}

      {activeTab === "gallery" && (
        <div className="content-panel">
          <form className="content-form compact" onSubmit={createGallery}>
            <input
              placeholder="Title"
              value={galleryForm.title}
              onChange={(event) => setGalleryForm((prev) => ({ ...prev, title: event.target.value }))}
              required
            />
            <input
              placeholder="Category"
              value={galleryForm.category}
              onChange={(event) => setGalleryForm((prev) => ({ ...prev, category: event.target.value }))}
            />
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setGalleryForm((prev) => ({ ...prev, image: event.target.files[0] }))}
              required
            />
            <button type="submit">Add Gallery Item</button>
          </form>
          <ContentList items={gallery} titleKey="title" onDelete={(id) => deleteItem(galleryAPI, id, "Gallery item")} />
        </div>
      )}
    </div>
  );
}

function ContentList({ items, titleKey, onDelete }) {
  if (!items.length) {
    return <p className="empty-content">No records yet.</p>;
  }

  return (
    <div className="content-list">
      {items.map((item) => (
        <article key={item._id}>
          <div>
            <h3>{item[titleKey]}</h3>
            <p>{item.answer || item.quote || item.category || "Active content record"}</p>
          </div>
          <button type="button" onClick={() => onDelete(item._id)}>
            Delete
          </button>
        </article>
      ))}
    </div>
  );
}

export default Content;
