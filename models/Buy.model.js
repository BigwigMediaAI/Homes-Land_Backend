const mongoose = require("mongoose");

const buySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },

  images: { type: [String], default: [] }, // Array of Cloudinary image URLs

  googleMapUrl: { type: String },
  highlights: { type: [String], default: [] }, // ["Sea View", "Private Pool"]
  nearby: { type: [String], default: [] }, // ["Beach, Mall"]
  features: { type: [String], default: [] }, // ["3 Bedrooms", "2 Bathrooms"]
  amenities: { type: [String], default: [] }, // ["Swimming Pool", "Security"]

  description: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Buy", buySchema);
