import "./Announcement.css";
import { announcementItems } from "../../data/siteConfig";

function Announcement() {
  const items = [...announcementItems, ...announcementItems];

  return (
    <div className="announcement-bar" role="region" aria-label="Business announcements">
      <div className="announcement-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default Announcement;
