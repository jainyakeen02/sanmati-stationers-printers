import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "website",
    },
    hero: {
      title: String,
      subtitle: String,
      badge: String,
    },
    about: {
      title: String,
      description: String,
    },
    announcement: {
      enabled: {
        type: Boolean,
        default: true,
      },
      items: {
        type: [String],
        default: [],
      },
    },
    business: {
      phone: String,
      whatsapp: String,
      email: String,
      address: String,
      hours: String,
      mapEmbedUrl: String,
    },
    footer: {
      tagline: String,
      facebook: String,
      instagram: String,
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;
